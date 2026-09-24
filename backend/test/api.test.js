import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import request from 'supertest';
import {createPool} from '../src/db.js';
import {migrate} from '../scripts/migrate.js';
import {extract} from '../scripts/extract.js';
import {seedDatabase} from '../scripts/seed.js';
import {createApp} from '../src/app.js';
import {OpenAIProvider} from '../src/ai.js';
const key='isolated-test-admin-key';
let pool,control,app,dbName;
const aiPayload={year:2025,event_date:null,slug:'ai-test-draft',titles:{en:{title:'Activity'},cn:{title:'活动'}},year_summaries:{en:{title:'2025',summary:'Activity'},cn:{title:'2025',summary:'活动'}},blocks:[{type:'text',image_url:null,translations:{en:{content:'10 books donated.',caption:null,alt:null},cn:{content:'捐赠10本书。',caption:null,alt:null}}}],warnings:['Missing date']};
before(async()=>{
 if(!process.env.DATABASE_URL)throw Error('Integration tests require DATABASE_URL to a local PostgreSQL with CREATE DATABASE permission. Run npm run db:local first.');
 control=createPool();dbName='greenleaves_test_'+randomUUID().replaceAll('-','');
 await control.query('CREATE DATABASE '+dbName);
 const url=new URL(process.env.DATABASE_URL);url.pathname='/'+dbName;pool=createPool(url.toString());
 await migrate(pool);await migrate(pool);await seedDatabase(pool,extract().seed);
 app=createApp({pool,adminKey:key,provider:new OpenAIProvider({apiKey:'',model:''})});
});
after(async()=>{if(pool)await pool.end();if(control){if(dbName)await control.query('DROP DATABASE IF EXISTS '+dbName);await control.end();}});
const admin=(method,path,body)=>request(app)[method]('/api/admin'+path).set('x-admin-api-key',key).send(body);
async function newEvent(slug='test-'+randomUUID()){
 const r=await admin('post','/events',{year_id:'year-2025',slug,translations:{en:{title:'English only'}}});assert.equal(r.status,201,JSON.stringify(r.body));return r.body.data;
}
async function addBlock(eventId,sort_order=0,content='English text'){
 const r=await admin('post','/events/'+eventId+'/blocks',{type:'text',sort_order,translations:{en:{content}}});assert.equal(r.status,201,JSON.stringify(r.body));return r.body.data.id;
}
test('health, API routes, languages and 404 behavior',async()=>{
 assert.equal((await request(app).get('/api/health')).status,200);
 for(const path of ['/api/v1/timeline/2099','/api/v1/events/unknown','/api/not-found'])assert.equal((await request(app).get(path)).status,404);
 assert.equal((await request(app).get('/api/v1/timeline?lang=xx')).status,400);
 const r=await request(app).get('/api/v1/timeline?lang=cn');assert.equal(r.status,200);assert.equal(r.body.data.length,10);assert.equal(r.body.data.flatMap(y=>y.events).length,42);
 assert.equal((await request(app).get('/api/v1/timeline/2016?lang=en')).body.data.year,2016);
});
test('admin authorization, validation and absent configuration',async()=>{
 assert.equal((await request(app).post('/api/admin/events').send({})).status,401);
 assert.equal((await request(app).post('/api/admin/events').set('x-admin-api-key','wrong').send({})).status,401);
 assert.equal((await admin('post','/events',{})).status,400);
 assert.equal((await admin('post','/events',{year_id:'year-2025',slug:'x',status:'published',translations:{en:{title:'x'}}})).status,400);
 assert.equal((await admin('post','/ai/drafts',{source_text:'Example source text'})).status,503);
 assert.equal((await request(createApp({pool,adminKey:''})).get('/api/admin/ai/suggestions')).status,503);
});
test('draft isolation, per-field English fallback, stable block order, archive, versions and restore-as-draft',async()=>{
 const e=await newEvent();const b1=await addBlock(e.id,0,'First'),b2=await addBlock(e.id,1,'Second');
 assert.equal((await request(app).get('/api/v1/events/'+e.slug)).status,404);
 assert.equal((await admin('post','/events/'+e.id+'/publish',{})).status,200);
 let r=await request(app).get('/api/v1/events/'+e.slug+'?lang=cn');assert.equal(r.status,200);
 assert.equal(r.body.data.title,'English only');assert.equal(r.body.data.translation.fallbackLanguage,'en');
 assert.deepEqual(r.body.data.detailBlocks.map(b=>b.id),[b1,b2]);
 assert.equal(r.body.data.detailBlocks[0].translation.fallbackLanguage,'en');
 const versions=(await admin('get','/events/'+e.id+'/versions')).body.data;
 const publishedVersion=versions.find(v=>v.action==='publish').id;
 assert.equal((await admin('post','/events/'+e.id+'/blocks/reorder',{block_ids:[b2,b1]})).status,200);
 assert.deepEqual((await request(app).get('/api/v1/events/'+e.slug)).body.data.detailBlocks.map(b=>b.id),[b1,b2]);
 assert.equal((await admin('post','/events/'+e.id+'/blocks/reorder',{block_ids:[b1,b1]})).status,400);
 assert.equal((await admin('post','/events/'+e.id+'/publish',{})).status,200);
 r=await request(app).get('/api/v1/events/'+e.slug);assert.deepEqual(r.body.data.detailBlocks.map(b=>b.id),[b2,b1]);
 assert.equal((await admin('post','/events/'+e.id+'/archive',{})).status,200);
 assert.equal((await request(app).get('/api/v1/events/'+e.slug)).status,404);
 r=await admin('post','/events/'+e.id+'/versions/'+publishedVersion+'/restore',{});assert.equal(r.status,200,JSON.stringify(r.body));
 assert.equal(r.body.data.status,'draft');assert.deepEqual(r.body.data.blocks.map(b=>b.id),[b1,b2]);
 assert.equal((await request(app).get('/api/v1/events/'+e.slug)).status,404);
});
test('editing a published event/block requires a separate new publish; duplicate order rolls back',async()=>{
 const e=await newEvent();const bid=await addBlock(e.id);
 await admin('post','/events/'+e.id+'/publish',{});
 assert.equal((await admin('put','/events/'+e.id+'/blocks/'+bid,{type:'text',sort_order:0,translations:{en:{content:'Updated'}}})).status,200);
 assert.equal((await request(app).get('/api/v1/events/'+e.slug)).status,200);
 assert.equal((await admin('post','/events/'+e.id+'/blocks',{type:'text',sort_order:0,translations:{en:{content:'Duplicate'}}})).status,409);
 assert.equal((await request(app).get('/api/v1/events/'+e.slug)).body.data.detailBlocks[0].content,'English text');
 const r=await admin('get','/events/'+e.id);assert.equal(r.body.data.blocks.length,1);
 assert.equal((await admin('post','/events/'+e.id+'/publish',{})).status,200);
 assert.equal((await admin('put','/events/'+e.id,{year_id:'year-2025',slug:e.slug,translations:{en:{title:'Edited'}}})).status,200);
 assert.equal((await request(app).get('/api/v1/events/'+e.slug)).status,200);
});
test('AI suggestions cannot publish, require review, can be accepted only once and rejection creates no event',async()=>{
 const aiApp=createApp({pool,adminKey:key,provider:{name:'fake',model:'test',configured:()=>true,generate:async()=>structuredClone(aiPayload)}});
 const generate=()=>request(aiApp).post('/api/admin/ai/drafts').set('x-admin-api-key',key).send({source_text:'2025 activity donated 10 books. Missing day.'});
 const result=await generate();assert.equal(result.status,201,JSON.stringify(result.body));
 assert.equal((await request(app).get('/api/v1/events/'+aiPayload.slug)).status,404);
 assert.equal((await admin('get','/ai/suggestions/'+result.body.suggestion_id)).body.data.status,'pending');
 assert.equal((await admin('post','/ai/suggestions/'+result.body.suggestion_id+'/accept',{})).status,422);
 const r=await admin('post','/ai/suggestions/'+result.body.suggestion_id+'/accept',{warnings_acknowledged:true});
 assert.equal(r.status,200,JSON.stringify(r.body));const eventId=r.body.data.event_id;
 assert.equal((await admin('get','/events/'+eventId)).body.data.status,'draft');
 assert.equal((await request(app).get('/api/v1/events/'+aiPayload.slug)).status,404);
 assert.equal((await admin('post','/ai/suggestions/'+result.body.suggestion_id+'/accept',{warnings_acknowledged:true})).status,409);
 await admin('post','/events/'+eventId+'/publish',{});
 assert.equal((await request(app).get('/api/v1/events/'+aiPayload.slug)).status,200);
 const second=await generate();
 const before=Number((await pool.query('SELECT count(*) FROM timeline_events')).rows[0].count);
 assert.equal((await admin('post','/ai/suggestions/'+second.body.suggestion_id+'/reject',{})).status,200);
 assert.equal(Number((await pool.query('SELECT count(*) FROM timeline_events')).rows[0].count),before);
});
test('provider failures are stored as failed jobs',async()=>{
 const broken=createApp({pool,adminKey:key,provider:{name:'fake',configured:()=>true,generate:async()=>{throw Error('private provider secret');}}});
 const r=await request(broken).post('/api/admin/ai/drafts').set('x-admin-api-key',key).send({source_text:'Source notes for activity'});
 assert.equal(r.status,502);assert.ok(!JSON.stringify(r.body).includes('secret'));
 const job=await admin('get','/ai/jobs/'+r.body.error.details.job_id);assert.equal(job.body.data.status,'failed');
});
test('site content fallback and isolation from archived/draft timeline and site entries',async()=>{
 const sid='test-site';
 assert.equal((await admin('put','/site-content/'+sid,{content_key:'test.message',status:'published',translations:{en:{value:'English site'}}})).status,200);
 let r=await request(app).get('/api/v1/site-content?lang=cn');
 assert.equal(r.body.resources.test.message,'English site');assert.ok(r.body.translation.fallbackKeys.includes('test.message'));
 assert.equal(r.body.resources['2019'],undefined);assert.equal(r.body.resources.timeline['2025'],undefined);
 await admin('put','/site-content/'+sid,{content_key:'test.message',status:'draft',translations:{en:{value:'private draft'}}});
 r=await request(app).get('/api/v1/site-content');assert.equal(r.body.resources.test.message,'English site');
 assert.equal((await admin('put','/site-content/bad',{content_key:'__proto__.x',translations:{en:{value:'x'}}})).status,400);
});
test('migration and seed repeat without duplicates or overwriting editorial changes',async()=>{
 const seed=extract().seed,id=seed.events[0].id;
 await admin('post','/events/'+id+'/archive',{});
 const before=await seedDatabase(pool,seed);
 await migrate(pool);const after=await seedDatabase(pool,seed);assert.deepEqual(before,after);
 assert.equal((await admin('get','/events/'+id)).body.data.status,'archived');
 assert.equal(Number((await pool.query("SELECT count(*) FROM content_versions WHERE entity_type='legacy'")).rows[0].count),1);
});

