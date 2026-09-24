import fs from 'node:fs';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import request from 'supertest';
import {createPool} from '../src/db.js';
import {createApp} from '../src/app.js';
import {createAIProvider} from '../src/ai.js';
import {migrate} from './migrate.js';
const source='Synthetic integration test, not a real charity activity. On 2025-06-15, 12 volunteers sorted 140 books at a community center. A second note says nearly 150 books; the discrepancy is unresolved. No photos or personal information were supplied.';
const provider=createAIProvider();
if(!provider.configured())throw Error('Configure the selected AI provider key and model locally first.');
const control=createPool(),name='greenleaves_live_ai_'+randomUUID().replaceAll('-','');
let pool,created=false;
const report={provider:provider.name,model:provider.model,source,checks:[],status:'running'};
try{
 await control.query('CREATE DATABASE '+name);created=true;
 const url=new URL(process.env.DATABASE_URL);url.pathname='/'+name;pool=createPool(url.toString());await migrate(pool);
 const key=randomUUID(),app=createApp({pool,adminKey:key,provider});
 const admin=(method,path,body)=>request(app)[method]('/api/admin'+path).set('x-admin-api-key',key).send(body);
 const generated=await admin('post','/ai/drafts',{source_text:source});
 assert.equal(generated.status,201,JSON.stringify(generated.body));assert.equal(generated.body.status,'pending');
 const suggestion=(await admin('get','/ai/suggestions/'+generated.body.suggestion_id)).body.data;
 report.payload=suggestion.payload;
 assert.equal(suggestion.status,'pending');assert.equal(suggestion.payload.year,2025);assert.equal(suggestion.payload.event_date,'2025-06-15');
 assert.ok(suggestion.payload.titles.en.title);assert.ok(suggestion.payload.titles.cn.title);
 const prose=JSON.stringify(suggestion.payload.blocks);for(const n of ['12','140','150'])assert.ok(prose.includes(n),'Missing source number '+n);
 assert.ok(suggestion.warnings.length>0);
 assert.equal((await pool.query('SELECT count(*)::int AS n FROM timeline_events')).rows[0].n,0);
 assert.equal((await pool.query('SELECT status FROM ai_jobs WHERE id=$1',[generated.body.job_id])).rows[0].status,'completed');
 report.checks.push('Real provider structured output, bilingual titles, date and source numbers, stored pending suggestion; no event created');
 assert.equal((await admin('post','/ai/suggestions/'+suggestion.id+'/accept',{})).status,422);
 const accepted=await admin('post','/ai/suggestions/'+suggestion.id+'/accept',{warnings_acknowledged:true});
 assert.equal(accepted.status,200,JSON.stringify(accepted.body));
 const event=(await pool.query('SELECT status,slug FROM timeline_events WHERE id=$1',[accepted.body.data.event_id])).rows[0];
 assert.equal(event.status,'draft');
 assert.equal((await request(app).get('/api/v1/events/'+event.slug+'?lang=cn')).status,404);
 assert.equal((await request(app).get('/api/v1/timeline?lang=en')).body.data.length,0);
 report.checks.push('Acknowledgement required; acceptance creates draft only; public event 404 and timeline empty');
 report.status='passed';console.log(JSON.stringify({status:report.status,model:report.model,checks:report.checks}));
}catch(e){report.status='failed';report.error=e.message;console.error(e.message);process.exitCode=1;}
finally{
 if(pool)await pool.end();if(created)await control.query('DROP DATABASE '+name);await control.end();
 fs.mkdirSync('backend/generated',{recursive:true});fs.writeFileSync('backend/generated/live-ai-report.json',JSON.stringify(report,null,2)+'\n');
}
