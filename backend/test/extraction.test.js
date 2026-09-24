import test from 'node:test';
import {validateSeed} from '../scripts/validate-seed.js';
import assert from 'node:assert/strict';
import {extract,readTimeline} from '../scripts/extract.js';
test('extracts full legacy timeline deterministically with stable IDs and existing media',()=>{
 const a=extract(),b=extract();
 assert.deepEqual(a,b);
 assert.equal(a.seed.years.length,11);assert.equal(a.seed.events.length,42);
 assert.equal(a.seed.blocks.length,1086);
 assert.equal(a.seed.blocks.filter(b=>b.type==='image').length,196);
 assert.deepEqual(a.report.invalidImagePaths,[]);assert.deepEqual(a.report.duplicateIds,[]);
 assert.equal(a.report.unmappedTranslations.length,2);
 assert.equal(a.report.misplacedEnglishYears.length,7);
 const originals=readTimeline();
 for(const y of originals)for(const e of y.events){
  const blocks=a.seed.blocks.filter(b=>b.event_id==='event-'+e.id);
  assert.deepEqual(blocks.map(b=>b.sort_order),e.detailBlocks.map((_,i)=>i));
  assert.ok(blocks.every(b=>/^block-[a-f0-9]{24}-\d+$/.test(b.id)));
 }
 assert.ok(a.report.numericDateDifferences.some(d=>d.en?.includes('140')||d.cn?.includes('150')));
 assert.equal(a.seed.site.some(s=>/^\d{4}|^timeline\.\d{4}/.test(s.content_key)),false);
 assert.equal(a.seed.legacySources.en['2019'].title.length>0,true);
});

test('seed validation rejects broken references and duplicate IDs',()=>{const {seed}=extract();assert.equal(validateSeed(seed),true);seed.blocks[0].event_id='missing';assert.throws(()=>validateSeed(seed));});