test('year and site versions restore as drafts; unpublished years hide their events',async()=>{
 const body={year:2090,status:'published',translations:{en:{title:'First year title',summary:'Summary'}}};
 assert.equal((await admin('put','/years/2090',body)).status,200);
 const versions=await admin('get','/versions?entity_type=year&entity_id=year-2090');
 assert.equal(versions.status,200);const original=versions.body.data[0].id;
 await admin('put','/years/2090',{...body,translations:{cn:{title:'Chinese title',summary:'Chinese summary'}}});
 const r=await admin('post','/versions/'+original+'/restore',{});
 assert.equal(r.status,200,JSON.stringify(r.body));assert.equal(r.body.data.status,'draft');
 assert.equal(r.body.data.translations.cn,undefined);
 assert.equal((await request(app).get('/api/v1/timeline/2090')).status,200);
 const s={content_key:'test.restore',status:'published',translations:{en:{value:'Original'}}};
 await admin('put','/site-content/site-restore',s);
 const sv=(await admin('get','/versions?entity_type=site&entity_id=site-restore')).body.data[0].id;
 await admin('put','/site-content/site-restore',{...s,translations:{en:{value:'Changed'},cn:{value:'Chinese'}}});
 const sr=await admin('post','/versions/'+sv+'/restore',{});
 assert.equal(sr.status,200);assert.equal(sr.body.data.status,'draft');assert.equal(sr.body.data.translations.cn,undefined);
 assert.equal((await request(app).get('/api/v1/site-content')).body.resources.test.restore,'Changed');
});


