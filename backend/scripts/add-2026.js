// Adds the requested year without overwriting existing editorial content.
import {createPool, transaction} from '../src/db.js';
import {putYear,version} from '../src/content.js';
import {yearInput} from '../src/validation.js';
const pool=createPool();
try {
 await transaction(pool,async c=>{
  await c.query('SELECT pg_advisory_xact_lock(738402)');
  if (!(await c.query('SELECT 1 FROM timeline_years WHERE year=2026')).rowCount) {
   await putYear(c,yearInput.parse({year:2026,sort_order:10,status:'published',translations:{cn:{title:'十年筑梦新起点',summary:''},en:{title:'A New Starting Point After Ten Years of Building Dreams',summary:''}}}));
  }
  const rows=(await c.query("SELECT s.id,s.content_key,s.status,t.lang,t.value FROM site_content s JOIN site_content_translations t ON t.site_content_id=s.id WHERE s.content_key='timeline.heading'")).rows;
  for (const row of rows) {
   const updated=row.value.replace(/2016\s*[–-]\s*2025/g,'2016–2026');
   if (updated!==row.value) await c.query('UPDATE site_content_translations SET value=$3 WHERE site_content_id=$1 AND lang=$2',[row.id,row.lang,JSON.stringify(updated)]);
  }
  for(const id of new Set(rows.map(r=>r.id))) {
   const row=rows.find(r=>r.id===id);
   const translations=Object.fromEntries((await c.query('SELECT lang,value FROM site_content_translations WHERE site_content_id=$1',[id])).rows.map(({lang,...t})=>[lang,t]));
   if(rows.some(r=>r.id===id&&/2016\s*[–-]\s*2025/.test(r.value))) await version(c,'site',id,'update-timeline-range',{content_key:row.content_key,status:row.status,translations});
  }
 });
 console.log('2026 year and timeline heading ready. No articles created or published.');
} finally {await pool.end();}
