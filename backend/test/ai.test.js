import test from 'node:test';
import assert from 'node:assert/strict';
import {OpenAIProvider,reviewDraft} from '../src/ai.js';
export const payload={year:2025,event_date:null,slug:'test-ai',titles:{en:{title:'Book activity'},cn:{title:'图书活动'}},year_summaries:{en:{title:'2025',summary:'Book activity'},cn:{title:'2025',summary:'图书活动'}},blocks:[{type:'text',image_url:null,translations:{en:{content:'Donated 10 books.',caption:null,alt:null},cn:{content:'捐赠10本书。',caption:null,alt:null}}}],warnings:[]};
test('OpenAI sends Responses API strict JSON schema, supports base URL, never uses publishing tools',async()=>{
 let url,request;
 const provider=new OpenAIProvider({apiKey:'test-only',model:'test-model',baseURL:'https://example.invalid/v1/',fetchImpl:async(u,r)=>{url=u;request=JSON.parse(r.body);return {ok:true,json:async()=>({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify(payload)}]}]})};}});
 const result=await provider.generate('2025 donated 10 books for children.');
 assert.equal(url,'https://example.invalid/v1/responses');assert.equal(request.text.format.type,'json_schema');assert.equal(request.text.format.strict,true);
 assert.equal(request.store,false);assert.equal(request.tools,undefined);assert.ok(result.warnings.length);
});
test('unconfigured, incomplete, refused and malformed provider responses fail explicitly',async()=>{
 await assert.rejects(()=>new OpenAIProvider({apiKey:'',model:''}).generate('source'),{status:503});
 for(const result of [{status:'incomplete'}, {status:'completed',output:[{content:[{type:'refusal'}]}]}, {status:'completed',output:[{content:[{type:'output_text',text:'{}'}]}]}]){
  const p=new OpenAIProvider({apiKey:'test',model:'test',fetchImpl:async()=>({ok:true,json:async()=>result})});
  await assert.rejects(()=>p.generate('source'));
 }
});
test('privacy and unsupported numeric facts are flagged without rewriting facts',()=>{
 const p=reviewDraft(payload,'Students in Class 3; child name Li; contact test@example.org; 2025.');
 assert.ok(p.warnings.some(w=>w.includes('contact')));
 assert.ok(p.warnings.some(w=>w.includes('child')));
 assert.ok(p.warnings.some(w=>w.includes('10')));
 assert.equal(p.blocks[0].translations.en.content,payload.blocks[0].translations.en.content);
});

test('OpenRouter uses strict schema routing and validates output',async()=>{
 const {OpenRouterProvider}=await import('../src/ai.js');
 let sent;
 const p=new OpenRouterProvider({apiKey:'test',fetchImpl:async(url,options)=>{
  assert.equal(url,'https://openrouter.ai/api/v1/chat/completions');sent=JSON.parse(options.body);
  return {ok:true,json:async()=>({choices:[{finish_reason:'stop',message:{content:JSON.stringify(payload)}}]})};
 }});
 const result=await p.generate('2025 donated 10 books');
 assert.equal(sent.model,'deepseek/deepseek-v3.2');
 assert.equal(sent.provider.require_parameters,true);assert.equal(sent.provider.data_collection,'deny');
 assert.equal(sent.response_format.json_schema.strict,true);assert.equal(sent.reasoning.enabled,false);
 assert.equal(sent.tools,undefined);assert.equal(result.blocks[0].translations.en.content,payload.blocks[0].translations.en.content);
});
test('OpenRouter rejects missing keys, quota errors, truncation, invalid schema and upstream errors',async()=>{
 const {OpenRouterProvider,createAIProvider}=await import('../src/ai.js');
 await assert.rejects(()=>new OpenRouterProvider({apiKey:''}).generate('source'),{status:503});
 assert.equal(createAIProvider('openrouter').name,'openrouter');assert.equal(createAIProvider('openai').name,'openai');
 assert.throws(()=>createAIProvider('unknown'));
 for(const status of [401,402,429,404,500]){
  const p=new OpenRouterProvider({apiKey:'test',fetchImpl:async()=>({ok:false,status,json:async()=>({secret:'never expose'})})});
  await assert.rejects(()=>p.generate('source'),e=>!e.message.includes('secret')&&e.status>=500);
 }
 for(const value of [{error:{message:'private upstream detail'}},{choices:[{finish_reason:'length',message:{content:JSON.stringify(payload)}}]},{choices:[{finish_reason:'stop',message:{content:'{}'}}]},{choices:[{finish_reason:'stop',message:{content:'not json'}}]}]){
  const p=new OpenRouterProvider({apiKey:'test',fetchImpl:async()=>({ok:true,json:async()=>value})});
  await assert.rejects(()=>p.generate('source'),{status:502});
 }
});