test('editor lists require authentication and include private drafts; media paging validates input',async()=>{
 for(const path of ['/events','/years','/media','/site-content'])assert.equal((await request(app).get('/api/admin'+path)).status,401);
 const e=await newEvent('list-private-'+randomUUID());
 const list=await admin('get','/events?status=draft&q='+e.slug);
 assert.equal(list.status,200);assert.equal(list.body.data[0].id,e.id);
 assert.ok((await admin('get','/years')).body.data.some(y=>y.id==='year-2025'));
 const m=await admin('get','/media?limit=2&offset=0');
 assert.equal(m.body.data.length,2);assert.ok(m.body.total>100);
 assert.equal((await admin('get','/media?limit=1000')).status,400);
 assert.ok((await admin('get','/site-content')).body.data.length>=59);
});
test('atomic editor saves draft with stable IDs, detects stale revisions and rolls back invalid media',async()=>{
 const body={expected_revision:null,event:{year_id:'year-2025',slug:'atomic-'+randomUUID(),translations:{en:{title:'Original'},cn:{title:'Chinese'}}},blocks:[
  {type:'text',sort_order:0,translations:{en:{content:'First'}}},
  {type:'subtitle',sort_order:1,translations:{en:{content:'Second'}}}
 ]};
 let r=await admin('post','/events/editor',body);assert.equal(r.status,201,JSON.stringify(r.body));
 const e=r.body.data;assert.equal(e.status,'draft');assert.ok(e.revision);
 assert.equal((await request(app).get('/api/v1/events/'+e.slug)).status,404);
 const b=e.blocks.map(({id,type,translations},i)=>({id,type,translations:Object.fromEntries(Object.entries(translations).map(([l,t])=>[l,{content:t.content}])),sort_order:1-i})).reverse();
 const edit={event:body.event,blocks:b,expected_revision:e.revision};
 r=await admin('put','/events/'+e.id+'/editor',edit);assert.equal(r.status,200,JSON.stringify(r.body));
 assert.deepEqual(r.body.data.blocks.map(b=>b.id),e.blocks.map(b=>b.id).reverse());
 assert.equal((await admin('put','/events/'+e.id+'/editor',edit)).status,409);
 const current=r.body.data;
 const bad={...edit,expected_revision:current.revision,blocks:[{type:'image',sort_order:0,media_id:'nonexistent-media',translations:{en:{caption:'Missing'}}}]};
 assert.equal((await admin('put','/events/'+e.id+'/editor',bad)).status,409);
 const unchanged=(await admin('get','/events/'+e.id)).body.data;
 assert.equal(unchanged.revision,current.revision);assert.deepEqual(unchanged.blocks.map(b=>b.id),current.blocks.map(b=>b.id));
 await admin('post','/events/'+e.id+'/publish',{});
 const published=(await admin('get','/events/'+e.id)).body.data;
 r=await admin('put','/events/'+e.id+'/editor',{...edit,expected_revision:published.revision,blocks:[{...b[0],sort_order:0}]});
 assert.equal(r.status,200);assert.equal(r.body.data.blocks.length,1);assert.equal(r.body.data.status,'draft');
 assert.equal((await request(app).get('/api/v1/events/'+e.slug)).body.data.detailBlocks.length,2);
});

