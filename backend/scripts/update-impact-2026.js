import {createPool,transaction} from '../src/db.js';
import {version} from '../src/content.js';
const values={'impact.childrenValue':'200','impact.regionsValue':'5','impact.fundsValue':'￥1,000,000+'};
const pool=createPool();
try{await transaction(pool,async c=>{
 for(const [key,value]of Object.entries(values)){
  const {rows:[site]}=await c.query('SELECT * FROM site_content WHERE content_key=$1 FOR UPDATE',[key]);
  if(!site)throw Error('Missing site key: '+key);
  const before=(await c.query('SELECT lang,value FROM site_content_translations WHERE site_content_id=$1',[site.id])).rows;
  if(['cn','en'].every(lang=>before.some(t=>t.lang===lang&&t.value===value)))continue;
  for(const lang of ['cn','en'])await c.query('INSERT INTO site_content_translations VALUES($1,$2,$3) ON CONFLICT(site_content_id,lang) DO UPDATE SET value=EXCLUDED.value',[site.id,lang,JSON.stringify(value)]);
  const translations=Object.fromEntries((await c.query('SELECT lang,value FROM site_content_translations WHERE site_content_id=$1',[site.id])).rows.map(({lang,...t})=>[lang,t]));
  await version(c,'site',site.id,'update-impact-values',{...site,translations});
  const released=(await c.query("SELECT snapshot FROM published_content WHERE entity_type='site' AND entity_id=$1",[site.id])).rows[0];
  if(released&&site.status!=='published'){
   const snapshot=released.snapshot;for(const lang of ['cn','en'])snapshot.translations[lang]={value};
   await version(c,'site',site.id,'update-published-impact-values',snapshot);
  }
 }
});console.log('Impact values updated: 200 / 5 / RMB 1,000,000+.');}finally{await pool.end();}
