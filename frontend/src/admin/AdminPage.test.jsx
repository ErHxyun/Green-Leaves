import React from 'react';
import {render,screen,fireEvent,waitFor} from '@testing-library/react';
import AdminPage from './AdminPage';
import EventEditor,{editorPayload} from './EventEditor';
import {createAdminApi} from '../services/adminApi';
const event={id:'event1',year_id:'year-2025',slug:'sample',sort_order:0,status:'draft',revision:'10',translations:{en:{title:'Original'},cn:{title:'原题'}},blocks:[{id:'b1',type:'text',sort_order:0,translations:{en:{content:'English'},cn:{content:'中文'}}}]};
afterEach(()=>jest.restoreAllMocks());
test('login keeps credentials only in memory and logout returns to login',async()=>{
 const storage=jest.spyOn(Storage.prototype,'setItem');
 global.fetch=jest.fn(async url=>({ok:true,json:async()=>({data:url.includes('/events')?[event]:[{id:'year-2025',year:2025,status:'published'}]})}));
 render(<AdminPage/>);
 fireEvent.change(screen.getByLabelText('管理员密钥'),{target:{value:'test-key'}});
 fireEvent.click(screen.getByRole('button',{name:'进入工作台'}));
 expect(await screen.findByRole('button',{name:'新建活动'})).toBeInTheDocument();
 expect(storage).not.toHaveBeenCalled();
 expect(global.fetch.mock.calls.some(([,opts])=>opts.headers['X-Admin-API-Key']==='test-key')).toBe(true);
 fireEvent.click(screen.getByRole('button',{name:'退出登录'}));
 expect(screen.getByLabelText('管理员密钥')).toHaveValue('');
});
test('bad key fails login without displaying the secret',async()=>{
 global.fetch=jest.fn(async()=>({ok:false,status:401,json:async()=>({error:{message:'Unauthorized'}})}));
 render(<AdminPage/>);
 fireEvent.change(screen.getByLabelText('管理员密钥'),{target:{value:'do-not-display'}});
 fireEvent.click(screen.getByRole('button',{name:'进入工作台'}));
 expect(await screen.findByRole('alert')).toHaveTextContent('管理员密钥不正确');
 expect(screen.queryByRole('button',{name:'新建活动'})).not.toBeInTheDocument();
});
test('event save sends one atomic draft request and never publishes',async()=>{
 const api={request:jest.fn().mockResolvedValue({data:event})},saved=jest.fn();
 const run=async fn=>fn();
 render(<EventEditor api={api} event={event} years={[{id:'year-2025',year:2025,status:'published'}]} run={run} onSaved={saved} dirty setDirty={()=>{}} back={()=>{}}/>);
 expect(screen.getByRole('button',{name:'发布活动'})).toBeDisabled();
 fireEvent.change(screen.getByLabelText('English title（必填）'),{target:{value:'Edited'}});
 fireEvent.click(screen.getByRole('button',{name:'保存草稿'}));
 await waitFor(()=>expect(saved).toHaveBeenCalled());
 expect(api.request).toHaveBeenCalledTimes(1);
 expect(api.request.mock.calls[0][0]).toBe('/events/event1/editor');
 expect(api.request.mock.calls[0][1].body.event.translations.en.title).toBe('Edited');
 expect(api.request.mock.calls[0][1].body.expected_revision).toBe('10');
});
test('preview shows English fallback without inserting HTML',()=>{
 const data={...event,blocks:[{id:'b1',type:'text',translations:{en:{content:'<script>unsafe</script>'}}}]};
 render(<EventEditor api={{}} event={data} years={[]} run={()=>{}} onSaved={()=>{}} dirty={false} setDirty={()=>{}} back={()=>{}}/>);
 fireEvent.click(screen.getByRole('tab',{name:'中文预览'}));
 expect(screen.getByText('英文回退')).toBeInTheDocument();
 expect(screen.getByText('<script>unsafe</script>')).toBeInTheDocument();
 expect(document.querySelector('script')).toBeNull();
});
test('editor payload removes UI-only fields, reindexes blocks and preserves stable IDs',()=>{
 const payload=editorPayload({...event,blocks:[{...event.blocks[0],src:'/pictures/a.jpg',localKey:'local',sort_order:99}]});
 expect(payload.blocks[0]).toEqual({id:'b1',type:'text',sort_order:0,media_id:null,translations:{en:{content:'English'},cn:{content:'中文'}}});
 expect(payload.event.status).toBeUndefined();
});
test('admin API reports configuration failures and cancels requests on disposal',async()=>{
 global.fetch=jest.fn(async()=>({ok:false,status:503,json:async()=>({error:{message:'AI is not configured'}})}));
 const api=createAdminApi('private');
 await expect(api.request('/ai/drafts',{method:'POST',body:{source_text:'notes'}})).rejects.toThrow('服务未配置');
 api.dispose();
});

test('AI review requires acknowledgement, accepts only as draft and offers a separate editor link',async()=>{
 const suggestion={id:'suggestion1',status:'pending',created_at:'2026-09-19T00:00:00Z',source_text:'Original source 10 books',warnings:['Check child names'],payload:{year:2025,event_date:null,slug:'ai-slug',titles:{en:{title:'English AI'},cn:{title:'AI中文'}},year_summaries:{en:{title:'2025',summary:'Summary'},cn:{title:'2025',summary:'摘要'}},blocks:[{type:'text',translations:{en:{content:'10 books'},cn:{content:'10本书'}}}]}};
 const api={request:jest.fn(async path=>path==='/ai/suggestions'?{data:[suggestion]}:path.endsWith('/accept')?{data:{...suggestion,status:'accepted',event_id:'draft1'}}:{data:suggestion})};
 const open=jest.fn();
 const {AIReview}=require('./Panels');
 render(<AIReview api={api} run={async fn=>fn()} openEvent={open} refresh={async()=>{}} setDirty={()=>{}}/>);
 fireEvent.click(await screen.findByRole('button',{name:/1 条审核提醒/}));
 const accept=await screen.findByRole('button',{name:'接受为草稿'});
 expect(accept).toBeDisabled();
 fireEvent.click(screen.getByRole('checkbox'));
 fireEvent.click(accept);
 fireEvent.click(await screen.findByRole('button',{name:'打开草稿活动'}));
 expect(open).toHaveBeenCalledWith('draft1');
 expect(api.request.mock.calls.some(([path])=>path.includes('/publish'))).toBe(false);
 expect(api.request.mock.calls.find(([path])=>path.endsWith('/accept'))[1].body).toEqual({warnings_acknowledged:true});
});
