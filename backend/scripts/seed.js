import {seedPages} from './page-seed.js';
import path from 'node:path';
import {validateSeed} from './validate-seed.js';
import {fileURLToPath} from 'node:url';
import {extract} from './extract.js';
import {createPool,transaction} from '../src/db.js';
import {migrate} from './migrate.js';
export async function seedDatabase(pool,seed){
 validateSeed(seed);
 return transaction(pool,async c=>{
  await c.query('SELECT pg_advisory_xact_lock(738402)');
  // Import missing entities only: never overwrite editorial work or republish archived events.
  for(const y of seed.years){
   const r=await c.query('INSERT INTO timeline_years(id,year,sort_order,icon,status) VALUES($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING RETURNING id',[y.id,y.year,y.sort_order,y.icon,y.status]);
   if(r.rowCount)await c.query("INSERT INTO content_versions(entity_type,entity_id,action,snapshot) VALUES('year',$1,'legacy-import',$2)",[y.id,{year:y.year,sort_order:y.sort_order,icon:y.icon,status:y.status,translations:y.translations}]);
   if(r.rowCount)for(const[lang,t]of Object.entries(y.translations))await c.query('INSERT INTO timeline_year_translations VALUES($1,$2,$3,$4)',[y.id,lang,t.title??null,t.summary??null]);
  }
  for(const m of seed.media)await c.query('INSERT INTO media_assets(id,url,metadata) VALUES($1,$2,$3) ON CONFLICT DO NOTHING',[m.id,m.url,m.metadata]);
  for(const e of seed.events){
   const r=await c.query('INSERT INTO timeline_events(id,year_id,slug,event_date,sort_order,status) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING RETURNING id',[e.id,e.year_id,e.slug,e.event_date,e.sort_order,e.status]);
   if(!r.rowCount)continue;
   for(const[lang,t]of Object.entries(e.translations))await c.query('INSERT INTO timeline_event_translations VALUES($1,$2,$3)',[e.id,lang,t.title??null]);
   for(const b of seed.blocks.filter(b=>b.event_id===e.id)){
    await c.query('INSERT INTO content_blocks(id,event_id,type,sort_order,media_id,status) VALUES($1,$2,$3,$4,$5,$6)',[b.id,e.id,b.type,b.sort_order,b.media_id,b.status]);
    for(const[lang,t]of Object.entries(b.translations))await c.query('INSERT INTO content_block_translations VALUES($1,$2,$3,$4,$5)',[b.id,lang,t.content??null,t.caption??null,t.alt??null]);
   }
   await c.query("INSERT INTO content_versions(entity_type,entity_id,action,snapshot) VALUES('event',$1,'legacy-import',$2)",[e.id,{...e,blocks:seed.blocks.filter(b=>b.event_id===e.id)}]);
  }
  for(const s of seed.site){
   const r=await c.query('INSERT INTO site_content VALUES($1,$2,$3) ON CONFLICT DO NOTHING RETURNING id',[s.id,s.content_key,s.status]);
   if(r.rowCount)await c.query("INSERT INTO content_versions(entity_type,entity_id,action,snapshot) VALUES('site',$1,'legacy-import',$2)",[s.id,{content_key:s.content_key,status:s.status,translations:s.translations}]);
   if(r.rowCount)for(const[lang,t]of Object.entries(s.translations))await c.query('INSERT INTO site_content_translations VALUES($1,$2,$3)',[s.id,lang,JSON.stringify(t.value)]);
  }
  if(!(await c.query("SELECT 1 FROM content_versions WHERE entity_type='legacy' AND entity_id='original-locales'" )).rowCount)await c.query("INSERT INTO content_versions(entity_type,entity_id,action,snapshot) VALUES('legacy','original-locales','source-archive',$1)",[seed.legacySources]);
  await seedPages(c);
  const counts={};for(const table of ['timeline_years','timeline_events','content_blocks','media_assets','site_content'])counts[table]=Number((await c.query('SELECT count(*) FROM '+table)).rows[0].count);
  return counts;
 });
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const {seed,report}=extract();if(report.duplicateIds.length)throw Error('Extraction integrity errors: review consistency report');
 const pool=createPool();try{await migrate(pool);console.log(await seedDatabase(pool,seed));}finally{await pool.end();}
}