test('reviewed revisions gate publish/archive/restore and old versions resolve image URLs',async()=>{
 const e=await newEvent();await addBlock(e.id);
 for(const action of ['publish','archive']){
  const r=await admin('post','/events/'+e.id+'/'+action,{expected_revision:e.revision});
  assert.equal(r.status,409);
 }
 const versions=(await admin('get','/events/'+e.id+'/versions')).body.data;
 assert.equal((await admin('post','/events/'+e.id+'/versions/'+versions[0].id+'/restore',{expected_revision:e.revision})).status,409);
 const current=(await admin('get','/events/'+e.id)).body.data;
 assert.equal((await admin('post','/events/'+e.id+'/publish',{expected_revision:current.revision})).status,200);
 const legacy=extract().seed.events[0].id;
 const historical=(await admin('get','/events/'+legacy+'/versions')).body.data;
 assert.ok(historical.some(v=>v.snapshot.blocks.some(b=>b.type==='image'&&b.src?.startsWith('/pictures/'))));
});

test('image upload authenticates, decodes bytes, persists metadata and serves after app restart',async()=>{
 const fs=await import('node:fs/promises'),path=await import('node:path'),os=await import('node:os');
 const sharp=(await import('sharp')).default;
 const directory=await fs.mkdtemp(path.join(os.tmpdir(),'greenleaves-upload-'));
 try{
  const uploadApp=createApp({pool,adminKey:key,uploadDir:directory});
  const bytes=await sharp({create:{width:12,height:8,channels:3,background:'#225533'}}).png().toBuffer();
  const send=(data,name='photo.png')=>request(uploadApp).post('/api/admin/media/upload').set('x-admin-api-key',key).attach('image',data,name);
  assert.equal((await request(uploadApp).post('/api/admin/media/upload').attach('image',bytes,'photo.png')).status,401);
  const r=await send(bytes);assert.equal(r.status,201,JSON.stringify(r.body));
  const media=r.body.data;assert.equal(media.metadata.width,12);assert.equal(media.metadata.height,8);assert.equal(media.metadata.original_name,'photo.png');
  assert.match(media.url,/^\/media\/uploads\/[a-f0-9-]+\.webp$/);
  const restarted=createApp({pool,adminKey:key,uploadDir:directory});
  const asset=await request(restarted).get(media.url);assert.equal(asset.status,200);assert.match(asset.headers['content-type'],/image\/webp/);assert.equal(asset.headers['cross-origin-resource-policy'],'cross-origin');
  const listing=await request(restarted).get('/api/admin/media?q=photo.png').set('x-admin-api-key',key);assert.ok(listing.body.data.some(x=>x.id===media.id));
  const before=await fs.readdir(directory);
  assert.equal((await send(Buffer.from('<svg></svg>'),'fake.png')).status,400);
  assert.equal((await send(Buffer.alloc(10*1024*1024+1),'large.png')).status,413);
  assert.equal((await request(uploadApp).post('/api/admin/media/upload').set('x-admin-api-key',key)).status,400);
  assert.deepEqual(await fs.readdir(directory),before);
  const broken=createApp({pool:{query:async()=>{throw Error('DB unavailable');}},adminKey:key,uploadDir:directory});
  assert.equal((await request(broken).post('/api/admin/media/upload').set('x-admin-api-key',key).attach('image',bytes,'photo.png')).status,500);
  assert.deepEqual(await fs.readdir(directory),before);
 }finally{for(const name of await fs.readdir(directory))await fs.unlink(path.join(directory,name));await fs.rmdir(directory);}
});

