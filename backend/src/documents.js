import multer from 'multer';
import yauzl from 'yauzl';
import {SaxesParser} from 'saxes';
import {HttpError} from './validation.js';
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:10*1024*1024,files:1,fields:0,parts:1}}).single('document');
export async function extractDocument(buffer,name){
 const ext=name.toLowerCase().split('.').pop();let text;
 if(ext==='txt'){
  try{text=new TextDecoder('utf-8',{fatal:true}).decode(buffer);}catch{throw new HttpError(400,'TXT 请保存为 UTF-8 编码后重试。');}
 }else if(ext==='docx'){
  const xml=await new Promise((resolve,reject)=>{
   yauzl.fromBuffer(buffer,{lazyEntries:true},(err,zip)=>{
    if(err)return reject(new HttpError(400,'无法读取 Word 文件，请上传有效的 .docx。'));
    let count=0,done=false;
    const fail=()=>{if(!done){done=true;zip.close();reject(new HttpError(400,'Word 文件损坏、过大或包含不支持的内容。'));}};
    zip.on('error',fail);zip.on('end',()=>{if(!done)fail();});
    zip.on('entry',entry=>{
     if(++count>1000||entry.generalPurposeBitFlag&1)return fail();
     if(entry.fileName!=='word/document.xml')return zip.readEntry();
     if(entry.uncompressedSize>8*1024*1024)return fail();
     zip.openReadStream(entry,(e,stream)=>{
      if(e)return fail();let size=0;const chunks=[];
      stream.on('error',fail);stream.on('data',chunk=>{size+=chunk.length;if(size>8*1024*1024){stream.destroy();fail();}else chunks.push(chunk);});
      stream.on('end',()=>{if(!done){done=true;zip.close();resolve(Buffer.concat(chunks).toString('utf8'));}});
     });
    });zip.readEntry();
   });
  });
  if(/<!DOCTYPE/i.test(xml))throw new HttpError(400,'不支持包含文档类型声明的 Word 文件。');
  try{
   const parser=new SaxesParser({xmlns:true});const output=[];let inText=false;
   parser.on('opentag',node=>{if(node.local==='t')inText=true;if(['tab','br','cr'].includes(node.local))output.push(node.local==='tab'?'\t':'\n');});
   parser.on('text',value=>{if(inText)output.push(value);});parser.on('closetag',node=>{if(node.local==='t')inText=false;if(node.local==='p')output.push('\n');});
   parser.write(xml).close();text=output.join('');
  }catch{throw new HttpError(400,'无法解析 Word 正文。');}
 }else throw new HttpError(400,'支持 .docx 和 UTF-8 .txt；旧版 .doc 请先另存为 .docx。');
 text=text.replace(/\r\n/g,'\n').trim();
 if(!text||text.length>100000)throw new HttpError(400,'正文为空或超过 100000 字符，请分成较小文件。');
 return {text,warnings:ext==='docx'?['已提取正文及表格文字；图片、页眉页脚和原有排版未导入。请核对后再交给 AI。']:[]};
}
export function documentUpload(){
 return [(req,res,next)=>upload(req,res,e=>next(e?new HttpError(e.code==='LIMIT_FILE_SIZE'?413:400,'请上传一份 10 MB 以内的 Word (.docx) 或 TXT 文件。'):undefined)),
 async(req,res)=>{if(!req.file)throw new HttpError(400,'请选择文件。');res.json(await extractDocument(req.file.buffer,req.file.originalname));}];
}
