import fs from 'node:fs';
import {isDeepStrictEqual} from 'node:util';
import {createPool,transaction} from '../src/db.js';
import {version} from '../src/content.js';
const [mode,file]=process.argv.slice(2);
if(!['export','import','check'].includes(mode)||!file)throw Error('Use export/import/check FILE');
const ids=['newstart-2026','light-2026','love-2026','kangbao-2026','lushan-2026'];
const keys=['timeline.heading','impact.childrenValue','impact.regionsValue','impact.fundsValue'];
const pool=createPool();
try{await transaction(pool,async c=>{
 if(mode==='export'){
  await c.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY');
  const data={tables:[],releases:[],site:[]};
  const specs=[
   ['timeline_years',"id='year-2026'"],
   ['timeline_year_translations',"year_id='year-2026'"],
   ['media_assets',"id IN (SELECT media_id FROM content_blocks WHERE event_id=ANY($1))"],
   ['timeline_events','id=ANY($1)'],
   ['timeline_event_translations','event_id=ANY($1)'],
   ['content_blocks','event_id=ANY($1)'],
   ['content_block_translations','block_id IN (SELECT id FROM content_blocks WHERE event_id=ANY($1))']
  ];
  for(const [name,where]of specs)data.tables.push({name,rows:(await c.query('SELECT to_jsonb(t) AS row FROM '+name+' t WHERE '+where,where.includes('$1')?[ids]:[])).rows.map(x=>x.row)});
  data.releases=(await c.query("SELECT entity_type,entity_id,snapshot FROM published_content WHERE (entity_type='year' AND entity_id='year-2026') OR (entity_type='event' AND entity_id=ANY($1)) ORDER BY CASE entity_type WHEN 'year' THEN 0 ELSE 1 END",[ids])).rows;
  if(data.releases.length!==6)throw Error('All five events and parent year must already be published locally');
  for(const key of keys){
   const {rows:[row]}=await c.query("SELECT s.*,p.snapshot FROM site_content s JOIN published_content p ON p.entity_type='site' AND p.entity_id=s.id WHERE content_key=$1",[key]);
   if(!row)throw Error('Missing published site content '+key);data.site.push(row);
  }
  fs.writeFileSync(file,JSON.stringify(data));console.log(JSON.stringify(data.tables.map(t=>({table:t.name,count:t.rows.length}))));return;
 }
 const data=JSON.parse(fs.readFileSync(file,'utf8'));
 const allowed=['timeline_years','timeline_year_translations','media_assets','timeline_events','timeline_event_translations','content_blocks','content_block_translations'];
 if(JSON.stringify(data.tables.map(t=>t.name))!==JSON.stringify(allowed))throw Error('Unexpected tables');
 await c.query('SELECT pg_advisory_xact_lock(738402)');
 const q=x=>'"'+x+'"';
 for(const {name,rows}of data.tables){
  for(const row of rows){
   const pk=name==='timeline_year_translations'?['year_id','lang']:name==='timeline_event_translations'?['event_id','lang']:name==='content_block_translations'?['block_id','lang']:['id'];
   const existing=(await c.query('SELECT to_jsonb(t) AS row FROM '+name+' t WHERE '+pk.map((k,i)=>q(k)+'=$'+(i+1)).join(' AND '),pk.map(k=>row[k]))).rows[0];
   if(existing){
    if(Object.keys(row).some(k=>['created_at','updated_at'].includes(k)?new Date(existing.row[k]).getTime()!==new Date(row[k]).getTime():!isDeepStrictEqual(existing.row[k],row[k])))throw Error('Existing content differs; refusing overwrite: '+name+' '+pk.map(k=>row[k]).join('/'));
   }else if(mode==='import')await c.query('INSERT INTO '+name+' SELECT * FROM jsonb_populate_record(NULL::'+name+',$1::jsonb)',[JSON.stringify(row)]);
  }
 }
 for(const site of data.site){
  const existing=(await c.query('SELECT * FROM site_content WHERE id=$1 AND content_key=$2',[site.id,site.content_key])).rows[0];
  if(!existing||existing.status!=='published')throw Error('Site entry absent or has editorial draft: '+site.content_key);
  const prior=(await c.query('SELECT lang,value FROM site_content_translations WHERE site_content_id=$1',[site.id])).rows;
  const accepted=site.content_key==='timeline.heading'?['Our Efforts: 2016 - 2025','Our Efforts: 2016–2025','我们的努力：2016–2025']:site.content_key==='impact.childrenValue'?['140']:site.content_key==='impact.fundsValue'?['￥800,000+','¥800,000+']:['5'];
  for(const t of prior)if(!accepted.includes(t.value)&&t.value!==site.snapshot.translations[t.lang]?.value)throw Error('Unexpected online site edit: '+site.content_key);
 }
 if(mode==='check'){console.log('Preflight passed: scoped content can be imported without overwriting unrelated work.');return;}
 for(const r of data.releases) {
  const exists=(await c.query('SELECT snapshot=$3::jsonb AS same FROM published_content WHERE entity_type=$1 AND entity_id=$2',[r.entity_type,r.entity_id,JSON.stringify(r.snapshot)])).rows[0];
  if(exists&&!exists.same)throw Error('Release already differs: '+r.entity_id);
  if(!exists)await version(c,r.entity_type,r.entity_id,'sync-reviewed-2026',r.snapshot);
 }
 for(const site of data.site){
  for(const [lang,t]of Object.entries(site.snapshot.translations))await c.query('UPDATE site_content_translations SET value=$3 WHERE site_content_id=$1 AND lang=$2',[site.id,lang,JSON.stringify(t.value)]);
  const same=(await c.query("SELECT snapshot=$2::jsonb AS same FROM published_content WHERE entity_type='site' AND entity_id=$1",[site.id,JSON.stringify(site.snapshot)])).rows[0]?.same;
  if(!same)await version(c,'site',site.id,'sync-reviewed-2026',site.snapshot);
 }
 console.log('Imported five published 2026 events, year, referenced media and four site values atomically.');
});}finally{await pool.end();}
