import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createPool,transaction} from '../src/db.js';
import {putEvent,putBlock,saveEventVersion,version,eventSnapshot} from '../src/content.js';
import {eventInput,blockInput} from '../src/validation.js';
const article=JSON.parse(fs.readFileSync(new URL('../content/2026-kangbao.json',import.meta.url),'utf8'));
const pool=createPool();
try {
 const result=await transaction(pool,async c=>{
  await c.query('SELECT pg_advisory_xact_lock(738402)');
  if((await c.query('SELECT 1 FROM timeline_events WHERE id=$1 OR slug=$2',[article.id,article.slug])).rowCount)return {status:'already-exists',id:article.id};
  const {year_id,slug,event_date,sort_order,translations}=article;
  await putEvent(c,eventInput.parse({year_id,slug,event_date,sort_order,translations}),article.id,true);
  for(const block of article.blocks){
   let media_id=null;
   if(block.type==='image'){
    const disk=new URL('../../frontend/src/pictures/2026-kangbao/'+block.file,import.meta.url);
    const bytes=fs.statSync(fileURLToPath(disk)).size;
    const url='/media/source/2026-kangbao/'+block.file;
    media_id=(await c.query('INSERT INTO media_assets(id,url,metadata) VALUES($1,$2,$3) ON CONFLICT(url) DO UPDATE SET url=EXCLUDED.url RETURNING id',['kangbao-2026-'+block.file.replace(/[^a-z0-9]/gi,'-'),url,{bytes,source:'user-provided',privacy_review_required:true}])).rows[0].id;
   }
   await putBlock(c,article.id,blockInput.parse({type:block.type,sort_order:block.sort_order,media_id,translations:block.translations}),block.id,true);
  }
  await saveEventVersion(c,article.id,'import-user-article-draft');
  await version(c,'event',article.id,'editorial-review-notes',{...await eventSnapshot(c,article.id),warnings:article.warnings});
  return {status:'draft',id:article.id,blocks:article.blocks.length,images:article.blocks.filter(b=>b.type==='image').length,warnings:article.warnings.length};
 });
 console.log(JSON.stringify(result));
}finally{await pool.end();}
