import {publicChatRouter} from './public-chat.js';
import {assistantRouter} from './assistant.js';
import {documentUpload} from './documents.js';
import {pagesRouter} from './pages.js';
import {defaultUploadDir,uploadImage} from './uploads.js';
import {adminEditor} from './admin-editor.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {randomUUID,createHash,timingSafeEqual} from 'node:crypto';
import {z} from 'zod';
import {transaction} from './db.js';
import {HttpError,validate,id,lang,yearInput,eventInput,blockInput,mediaInput,siteInput,aiInput} from './validation.js';
import {publicTimeline,publicSite,eventSnapshot,saveEventVersion,version,lockEvent,draftEvent,putYear,putEvent,putBlock} from './content.js';
import {createAIProvider,reviewDraft} from './ai.js';
const hash=s=>createHash('sha256').update(s).digest();
export function createApp({pool,uploadDir=defaultUploadDir,adminKey=process.env.ADMIN_API_KEY,provider=createAIProvider(),corsOrigin=process.env.CORS_ORIGIN||'http://localhost:3000'}){
 const app=express();app.disable('x-powered-by');app.use(helmet({crossOriginResourcePolicy:{policy:'cross-origin'}}));app.use(cors({origin:corsOrigin.split(',')}));app.use(express.json({limit:'1mb'}));
 const language=req=>validate(lang,req.query.lang??'en');
 const readPublished=fn=>transaction(pool,async c=>{await c.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY');return fn(c);});
 app.get('/api/health',async(req,res)=>{try{await pool.query('SELECT 1');res.json({status:'ok',database:'connected'});}catch{res.status(503).json({error:{message:'Database unavailable'}});}});
 app.get('/api/v1/timeline',async(req,res)=>res.json({data:await readPublished(c=>publicTimeline(c,language(req)))}));
 app.get('/api/v1/timeline/:year',async(req,res)=>res.json({data:await readPublished(c=>publicTimeline(c,language(req),{year:validate(z.coerce.number().int().min(1900).max(2200),req.params.year)}))}));
 app.get('/api/v1/events/:slug',async(req,res)=>res.json({data:await readPublished(c=>publicTimeline(c,language(req),{slug:validate(id,req.params.slug)}))}));
 app.get('/api/v1/site-content',async(req,res)=>res.json(await readPublished(c=>publicSite(c,language(req)))));
 app.use('/api/v1',publicChatRouter(pool,provider));
 app.use('/api/admin',(req,res,next)=>{
  res.set('Cache-Control','no-store');
  if(!adminKey)return next(new HttpError(503,'Administration disabled: set ADMIN_API_KEY'));
  const supplied=req.get('x-admin-api-key')||req.get('authorization')?.replace(/^Bearer /,'')||'';
  if(!timingSafeEqual(hash(supplied),hash(adminKey)))return next(new HttpError(401,'Invalid administrator API key'));
  next();
 });
 app.post('/api/admin/media/upload',...uploadImage(pool,uploadDir));
 app.use('/media/uploads',express.static(uploadDir,{dotfiles:'deny',index:false,immutable:true,maxAge:'1y'}));
 app.use('/media/uploads',(req,res)=>res.status(404).end());
 app.use('/api/admin',adminEditor(pool));
 app.use('/api/admin',pagesRouter(pool));
 app.use('/api/admin',assistantRouter(pool,provider));
 app.post('/api/admin/documents/extract',...documentUpload());
 const eid=req=>validate(id,req.params.id);
 app.put('/api/admin/years/:year',async(req,res)=>{
  const data=validate(yearInput,req.body);if(String(data.year)!==req.params.year)throw new HttpError(400,'Year path and body must match');
  res.json({data:await transaction(pool,c=>putYear(c,data))});
 });
 app.post('/api/admin/events',async(req,res)=>{
  const data=validate(eventInput,req.body);
  res.status(201).json({data:await transaction(pool,async c=>{const id=await putEvent(c,data,randomUUID(),true);await saveEventVersion(c,id,'create-draft');return eventSnapshot(c,id);})});
 });
 app.get('/api/admin/events/:id',async(req,res)=>res.json({data:await readPublished(c=>eventSnapshot(c,eid(req)))}));
 app.put('/api/admin/events/:id',async(req,res)=>{
  const data=validate(eventInput,req.body),id=eid(req);
  res.json({data:await transaction(pool,async c=>{await putEvent(c,data,id);await saveEventVersion(c,id,'save-draft');return eventSnapshot(c,id);})});
 });
 app.post('/api/admin/events/:id/draft',async(req,res)=>{
  validate(z.object({}).strict(),req.body??{});const id=eid(req);
  res.json({data:await transaction(pool,async c=>{await lockEvent(c,id);await draftEvent(c,id);await saveEventVersion(c,id,'save-draft');return eventSnapshot(c,id);})});
 });
 for(const operation of ['publish','archive'])app.post('/api/admin/events/:id/'+operation,async(req,res)=>{
  const control=validate(z.object({expected_revision:z.string().regex(/^\d+$/).optional()}).strict(),req.body??{});const id=eid(req),state=operation==='publish'?'published':'archived';
  res.json({data:await transaction(pool,async c=>{
   const event=await lockEvent(c,id);
   if(control.expected_revision!==undefined&&(await eventSnapshot(c,id)).revision!==control.expected_revision)throw new HttpError(409,'Event changed since review. Reload and review before publishing or archiving.');
   if(operation==='publish'){
    const s=await eventSnapshot(c,id);
    if(!s.translations.en?.title?.trim()||!s.blocks.length)throw new HttpError(422,'Publishing requires an English title and content blocks');
    for(const b of s.blocks)if(b.type!=='image'&&!b.translations.en?.content?.trim())throw new HttpError(422,'Publishing requires English text for fallback');
    const y=(await c.query("SELECT 'published' AS status FROM published_content WHERE entity_type='year' AND entity_id=$1",[event.year_id])).rows[0];
    if(y?.status!=='published')throw new HttpError(409,'Publish the parent year before publishing this event');
   }
   await c.query('UPDATE timeline_events SET status=$2,updated_at=now() WHERE id=$1',[id,state]);
   await c.query('UPDATE content_blocks SET status=$2 WHERE event_id=$1',[id,state]);
   await saveEventVersion(c,id,operation);return eventSnapshot(c,id);
  })});
 });
 app.post('/api/admin/events/:id/blocks',async(req,res)=>{
  const data=validate(blockInput,req.body),id=eid(req);
  res.status(201).json({data:await transaction(pool,async c=>{
   await lockEvent(c,id);const blockId=await putBlock(c,id,data,data.id??randomUUID(),true);await saveEventVersion(c,id,'create-block');return {id:blockId};
  })});
 });
 app.put('/api/admin/events/:id/blocks/:blockId',async(req,res)=>{
  const data=validate(blockInput,req.body),id=eid(req),blockId=validate(idSchema,req.params.blockId);
  if(data.id&&data.id!==blockId)throw new HttpError(400,'Block IDs must match');
  res.json({data:await transaction(pool,async c=>{await lockEvent(c,id);await putBlock(c,id,data,blockId);await saveEventVersion(c,id,'update-block');return {id:blockId};})});
 });
 app.post('/api/admin/events/:id/blocks/reorder',async(req,res)=>{
  const data=validate(z.object({block_ids:z.array(id).min(1).max(2000)}).strict(),req.body),eventId=eid(req);
  res.json({data:await transaction(pool,async c=>{
   await lockEvent(c,eventId);const s=await eventSnapshot(c,eventId);
   if(new Set(data.block_ids).size!==data.block_ids.length||data.block_ids.length!==s.blocks.length||data.block_ids.some(id=>!s.blocks.some(b=>b.id===id)))throw new HttpError(400,'block_ids must contain every event block exactly once');
   for(const[i,bid]of data.block_ids.entries())await c.query('UPDATE content_blocks SET sort_order=$2 WHERE id=$1',[bid,i]);
   await draftEvent(c,eventId);await saveEventVersion(c,eventId,'reorder-blocks');return eventSnapshot(c,eventId);
  })});
 });
 app.get('/api/admin/events/:id/versions',async(req,res)=>{
  const id=eid(req);await eventSnapshot(pool,id);
  const versions=(await pool.query("SELECT * FROM content_versions WHERE entity_type='event' AND entity_id=$1 ORDER BY id DESC",[id])).rows;
  const mediaIds=[...new Set(versions.flatMap(v=>(v.snapshot.blocks||[]).map(b=>b.media_id).filter(Boolean)))];
  const media=Object.fromEntries((await pool.query('SELECT id,url FROM media_assets WHERE id=ANY($1::text[])',[mediaIds])).rows.map(m=>[m.id,m.url]));
  for(const v of versions)for(const b of v.snapshot.blocks||[])if(b.media_id)b.src=media[b.media_id]||null;
  res.json({data:versions});
 });
 app.post('/api/admin/events/:id/versions/:versionId/restore',async(req,res)=>{
  const control=validate(z.object({expected_revision:z.string().regex(/^\d+$/).optional()}).strict(),req.body??{});const id=eid(req),vid=validate(z.string().regex(/^\d+$/),req.params.versionId);
  res.json({data:await transaction(pool,async c=>{
   await lockEvent(c,id);
   if(control.expected_revision!==undefined&&(await eventSnapshot(c,id)).revision!==control.expected_revision)throw new HttpError(409,'Event changed since review. Reload before restoring.');
   const row=(await c.query("SELECT snapshot FROM content_versions WHERE id=$1 AND entity_type='event' AND entity_id=$2",[vid,id])).rows[0];
   if(!row)throw new HttpError(404,'Version not found');
   const s=row.snapshot;await putEvent(c,s,id);
   await c.query('DELETE FROM timeline_event_translations WHERE event_id=$1',[id]);
   for(const[lang,t]of Object.entries(s.translations))await c.query('INSERT INTO timeline_event_translations VALUES($1,$2,$3)',[id,lang,t.title]);
   await c.query('DELETE FROM content_blocks WHERE event_id=$1',[id]);
   for(const b of s.blocks)await putBlock(c,id,b,b.id,true);
   await saveEventVersion(c,id,'restore-as-draft');return eventSnapshot(c,id);
  })});
 });
 app.get('/api/admin/versions',async(req,res)=>{
  const type=validate(z.enum(['event','year','site','legacy','media','page']),req.query.entity_type),entityId=validate(id,req.query.entity_id);
  res.json({data:(await pool.query('SELECT * FROM content_versions WHERE entity_type=$1 AND entity_id=$2 ORDER BY id DESC LIMIT 100',[type,entityId])).rows});
 });
 app.post('/api/admin/versions/:versionId/restore',async(req,res)=>{
  validate(z.object({}).strict(),req.body??{});const vid=validate(z.string().regex(/^\d+$/),req.params.versionId);
  res.json({data:await transaction(pool,async c=>{
   const v=(await c.query('SELECT * FROM content_versions WHERE id=$1',[vid])).rows[0];
   if(!v)throw new HttpError(404,'Version not found');
   if(v.entity_type==='year'){await c.query('DELETE FROM timeline_year_translations WHERE year_id=$1',[v.entity_id]);return putYear(c,validate(yearInput,{...v.snapshot,status:'draft'}));}
   if(v.entity_type==='site'){
    const s=validate(siteInput,{...v.snapshot,status:'draft'});
    const r=await c.query("UPDATE site_content SET content_key=$2,status='draft' WHERE id=$1 RETURNING id",[v.entity_id,s.content_key]);
    if(!r.rowCount)throw new HttpError(404,'Site content not found');
    await c.query('DELETE FROM site_content_translations WHERE site_content_id=$1',[v.entity_id]);
    for(const[lang,t]of Object.entries(s.translations))await c.query('INSERT INTO site_content_translations VALUES($1,$2,$3)',[v.entity_id,lang,JSON.stringify(t.value)]);
    await version(c,'site',v.entity_id,'restore-as-draft',s);return {id:v.entity_id,...s};
   }
   throw new HttpError(400,'Use the event restore endpoint for event versions; source archives and media snapshots are read-only');
  })});
 });
 app.post('/api/admin/media',async(req,res)=>{
  const data=validate(mediaInput,req.body);
  const row=await transaction(pool,async c=>{const saved=(await c.query('INSERT INTO media_assets(id,url,metadata) VALUES($1,$2,$3) ON CONFLICT(url) DO UPDATE SET metadata=EXCLUDED.metadata RETURNING *',[randomUUID(),data.url,data.metadata])).rows[0];await version(c,'media',saved.id,'save',saved);return saved;});
  res.status(201).json({data:row});
 });
 app.put('/api/admin/site-content/:id',async(req,res)=>{
  const data=validate(siteInput,req.body),id=eid(req);
  res.json({data:await transaction(pool,async c=>{
   await c.query('INSERT INTO site_content VALUES($1,$2,$3) ON CONFLICT(id) DO UPDATE SET content_key=$2,status=$3',[id,data.content_key,data.status]);
   for(const[lang,t]of Object.entries(data.translations))await c.query('INSERT INTO site_content_translations VALUES($1,$2,$3) ON CONFLICT(site_content_id,lang) DO UPDATE SET value=$3',[id,lang,JSON.stringify(t.value)]);
   const translations=Object.fromEntries((await c.query('SELECT lang,value FROM site_content_translations WHERE site_content_id=$1',[id])).rows.map(({lang,...t})=>[lang,t]));
   await version(c,'site',id,'save',{...data,translations});return {id,...data,translations};
  })});
 });
 app.get('/api/admin/ai/suggestions',async(req,res)=>res.json({data:(await pool.query('SELECT id,job_id,status,warnings,event_id,created_at FROM ai_suggestions ORDER BY created_at DESC LIMIT 100')).rows}));
 app.get('/api/admin/ai/suggestions/:id',async(req,res)=>{
  const row=(await pool.query('SELECT s.*,j.source_text FROM ai_suggestions s JOIN ai_jobs j ON j.id=s.job_id WHERE s.id=$1',[eid(req)])).rows[0];
  if(!row)throw new HttpError(404,'Suggestion not found');res.json({data:row});
 });
 app.get('/api/admin/ai/jobs/:id',async(req,res)=>{
  const row=(await pool.query('SELECT * FROM ai_jobs WHERE id=$1',[eid(req)])).rows[0];
  if(!row)throw new HttpError(404,'AI job not found');res.json({data:row});
 });
 app.post('/api/admin/ai/drafts',async(req,res)=>{
  const {source_text}=validate(aiInput,req.body);
  if(!provider.configured())throw new HttpError(503,'AI is not configured: check AI_PROVIDER and its API key/model in backend/.env');
  const jobId=randomUUID();
  await pool.query("INSERT INTO ai_jobs(id,status,source_text,provider,model) VALUES($1,'running',$2,$3,$4)",[jobId,source_text,provider.name,provider.model]);
  try{
   const payload=reviewDraft(await provider.generate(source_text),source_text),suggestionId=randomUUID();
   await transaction(pool,async c=>{
    await c.query("INSERT INTO ai_suggestions(id,job_id,payload,warnings) VALUES($1,$2,$3,$4)",[suggestionId,jobId,payload,JSON.stringify(payload.warnings)]);
    await c.query("UPDATE ai_jobs SET status='completed',updated_at=now() WHERE id=$1",[jobId]);
   });
   res.status(201).json({job_id:jobId,suggestion_id:suggestionId,status:'pending'});
  }catch(e){
   await pool.query("UPDATE ai_jobs SET status='failed',error=$2,updated_at=now() WHERE id=$1",[jobId,e instanceof HttpError?e.message:'AI processing failed']);
   if(e instanceof HttpError){e.details={job_id:jobId};throw e;}throw new HttpError(502,'AI processing failed',{job_id:jobId});
  }
 });
 for(const action of ['accept','reject'])app.post('/api/admin/ai/suggestions/:id/'+action,async(req,res)=>{
  const body=validate(z.object({warnings_acknowledged:z.boolean().optional()}).strict(),req.body??{}),suggestionId=eid(req);
  res.json({data:await transaction(pool,async c=>{
   const s=(await c.query('SELECT * FROM ai_suggestions WHERE id=$1 FOR UPDATE',[suggestionId])).rows[0];
   if(!s)throw new HttpError(404,'Suggestion not found');if(s.status!=='pending')throw new HttpError(409,'Suggestion already reviewed');
   let eventId=null;
   if(action==='accept'){
    if(s.warnings.length&&!body.warnings_acknowledged)throw new HttpError(422,'Review source and warnings, then set warnings_acknowledged=true');
    const p=s.payload;
    if(p.year===null)throw new HttpError(422,'Suggestion has no confirmed year; regenerate with dated source');
    const yearId='year-'+p.year;
    if(!(await c.query('SELECT 1 FROM timeline_years WHERE id=$1',[yearId])).rowCount)await putYear(c,validate(yearInput,{year:p.year,translations:p.year_summaries}));
    eventId=await putEvent(c,validate(eventInput,{year_id:yearId,slug:p.slug,event_date:p.event_date,translations:p.titles}),randomUUID(),true);
    for(const[i,b]of p.blocks.entries()){
     let mediaId=null;
     if(b.type==='image'){
      if(!b.image_url)throw new HttpError(422,'Resolve missing image URL before accepting');
      const m=validate(mediaInput,{url:b.image_url});
      mediaId=(await c.query('INSERT INTO media_assets(id,url) VALUES($1,$2) ON CONFLICT(url) DO UPDATE SET url=EXCLUDED.url RETURNING id',[randomUUID(),m.url])).rows[0].id;
     }
     const translations=Object.fromEntries(Object.entries(b.translations).map(([l,t])=>[l,Object.fromEntries(Object.entries(t).filter(([,v])=>v!==null))]));
     await putBlock(c,eventId,validate(blockInput,{type:b.type,sort_order:i,media_id:mediaId,translations}),randomUUID(),true);
    }await saveEventVersion(c,eventId,'accept-ai-as-draft');
   }
   return (await c.query('UPDATE ai_suggestions SET status=$2,event_id=$3,reviewed_at=now() WHERE id=$1 RETURNING *',[suggestionId,action==='accept'?'accepted':'rejected',eventId])).rows[0];
  })});
 });
 app.use('/api',(req,res,next)=>next(new HttpError(404,'API route not found')));
 app.use((err,req,res,next)=>{
  if(res.headersSent)return next(err);
  const dbConflict=['23505','23503','23514','23502'].includes(err.code);
  const status=err.status??(dbConflict?409:500);
  res.status(status).json({error:{message:status<500?err.message:err instanceof HttpError?err.message:'Internal server error',...(err.details?{details:err.details}:{})}});
 });
 return app;
}
const idSchema=id;
