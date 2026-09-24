import assert from 'node:assert/strict';
import fs from 'node:fs';
import {randomUUID} from 'node:crypto';
import request from 'supertest';
import {createPool} from '../src/db.js';
import {createApp} from '../src/app.js';
import {migrate} from './migrate.js';
const control=createPool(),name='greenleaves_assistant_live_'+randomUUID().replaceAll('-',''),key=randomUUID();let pool,created=false;
const report={status:'running',checks:[]};
try{
 await control.query('CREATE DATABASE '+name);created=true;
 const url=new URL(process.env.DATABASE_URL);url.pathname='/'+name;pool=createPool(url.toString());await migrate(pool);
 const app=createApp({pool,adminKey:key}),admin=(method,path,body)=>request(app)[method]('/api/admin'+path).set('x-admin-api-key',key).send(body);
 const original={en:{value:'We sorted 140 books at the community center.'},cn:{value:'We sorted 140 books at the community center.'}};
 assert.equal((await admin('put','/site-content/live-example',{content_key:'test.liveAssistant',status:'published',translations:original})).status,200);
 const result=await admin('post','/assistant/messages',{message:'This is synthetic test content, not a real charity report. Please improve the wording of the selected English copy, keeping 140 books and the community center unchanged. Leave the cn value exactly as supplied. Propose the edit; do not claim it was applied.',site_id:'live-example'});
 assert.equal(result.status,200,JSON.stringify(result.body));assert.ok(result.body.proposal);
 report.reply=result.body.reply;report.proposal=result.body.proposal;
 assert.ok(result.body.proposal.after_snapshot.translations.en.value.includes('140'));
 assert.equal(result.body.proposal.after_snapshot.translations.cn.value,original.cn.value);
 assert.equal((await admin('post','/assistant/proposals/'+result.body.proposal.id+'/accept',{warnings_acknowledged:true})).status,200);
 assert.equal((await request(app).get('/api/v1/site-content')).body.resources.test.liveAssistant,original.en.value);
 assert.equal((await pool.query("SELECT status FROM site_content WHERE id='live-example'")).rows[0].status,'draft');
 report.checks.push('Real model conversation returns schema-valid before/after proposal','Acceptance creates draft and preserves live copy','Chinese source and literal number preserved');
 report.status='passed';console.log(JSON.stringify({status:report.status,checks:report.checks}));
}catch(e){report.status='failed';report.error=e.message;console.error(e.message);process.exitCode=1;}
finally{if(pool)await pool.end();if(created)await control.query('DROP DATABASE '+name);await control.end();fs.mkdirSync('backend/generated',{recursive:true});fs.writeFileSync('backend/generated/assistant-live-report.json',JSON.stringify(report,null,2));}
