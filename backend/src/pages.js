import {Router} from 'express';
import {randomUUID} from 'node:crypto';
import {z} from 'zod';
import {transaction} from './db.js';
import {validate,id,HttpError} from './validation.js';
import {version} from './content.js';
export async function pageSnapshot(c,id){
 const s=(await c.query('SELECT * FROM page_sections WHERE id=$1',[id])).rows[0];if(!s)throw new HttpError(404,'Page section not found');
 s.images=(await c.query('SELECT i.*,m.url AS src FROM page_images i JOIN media_assets m ON m.id=i.media_id WHERE section_id=$1 ORDER BY sort_order,id',[id])).rows;
 for(const i of s.images)i.translations=Object.fromEntries((await c.query('SELECT lang,alt,caption FROM page_image_translations WHERE image_id=$1',[i.id])).rows.map(({lang,...t})=>[lang,t]));
 s.has_published_version=!!(await c.query("SELECT 1 FROM published_content WHERE entity_type='page' AND entity_id=$1",[id])).rowCount;return s;
}
export function pagesRouter(pool){
 const router=Router();
 router.get('/pages',async(req,res)=>res.json({data:await transaction(pool,async c=>{const list=(await c.query('SELECT id FROM page_sections ORDER BY id')).rows;const result=[];for(const s of list)result.push(await pageSnapshot(c,s.id));return result;})}));
 router.put('/pages/:id',async(req,res)=>{
  const section=validate(id,req.params.id);
  const tr=z.object({alt:z.string().max(2000),caption:z.string().max(10000)}).strict();
  const data=validate(z.object({expected_revision:z.number().int().nonnegative(),status:z.enum(['draft','published']),images:z.array(z.object({id:id.optional(),media_id:id,translations:z.object({cn:tr,en:tr}).strict()}).strict()).min(1).max(30)}).strict(),req.body);
  res.json({data:await transaction(pool,async c=>{
   const current=(await c.query('SELECT * FROM page_sections WHERE id=$1 FOR UPDATE',[section])).rows[0];if(!current)throw new HttpError(404,'Page section not found');
   if(current.revision!==data.expected_revision)throw new HttpError(409,'其他编辑者已修改此区域，请重新打开再编辑。');
   if(!['homeHero','testimonials'].includes(section)&&data.images.length!==1)throw new HttpError(400,'此位置只能放一张图片。');
   const ids=data.images.map(i=>i.id).filter(Boolean);if(new Set(ids).size!==ids.length)throw new HttpError(400,'Duplicate image IDs');
   for(const imageId of ids){const owned=(await c.query('SELECT section_id FROM page_images WHERE id=$1',[imageId])).rows[0];if(owned&&owned.section_id!==section)throw new HttpError(409,'Image belongs to another section');}
   await c.query('DELETE FROM page_images WHERE section_id=$1',[section]);
   for(const [sort,image] of data.images.entries()){
    const imageId=image.id||randomUUID();await c.query('INSERT INTO page_images VALUES($1,$2,$3,$4)',[imageId,section,image.media_id,sort]);
    for(const [lang,t] of Object.entries(image.translations))await c.query('INSERT INTO page_image_translations VALUES($1,$2,$3,$4)',[imageId,lang,t.alt,t.caption]);
   }
   await c.query('UPDATE page_sections SET status=$2,revision=revision+1 WHERE id=$1',[section,data.status]);
   const s=await pageSnapshot(c,section);await version(c,'page',section,data.status==='published'?'publish':'save-draft',s);return pageSnapshot(c,section);
  })});
 });
 return router;
}
