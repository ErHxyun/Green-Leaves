import request from 'supertest';
import assert from 'node:assert/strict';
import {createApp} from '../src/app.js';
import {createPool} from '../src/db.js';
const pool=createPool();
try{
 const app=createApp({pool});
 for(const [lang,message] of [['cn','小绿叶是什么组织？'],['en','How can I contact Little Green Leaves?'],['cn','帮我编写一个股票交易程序']]){
  const r=await request(app).post('/api/v1/chat').send({message,lang});
  assert.equal(r.status,200,JSON.stringify(r.body));
  if(message.includes('股票'))assert.equal(r.body.sources.length,0);
  else assert.ok(r.body.sources.length,'Expected relevant website excerpts');
  console.log(JSON.stringify({lang,message,...r.body}));
 }
}finally{await pool.end();}