test('page image drafts preserve live images, publish applies order and stale changes are rejected',async()=>{
 const sections=(await admin('get','/pages')).body.data;assert.equal(sections.length,8);
 const s=sections.find(s=>s.id==='homeHero');const original=(await request(app).get('/api/v1/site-content')).body.resources.pageMedia.homeHero;
 const body={expected_revision:s.revision,status:'draft',images:[...s.images].reverse().map(i=>({id:i.id,media_id:i.media_id,translations:i.translations}))};
 let r=await admin('put','/pages/homeHero',body);assert.equal(r.status,200,JSON.stringify(r.body));
 assert.deepEqual((await request(app).get('/api/v1/site-content')).body.resources.pageMedia.homeHero,original);
 assert.equal((await admin('put','/pages/homeHero',body)).status,409);
 r=await admin('put','/pages/homeHero',{...body,expected_revision:r.body.data.revision,status:'published'});assert.equal(r.status,200);
 assert.deepEqual((await request(app).get('/api/v1/site-content')).body.resources.pageMedia.homeHero.map(i=>i.id),original.map(i=>i.id).reverse());
 assert.equal((await request(app).put('/api/admin/pages/homeHero').send(body)).status,401);
});
test('document import reads Word and UTF-8 text without creating events and rejects invalid files',async()=>{
 const {readFile}=await import('node:fs/promises');
 const bytes=await readFile(new URL('./fixtures/notes.docx',import.meta.url));
 const before=(await pool.query('SELECT count(*) FROM timeline_events')).rows[0].count;
 const send=(buffer,name)=>request(app).post('/api/admin/documents/extract').set('x-admin-api-key',key).attach('document',buffer,name);
 const doc=await send(bytes,'notes.docx');assert.equal(doc.status,200,JSON.stringify(doc.body));assert.ok(doc.body.text.includes('2025'));assert.ok(doc.body.text.includes('140'));assert.ok(doc.body.warnings.length);
 assert.equal((await send(Buffer.from('2025 activity notes'),'notes.txt')).body.text,'2025 activity notes');
 assert.equal((await send(Buffer.from('broken'),'notes.docx')).status,400);
 assert.equal((await send(Buffer.from('old Word'),'notes.doc')).status,400);
 assert.equal((await request(app).post('/api/admin/documents/extract').attach('document',bytes,'notes.docx')).status,401);
 assert.equal((await pool.query('SELECT count(*) FROM timeline_events')).rows[0].count,before);
});
test('assistant stores conversations, requires approval, accepts only drafts and rejects stale proposals',async()=>{
 const site='assistant-copy';await admin('put','/site-content/'+site,{content_key:'test.assistant',status:'published',translations:{en:{value:'140 books'},cn:{value:'140 books'}}});
 const assistantApp=createApp({pool,adminKey:key,provider:{name:'fixture',model:'fixture',configured:()=>true,generate:async()=>({reply:'Suggested revision only',cn:'140 books',en:'A total of 140 books',warnings:[],event_ids:[]})}});
 const send=body=>request(assistantApp).post('/api/admin/assistant/messages').set('x-admin-api-key',key).send(body);
 const r=await send({message:'Revise this copy',site_id:site});assert.equal(r.status,200,JSON.stringify(r.body));
 assert.ok(r.body.thread_id);assert.equal(r.body.proposal.status,'pending');
 assert.equal((await request(app).get('/api/v1/site-content')).body.resources.test.assistant,'140 books');
 assert.equal((await admin('post','/assistant/proposals/'+r.body.proposal.id+'/accept',{})).status,422);
 assert.equal((await admin('post','/assistant/proposals/'+r.body.proposal.id+'/accept',{warnings_acknowledged:true})).status,200);
 assert.equal((await request(app).get('/api/v1/site-content')).body.resources.test.assistant,'140 books');
 const current=(await admin('get','/site-content')).body.data.find(s=>s.id===site);assert.equal(current.status,'draft');assert.equal(current.translations.en.value,'A total of 140 books');
 assert.equal((await admin('post','/assistant/proposals/'+r.body.proposal.id+'/accept',{warnings_acknowledged:true})).status,409);
 const second=await send({thread_id:r.body.thread_id,message:'Revise again',site_id:site});
 await admin('put','/site-content/'+site,{content_key:'test.assistant',status:'draft',translations:{en:{value:'Other editor change'}}});
 assert.equal((await admin('post','/assistant/proposals/'+second.body.proposal.id+'/accept',{warnings_acknowledged:true})).status,409);
 assert.equal((await admin('get','/assistant/threads/'+r.body.thread_id)).body.messages.length,4);
 assert.equal((await request(app).post('/api/admin/assistant/messages').send({message:'hello'})).status,401);
 const disabled=createApp({pool,adminKey:key,provider:{configured:()=>false}});
 assert.equal((await request(disabled).post('/api/admin/assistant/messages').set('x-admin-api-key',key).send({message:'hello'})).status,503);
});
test('published slugs remain stable while changing a draft slug until republish',async()=>{
 const e=await newEvent();await addBlock(e.id);await admin('post','/events/'+e.id+'/publish',{});
 await admin('put','/events/'+e.id,{year_id:'year-2025',slug:e.slug+'-new',translations:{en:{title:'Changed title'}}});
 assert.equal((await request(app).get('/api/v1/events/'+e.slug)).body.data.title,'English only');
 assert.equal((await request(app).get('/api/v1/events/'+e.slug+'-new')).status,404);
 await admin('post','/events/'+e.id+'/publish',{});
 assert.equal((await request(app).get('/api/v1/events/'+e.slug)).status,404);
 assert.equal((await request(app).get('/api/v1/events/'+e.slug+'-new')).body.data.title,'Changed title');
});

