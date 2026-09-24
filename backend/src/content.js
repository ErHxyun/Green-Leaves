import {randomUUID} from 'node:crypto';
import {HttpError} from './validation.js';
export async function eventSnapshot(c,id){
 const e=(await c.query('SELECT * FROM timeline_events WHERE id=$1',[id])).rows[0];
 if(!e)throw new HttpError(404,'Event not found');
 e.translations=Object.fromEntries((await c.query('SELECT lang,title FROM timeline_event_translations WHERE event_id=$1',[id])).rows.map(({lang,...t})=>[lang,t]));
 e.blocks=(await c.query('SELECT b.*,m.url AS src FROM content_blocks b LEFT JOIN media_assets m ON m.id=b.media_id WHERE b.event_id=$1 ORDER BY b.sort_order,b.id',[id])).rows;
 for(const b of e.blocks)b.translations=Object.fromEntries((await c.query('SELECT lang,content,caption,alt FROM content_block_translations WHERE block_id=$1',[b.id])).rows.map(({lang,...t})=>[lang,t]));
 e.has_published_version=!!(await c.query("SELECT 1 FROM published_content WHERE entity_type='event' AND entity_id=$1",[id])).rowCount;
 e.revision=(await c.query("SELECT COALESCE(MAX(id),0)::text AS revision FROM content_versions WHERE entity_type='event' AND entity_id=$1",[id])).rows[0].revision;
 return e;
}
export async function version(c,type,id,action,snapshot){
 await c.query('INSERT INTO content_versions(entity_type,entity_id,action,snapshot) VALUES($1,$2,$3,$4)',[type,id,action,snapshot]);
}
export async function saveEventVersion(c,id,action){await version(c,'event',id,action,await eventSnapshot(c,id));}
export async function lockEvent(c,id){
 const e=(await c.query('SELECT * FROM timeline_events WHERE id=$1 FOR UPDATE',[id])).rows[0];
 if(!e)throw new HttpError(404,'Event not found');return e;
}
export async function draftEvent(c,id){
 await c.query("UPDATE timeline_events SET status='draft',updated_at=now() WHERE id=$1",[id]);
 await c.query("UPDATE content_blocks SET status='draft' WHERE event_id=$1",[id]);
}
export async function putYear(c,data){
 const id='year-'+data.year;
 await c.query('INSERT INTO timeline_years(id,year,sort_order,icon,status) VALUES($1,$2,$3,$4,$5) ON CONFLICT(year) DO UPDATE SET sort_order=$3,icon=$4,status=$5',[id,data.year,data.sort_order,data.icon,data.status]);
 for(const[lang,t]of Object.entries(data.translations))await c.query('INSERT INTO timeline_year_translations VALUES($1,$2,$3,$4) ON CONFLICT(year_id,lang) DO UPDATE SET title=$3,summary=$4',[id,lang,t.title,t.summary]);
 const translations=Object.fromEntries((await c.query('SELECT lang,title,summary FROM timeline_year_translations WHERE year_id=$1',[id])).rows.map(({lang,...t})=>[lang,t]));
 await version(c,'year',id,'save',{...data,translations});return {id,...data,translations};
}
export async function putEvent(c,data,id=randomUUID(),create=false){
 if(create)await c.query("INSERT INTO timeline_events(id,year_id,slug,event_date,sort_order,status) VALUES($1,$2,$3,$4,$5,'draft')",[id,data.year_id,data.slug,data.event_date,data.sort_order]);
 else{await lockEvent(c,id);await c.query('UPDATE timeline_events SET year_id=$2,slug=$3,event_date=$4,sort_order=$5 WHERE id=$1',[id,data.year_id,data.slug,data.event_date,data.sort_order]);await draftEvent(c,id);}
 for(const[lang,t]of Object.entries(data.translations))await c.query('INSERT INTO timeline_event_translations VALUES($1,$2,$3) ON CONFLICT(event_id,lang) DO UPDATE SET title=$3',[id,lang,t.title]);
 return id;
}
export async function putBlock(c,eventId,data,blockId=randomUUID(),create=false){
 if(create)await c.query("INSERT INTO content_blocks(id,event_id,type,sort_order,media_id,status) VALUES($1,$2,$3,$4,$5,'draft')",[blockId,eventId,data.type,data.sort_order,data.media_id]);
 else{
  const r=await c.query('UPDATE content_blocks SET type=$3,sort_order=$4,media_id=$5 WHERE id=$1 AND event_id=$2',[blockId,eventId,data.type,data.sort_order,data.media_id]);
  if(!r.rowCount)throw new HttpError(404,'Block not found');
 }
 for(const[lang,t]of Object.entries(data.translations))await c.query('INSERT INTO content_block_translations VALUES($1,$2,$3,$4,$5) ON CONFLICT(block_id,lang) DO UPDATE SET content=$3,caption=$4,alt=$5',[blockId,lang,t.content??null,t.caption??null,t.alt??null]);
 await draftEvent(c,eventId);return blockId;
}
export function localize(translations,language,fields){
 const result={},fallbackFields=[];
 for(const field of fields){
  const requested=translations[language]?.[field],english=translations.en?.[field];
  if(requested!==undefined&&requested!==null&&requested!=='')result[field]=requested;
  else{result[field]=english??'';if(language!=='en'&&english!==undefined&&english!==null)fallbackFields.push(field);}
 }
 return {...result,translation:{requestedLanguage:language,fallbackLanguage:fallbackFields.length?'en':null,fallbackFields}};
}
export async function publicTimeline(c,language,{year,slug}={}){
 const released=(await c.query("SELECT entity_type,snapshot FROM published_content WHERE entity_type IN ('year','event')")).rows;
 const media=Object.fromEntries((await c.query('SELECT id,url FROM media_assets')).rows.map(m=>[m.id,m.url]));
 const years=released.filter(r=>r.entity_type==='year').map(r=>r.snapshot).filter(y=>year===undefined||y.year===year).sort((a,b)=>a.sort_order-b.sort_order||a.year-b.year);
 const events=released.filter(r=>r.entity_type==='event').map(r=>r.snapshot).sort((a,b)=>a.sort_order-b.sort_order||a.id.localeCompare(b.id));
 const result=years.map(y=>({id:y.id,year:y.year,status:'published',sort_order:y.sort_order,icon:y.icon,...localize(y.translations,language,['title','summary']),
  events:events.filter(e=>e.year_id===y.id&&(!slug||e.slug===slug)).map(e=>({
   id:e.id,year_id:e.year_id,slug:e.slug,event_date:e.event_date,sort_order:e.sort_order,status:'published',...localize(e.translations,language,['title']),
   detailBlocks:[...e.blocks].sort((a,b)=>a.sort_order-b.sort_order).map(b=>({id:b.id,type:b.type,sort_order:b.sort_order,src:media[b.media_id]||b.src||null,...localize(b.translations,language,b.type==='image'?['caption','alt']:['content'])}))
  }))
 }));
 if(slug){const e=result.flatMap(y=>y.events).find(e=>e.slug===slug);if(!e)throw new HttpError(404,'Event not found');return e;}
 if(year){if(!result.length)throw new HttpError(404,'Year not found');return result[0];}
 return result;
}
export async function publicSite(c,language){
 const rows=(await c.query("SELECT snapshot FROM published_content WHERE entity_type='site' ORDER BY snapshot->>'content_key'")).rows.map(r=>r.snapshot);
 const resources={},fallbacks=[];
 for(const s of rows){
  const localized=localize(s.translations,language,['value']);
  const parts=s.content_key.split('.');let target=resources;for(const part of parts.slice(0,-1))target=target[part]??=Object.create(null);target[parts.at(-1)]=localized.value;
  if(localized.translation.fallbackFields.length)fallbacks.push(s.content_key);
 }
 const sections=(await c.query("SELECT snapshot FROM published_content WHERE entity_type='page'")).rows;
 if(sections.length)resources.pageMedia={};
 for(const {snapshot:s} of sections)resources.pageMedia[s.id]=s.images.map(i=>({id:i.id,src:i.src,...localize(i.translations,language,['alt','caption'])}));
 return {resources,translation:{requestedLanguage:language,fallbackLanguage:fallbacks.length?'en':null,fallbackKeys:fallbacks}};
}
