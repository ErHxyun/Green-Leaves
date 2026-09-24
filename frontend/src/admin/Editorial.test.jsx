import React from 'react';
import {render,screen,fireEvent,waitFor} from '@testing-library/react';
import SiteManager from './SiteManager';
import MediaLibrary from './MediaLibrary';
import {createAdminApi} from '../services/adminApi';
import {describeSiteKey} from './siteLabels';
afterEach(()=>jest.restoreAllMocks());
test('site copy uses page names and content search; edits retain stable key',async()=>{
 const item={id:'hero',content_key:'hero.title',status:'published',translations:{cn:{value:'一起帮助孩子'},en:{value:'Help children'}}};
 const api={request:jest.fn().mockResolvedValue({data:[item]})};
 render(<SiteManager api={api} run={fn=>fn()} setDirty={()=>{}} discard={()=>true}/>);
 fireEvent.click(await screen.findByRole('button',{name:/首屏主标题/}));
 expect(screen.queryByText('hero.title')).not.toBeInTheDocument();
 fireEvent.change(screen.getByLabelText('中文文案'),{target:{value:'新标题'}});
 api.request.mockResolvedValue({data:{...item,status:'draft'}});
 fireEvent.click(screen.getByRole('button',{name:'保存文案草稿'}));
 await waitFor(()=>expect(api.request).toHaveBeenCalledWith('/site-content/hero',expect.objectContaining({body:expect.objectContaining({content_key:'hero.title',status:'draft'})})));
 fireEvent.change(screen.getByLabelText('搜索官网文字'),{target:{value:'不存在的内容'}});
 expect(screen.getByText(/没有找到相关文字/)).toBeInTheDocument();
 expect(describeSiteKey('contact.cards.wechat.title')).toEqual({group:'联系我们',label:'微信卡片 · 标题'});
});
test('image picker uploads FormData and selects new media without publishing',async()=>{
 URL.createObjectURL=jest.fn(()=> 'blob:preview');URL.revokeObjectURL=jest.fn();
 const media={id:'uploaded',url:'/media/uploads/test.webp',metadata:{original_name:'photo.png'}};
 const api={request:jest.fn(async(path)=>path==='/media/upload'?{data:media}:{data:[],total:0})},select=jest.fn();
 render(<MediaLibrary api={api} run={fn=>fn()} onSelect={select}/>);
 fireEvent.change(screen.getByLabelText('选择要上传的图片'),{target:{files:[new File(['image'],'photo.png',{type:'image/png'})]}});
 fireEvent.click(screen.getByRole('button',{name:'上传并使用这张图片'}));
 await waitFor(()=>expect(select).toHaveBeenCalledWith(media));
 const call=api.request.mock.calls.find(([p])=>p==='/media/upload');expect(call[1].body).toBeInstanceOf(FormData);
 expect(call[1].body.get('image').name).toBe('photo.png');
 expect(api.request.mock.calls.some(([p])=>p.includes('publish'))).toBe(false);
});
test('multipart requests keep authentication and browser-generated content type',async()=>{
 global.fetch=jest.fn(async()=>({ok:true,json:async()=>({data:{}})}));
 const body=new FormData();body.append('image',new File(['image'],'photo.png'));
 await createAdminApi('test-key').request('/media/upload',{method:'POST',body});
 expect(global.fetch.mock.calls[0][1].body).toBe(body);
 expect(global.fetch.mock.calls[0][1].headers).toEqual({'X-Admin-API-Key':'test-key'});
});

test('page image changes save as drafts with revision and never publish implicitly',async()=>{
 const {default:PageImages}=require('./PageImages');
 const section={id:'homeHero',label:'首页 · 背景轮播',revision:2,status:'published',images:[{id:'image1',media_id:'m1',src:'/image.webp',translations:{cn:{alt:'原说明',caption:''},en:{alt:'Original',caption:''}}}]};
 const api={request:jest.fn(async(path,options)=>options?{data:{...section,status:'draft',revision:3}}:{data:[section]})};
 render(<PageImages api={api} run={fn=>fn()} setDirty={()=>{}} discard={()=>true}/>);
 await screen.findByRole('option',{name:'首页 · 背景轮播'});
 fireEvent.change(screen.getByLabelText('选择图片所在位置'),{target:{value:'homeHero'}});
 fireEvent.change(screen.getByLabelText('中文图片替代文字'),{target:{value:'新说明'}});
 fireEvent.click(screen.getByRole('button',{name:'保存图片草稿'}));
 await waitFor(()=>expect(api.request).toHaveBeenCalledWith('/pages/homeHero',expect.objectContaining({body:expect.objectContaining({status:'draft',expected_revision:2})})));
});
test('Word import exposes extracted text for review without calling AI',async()=>{
 const {default:DocumentImport}=require('./DocumentImport');
 const onText=jest.fn(),api={request:jest.fn().mockResolvedValue({text:'140 books',warnings:['Review source']})};
 render(<DocumentImport api={api} run={fn=>fn()} onText={onText}/>);
 fireEvent.change(screen.getByLabelText('选择资料文件'),{target:{files:[new File(['word'],'notes.docx')]}});
 await waitFor(()=>expect(onText).toHaveBeenCalledWith('140 books'));
 expect(api.request.mock.calls[0][0]).toBe('/documents/extract');expect(api.request).toHaveBeenCalledTimes(1);
});
test('assistant presents before-after comparison and requires acknowledgement before accepting draft',async()=>{
 const {default:Assistant}=require('./Assistant');
 const proposal={id:'p1',status:'pending',before_snapshot:{translations:{cn:{value:'原文'},en:{value:'Original'}}},after_snapshot:{translations:{cn:{value:'建议'},en:{value:'Suggested'}}},warnings:['Check facts']};
 const api={request:jest.fn(async(path)=>path==='/assistant/messages'?{thread_id:'t1',reply:'请审核建议',events:[],proposal}:path.endsWith('/accept')?{data:{...proposal,status:'accepted'}}:{data:[]})};
 render(<Assistant api={api} run={fn=>fn()} setDirty={()=>{}} discard={()=>true} createDraft={()=>{}} openEvent={()=>{}}/>);
 fireEvent.change(screen.getByLabelText('发送给助手'),{target:{value:'润色文案'}});
 fireEvent.click(screen.getByRole('button',{name:'发送'}));
 const accept=await screen.findByRole('button',{name:'接受文案修改为草稿'});expect(accept).toBeDisabled();
 expect(screen.getByText('Original')).toBeInTheDocument();expect(screen.getByText('Suggested')).toBeInTheDocument();
 fireEvent.click(screen.getByRole('checkbox'));fireEvent.click(accept);
 await waitFor(()=>expect(api.request).toHaveBeenCalledWith('/assistant/proposals/p1/accept',expect.objectContaining({body:{warnings_acknowledged:true}})));
 expect(api.request.mock.calls.some(([path])=>path.includes('/publish'))).toBe(false);
});