test('public chatbot reads only releases, copies verified excerpts and never creates drafts',async()=>{
 let seen;
 const bot=createApp({pool,provider:{configured:()=>true,generate:async source=>{
  seen=JSON.parse(source);return {source_ids:[seen.sources[0].id,'invented-id']};
 }}});
 const draft=await newEvent('private-chat-test');await addBlock(draft.id,0,'SECRET_CHAT_DRAFT_8321');
 const before=(await pool.query('SELECT count(*) FROM timeline_events')).rows[0].count;
 const r=await request(bot).post('/api/v1/chat').send({message:'What is Little Green Leaves?',lang:'en'});
 assert.equal(r.status,200,JSON.stringify(r.body));
 assert.ok(r.body.sources.length);assert.ok(!JSON.stringify(seen).includes('SECRET_CHAT_DRAFT_8321'));
 assert.equal(r.body.sources[0].text,seen.sources[0].text);
 assert.ok(r.body.sources.every(s=>s.url.startsWith('/')&&!s.url.startsWith('//')));
 assert.equal((await pool.query('SELECT count(*) FROM timeline_events')).rows[0].count,before);
 assert.equal((await request(bot).post('/api/v1/chat').send({message:'x',lang:'xx'})).status,400);
 assert.equal((await request(app).post('/api/v1/chat').send({message:'hello'})).status,503);
});
test('public chatbot refuses unsupported answers, limits calls and resists forwarding spoofing',async()=>{
 const bot=createApp({pool,provider:{configured:()=>true,generate:async()=>({source_ids:['not-a-source']})}});
 for(let i=0;i<6;i++){
  const r=await request(bot).post('/api/v1/chat').set('X-Forwarded-For','1.2.3.'+i).send({message:'Write unrelated code',lang:'cn'});
  assert.equal(r.status,200);assert.deepEqual(r.body.sources,[]);
 }
 assert.equal((await request(bot).post('/api/v1/chat').set('X-Forwarded-For','9.8.7.6').send({message:'hello'})).status,429);
 await pool.query("INSERT INTO public_chat_usage VALUES((now() AT TIME ZONE 'UTC')::date,50) ON CONFLICT(usage_day) DO UPDATE SET calls=50");
 const fresh=createApp({pool,provider:{configured:()=>true,generate:async()=>{throw Error('Must not call provider');}}});
 assert.equal((await request(fresh).post('/api/v1/chat').send({message:'hello'})).status,429);
 await pool.query('DELETE FROM public_chat_usage');
});
