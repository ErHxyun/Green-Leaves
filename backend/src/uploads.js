import multer from 'multer';
import sharp from 'sharp';
import {randomUUID} from 'node:crypto';
import {mkdir,writeFile,unlink} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {HttpError} from './validation.js';
sharp.concurrency(1);
sharp.cache({memory:32,files:0,items:20});
export const defaultUploadDir=process.env.UPLOAD_DIR||fileURLToPath(new URL('../uploads/',import.meta.url));
const parse=multer({storage:multer.memoryStorage(),limits:{fileSize:10*1024*1024,files:1,fields:0,parts:1}}).single('image');
export function uploadImage(pool,directory){
 let processing=false;
 return [(req,res,next)=>{
  if(processing)return next(new HttpError(429,'Image processing is busy; retry shortly.'));
  processing=true;
  const release=()=>{processing=false;};
  res.once('finish',release);res.once('close',release);
  next();
 },(req,res,next)=>parse(req,res,e=>next(e?new HttpError(e.code==='LIMIT_FILE_SIZE'?413:400,e.code==='LIMIT_FILE_SIZE'?'图片不能超过 10 MB。':'请一次上传一张 JPG、PNG 或 WebP 图片。'):undefined)),
 async(req,res)=>{
  if(!req.file)throw new HttpError(400,'请先选择图片。');
  let output;
  try{
   const image=sharp(req.file.buffer,{limitInputPixels:40000000});
   const meta=await image.metadata();
   if(!['jpeg','png','webp'].includes(meta.format)||(meta.pages||1)>1)throw Error('format');
   output=await image.rotate().webp({quality:90}).toBuffer({resolveWithObject:true});
  }catch{throw new HttpError(400,'无法读取图片。请使用非动画 JPG、PNG 或 WebP，且不超过 4000 万像素。');}
  const id=randomUUID(),filename=id+'.webp',target=path.join(directory,filename);
  const raw=req.file.originalname;
  const decoded=Buffer.from(raw,'latin1').toString('utf8');
  const original_name=path.basename((decoded.includes('\uFFFD')?raw:decoded).replaceAll('\\','/')).slice(0,250);
  const metadata={original_name,width:output.info.width,height:output.info.height,bytes:output.data.length,mime_type:'image/webp',uploaded_at:new Date().toISOString()};
  await mkdir(directory,{recursive:true});await writeFile(target,output.data,{flag:'wx'});
  try{
   const result=await pool.query('INSERT INTO media_assets(id,url,metadata) VALUES($1,$2,$3) RETURNING *',[id,'/media/uploads/'+filename,metadata]);
   res.status(201).json({data:result.rows[0]});
  }catch(e){await unlink(target).catch(()=>{});throw e;}
 }];
}
