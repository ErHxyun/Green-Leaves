import {Router} from 'express';
import {randomUUID} from 'node:crypto';
import {z} from 'zod';
import {transaction} from './db.js';
import {id,validate,eventInput,blockInput,HttpError} from './validation.js';
import {eventSnapshot,lockEvent,putEvent,putBlock,saveEventVersion} from './content.js';

const editorInput=z.object({
 event:eventInput,
 blocks:z.array(blockInput).max(2000),
 expected_revision:z.string().regex(/^\d+$/).nullable()
}).strict().superRefine((data,ctx)=>{
 const ids=data.blocks.map(b=>b.id).filter(Boolean);
 if(new Set(ids).size!==ids.length)ctx.addIssue({code:'custom',message:'Duplicate block IDs'});
 if(data.blocks.some((b,i)=>b.sort_order!==i))ctx.addIssue({code:'custom',message:'Block order must be contiguous from zero'});
});
export function adminEditor(pool){
 const router=Router();
 router.get('/years',async(req,res)=>{
  const years=(await pool.query("SELECT y.*,EXISTS(SELECT 1 FROM published_content WHERE entity_type='year' AND entity_id=y.id) AS has_published_version FROM timeline_years y ORDER BY year DESC")).rows;
  const translations=(await pool.query('SELECT * FROM timeline_year_translations')).rows;
  res.json({data:years.map(y=>({...y,translations:Object.fromEntries(translations.filter(t=>t.year_id===y.id).map(({lang,title,summary})=>[lang,{title,summary}]))}))});
 });
 router.get('/events',async(req,res)=>{
  const query=validate(z.object({q:z.string().max(200).default(''),status:z.enum(['draft','published','archived','all']).default('all')}).strict(),req.query);
  const result=await pool.query(`SELECT e.*,y.year,EXISTS(SELECT 1 FROM published_content WHERE entity_type='event' AND entity_id=e.id) AS has_published_version,
   COALESCE((SELECT jsonb_object_agg(t.lang,jsonb_build_object('title',t.title)) FROM timeline_event_translations t WHERE t.event_id=e.id),'{}') AS translations
   FROM timeline_events e JOIN timeline_years y ON y.id=e.year_id
   WHERE ($1='all' OR e.status=$1) AND ($2='' OR e.slug ILIKE '%'||$2||'%' OR EXISTS(SELECT 1 FROM timeline_event_translations t WHERE t.event_id=e.id AND t.title ILIKE '%'||$2||'%'))
   ORDER BY y.year DESC,e.sort_order,e.id`,[query.status,query.q]);
  res.json({data:result.rows});
 });
 router.get('/media',async(req,res)=>{
  const q=validate(z.object({q:z.string().max(200).default(''),offset:z.coerce.number().int().nonnegative().max(1000000).default(0),limit:z.coerce.number().int().min(1).max(100).default(24)}).strict(),req.query);
  const rows=await pool.query("SELECT * FROM media_assets WHERE (url ILIKE '%'||$1||'%' OR metadata->>'original_name' ILIKE '%'||$1||'%') ORDER BY metadata->>'uploaded_at' DESC NULLS LAST,url LIMIT $2 OFFSET $3",[q.q,q.limit,q.offset]);
  const count=await pool.query("SELECT count(*) FROM media_assets WHERE (url ILIKE '%'||$1||'%' OR metadata->>'original_name' ILIKE '%'||$1||'%')",[q.q]);
  res.json({data:rows.rows,total:Number(count.rows[0].count)});
 });
 router.get('/site-content',async(req,res)=>{
  const rows=(await pool.query("SELECT s.*,EXISTS(SELECT 1 FROM published_content WHERE entity_type='site' AND entity_id=s.id) AS has_published_version FROM site_content s ORDER BY content_key")).rows;
  const ts=(await pool.query('SELECT * FROM site_content_translations')).rows;
  res.json({data:rows.map(s=>({...s,translations:Object.fromEntries(ts.filter(t=>t.site_content_id===s.id).map(({lang,value})=>[lang,{value}]))}))});
 });
 async function save(req,res,isNew){
  const data=validate(editorInput,req.body),eventId=isNew?randomUUID():validate(id,req.params.id);
  const result=await transaction(pool,async c=>{
   if(!isNew){
    await lockEvent(c,eventId);
    const current=await eventSnapshot(c,eventId);
    if(data.expected_revision!==current.revision)throw new HttpError(409,'This event changed since it was opened. Reload before saving; your unsaved changes have not been applied.');
    const owned=new Set(current.blocks.map(b=>b.id));
    for(const b of data.blocks)if(b.id&&!owned.has(b.id)){
     const existing=await c.query('SELECT 1 FROM content_blocks WHERE id=$1',[b.id]);
     if(existing.rowCount)throw new HttpError(409,'Block belongs to another event');
    }
   }else if(data.expected_revision!==null)throw new HttpError(400,'New drafts require a null revision');
   await putEvent(c,data.event,eventId,isNew);
   // One atomic edit replaces the complete draft, including deleted blocks and translations.
   await c.query('DELETE FROM timeline_event_translations WHERE event_id=$1',[eventId]);
   for(const[lang,t]of Object.entries(data.event.translations))await c.query('INSERT INTO timeline_event_translations VALUES($1,$2,$3)',[eventId,lang,t.title]);
   await c.query('DELETE FROM content_blocks WHERE event_id=$1',[eventId]);
   for(const b of data.blocks)await putBlock(c,eventId,b,b.id||randomUUID(),true);
   await saveEventVersion(c,eventId,'save-editor-draft');
   return eventSnapshot(c,eventId);
  });
  res.status(isNew?201:200).json({data:result});
 }
 router.post('/events/editor',(req,res)=>save(req,res,true));
 router.put('/events/:id/editor',(req,res)=>save(req,res,false));
 return router;
}
