import test from 'node:test';
import assert from 'node:assert/strict';
import {extract,readTimeline} from '../scripts/extract.js';
import {localize} from '../src/content.js';
test('all effective English/Chinese legacy titles and blocks are preserved without factual rewrites',()=>{
 const {seed}=extract(),locales=seed.legacySources;
 for(const language of ['en','cn']){
  for(const y of readTimeline()){
   const yr=seed.years.find(r=>r.year===y.year);
   const expected=(key,original)=>{
    const path=key.split('.');const at=o=>path.reduce((v,k)=>v?.[k],o);
    return at(locales[language])??at(locales.en)??original??'';
   };
   const yd=localize(yr.translations,language,['title','summary']);
   for(const f of ['title','summary'])assert.equal(yd[f],expected('timeline.'+y.year+'.'+f,y[f]));
   for(const e of y.events){
    const event=seed.events.find(r=>r.slug===e.id),key='timeline.'+y.year+'.events.'+e.id;
    assert.equal(localize(event.translations,language,['title']).title,expected(key+'.title',e.title));
    const blocks=seed.blocks.filter(b=>b.event_id===event.id);
    for(const[i,b]of e.detailBlocks.entries()){
     const field=b.type==='image'?'caption':'content';
     assert.equal(localize(blocks[i].translations,language,[field])[field],expected(key+'.blocks.'+i+'.'+field,b[field]),language+' '+key+' '+i);
    }
   }
  }
 }
});
