import PageImages from './PageImages';
import Assistant from './Assistant';
import React,{useState,useMemo,useEffect,useRef} from 'react';
import {createAdminApi} from '../services/adminApi';
import EventEditor from './EventEditor';
import {YearManager,MediaLibrary,SiteManager,AIReview} from './Panels';
import './admin.css';

export const statusLabel={draft:'草稿',published:'已发布',archived:'已归档',pending:'待审核',accepted:'已接受',rejected:'已拒绝'};
export function Status({value,live=false}){return <span className={'admin-badge '+value}>{value==='draft'&&live?'有未发布修改':statusLabel[value]||value}</span>;}
export function Field({label,children,...props}){return <label className='admin-field'><span>{label}</span>{children||<input {...props}/>}</label>;}
export function Preview({event,language='cn'}){
 const translated=(ts,field)=>ts?.[language]?.[field]||ts?.en?.[field]||'';
 return <article className='admin-preview' lang={language==='cn'?'zh-CN':'en'}>
  <h3>{translated(event.translations,'title')||'未填写标题'}</h3>
  {event.event_date&&<p className='admin-muted'>{event.event_date}</p>}
  {(event.blocks||[]).map((b,i)=>{
   const field=b.type==='image'?'caption':'content';
   const fallback=language==='cn'&&!b.translations?.cn?.[field]&&b.translations?.en?.[field];
   return <section key={b.id||i}>
    {fallback&&<small className='admin-muted'>英文回退</small>}
    {b.type==='subtitle'?<h4>{translated(b.translations,'content')}</h4>:b.type==='text'?<p>{translated(b.translations,'content')}</p>:<figure>
     {b.src&&<img src={b.src} alt={translated(b.translations,'alt')} loading='lazy' referrerPolicy='no-referrer'/>}
     {!b.src&&<p className='admin-muted'>尚未选择图片</p>}
     <figcaption>{translated(b.translations,'caption')}</figcaption>
    </figure>}
   </section>;
  })}
 </article>;
}
export default function AdminPage(){
 const [key,setKey]=useState(''),[input,setInput]=useState(''),[loginError,setLoginError]=useState(''),[checking,setChecking]=useState(false);
 const api=useMemo(()=>key?createAdminApi(key,()=>{setKey('');setLoginError('密钥无效或已失效，请重新登录。');}):null,[key]);
 useEffect(()=>()=>api?.dispose(),[api]);
 async function login(e){
  e.preventDefault();setChecking(true);setLoginError('');
  const candidate=createAdminApi(input.trim());
  try{await candidate.request('/years');setKey(input.trim());setInput('');}
  catch(e){setLoginError(e.status===401?'管理员密钥不正确。':e.message);}
  finally{candidate.dispose();setChecking(false);}
 }
 if(!api)return <main className='admin-root admin-login'>
  <form className='admin-login-card' onSubmit={login}>
   <div className='admin-brand'>小绿叶 · 内容工作台</div>
   <h1>管理后台</h1><p className='admin-muted'>编辑活动、管理内容，审核每一份 AI 建议。</p>
   <Field label='管理员密钥' type='password' value={input} onChange={e=>setInput(e.target.value)} required autoComplete='off'/>
   {loginError&&<p role='alert' className='admin-error'>{loginError}</p>}
   <button className='admin-primary' disabled={checking||!input.trim()}>{checking?'正在验证…':'进入工作台'}</button>
   <p className='admin-muted'>使用服务器配置的 ADMIN_API_KEY。密钥不会保存在本地存储中；刷新页面后需要重新输入。</p>
   <a href='/'>返回官网</a>
  </form>
 </main>;
 return <Workspace api={api} logout={()=>setKey('')}/>;
}
function Workspace({api,logout}){
 const [aiSource,setAiSource]=useState('');
 const [tab,setTab]=useState('events'),[years,setYears]=useState([]),[events,setEvents]=useState([]),[selected,setSelected]=useState(null);
 const [search,setSearch]=useState(''),[filter,setFilter]=useState('all'),[dirty,setDirty]=useState(false);
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[notice,setNotice]=useState('');
 const running=useRef(false);
 async function run(fn,message){
  if(running.current)return null;
  running.current=true;setBusy(true);setError('');setNotice('');
  try{const result=await fn();if(message)setNotice(message);return result;}
  catch(e){setError(e.message);return null;}
  finally{running.current=false;setBusy(false);}
 }
 async function refresh(){const [y,e]=await Promise.all([api.request('/years'),api.request('/events')]);setYears(y.data);setEvents(e.data);}
 useEffect(()=>{let live=true;Promise.all([api.request('/years'),api.request('/events')]).then(([y,e])=>{if(live){setYears(y.data);setEvents(e.data);}}).catch(e=>{if(live)setError(e.message);});return()=>{live=false;};},[api]);
 useEffect(()=>{const warn=e=>{if(dirty){e.preventDefault();e.returnValue='';}};window.addEventListener('beforeunload',warn);return()=>window.removeEventListener('beforeunload',warn);},[dirty]);
 const discard=()=>!dirty||window.confirm('有尚未保存的修改。确定放弃这些修改？');
 const changeTab=value=>{if(discard()){setDirty(false);setSelected(null);setTab(value);setError('');setNotice('');}};
 const openEvent=id=>{if(discard())run(async()=>{const r=await api.request('/events/'+encodeURIComponent(id));setSelected(r.data);setDirty(false);setTab('events');});};
 const saved=async event=>{setSelected(event);setDirty(false);await refresh();};
 const list=events.filter(e=>(filter==='all'||e.status===filter)&&[e.slug,e.translations?.en?.title,e.translations?.cn?.title].join(' ').toLowerCase().includes(search.toLowerCase()));
 return <div className='admin-root admin-layout'>
  <aside className='admin-sidebar'>
   <div className='admin-brand'>小绿叶<br/><strong>内容工作台</strong></div>
   <nav aria-label='后台导航'>{[['events','活动内容'],['years','年份管理'],['media','图片资料'],['site','页面文案'],['pages','页面图片'],['assistant','AI 小助手'],['ai','活动草稿助手']].map(([id,label])=><button key={id} aria-current={tab===id?'page':undefined} disabled={busy} onClick={()=>changeTab(id)}>{label}</button>)}</nav>
   <a href='/' target='_blank' rel='noreferrer'>打开官网 ↗</a>
   <button disabled={busy} onClick={()=>{if(discard())logout();}}>退出登录</button>
  </aside>
  <main className='admin-main'>
   <header className='admin-header'><div><small>Little Green Leaves</small><h1>{{events:'活动内容',years:'年份管理',media:'图片资料',site:'页面文案',pages:'页面图片',assistant:'AI 小助手',ai:'活动草稿助手'}[tab]}</h1></div><span className='admin-muted'>{busy?'正在处理…':dirty?'有未保存的修改':'内容管理'}</span></header>
   {error&&<div className='admin-error' role='alert'>{error}</div>}
   {notice&&<div className='admin-success' role='status'>{notice}</div>}
   <fieldset disabled={busy} className='admin-fieldset'>
    {tab==='events'&&(selected?<EventEditor api={api} event={selected} years={years} run={run} onSaved={saved} dirty={dirty} setDirty={setDirty} back={()=>{if(discard()){setSelected(null);setDirty(false);}}}/>:<>
     <div className='admin-toolbar'><Field label='搜索活动' value={search} onChange={e=>setSearch(e.target.value)} placeholder='标题或 slug'/><Field label='状态'><select value={filter} onChange={e=>setFilter(e.target.value)}><option value='all'>全部状态</option>{['draft','published','archived'].map(v=><option key={v} value={v}>{statusLabel[v]}</option>)}</select></Field><button className='admin-primary' onClick={()=>{setSelected({id:null,year_id:years[0]?.id||'',slug:'',event_date:null,sort_order:0,status:'draft',translations:{en:{title:''},cn:{title:''}},blocks:[],revision:null});setDirty(true);}}>新建活动</button><button onClick={()=>run(refresh,'列表已刷新')}>刷新</button></div>
     <p className='admin-note'>{years.length} 个年份 · {events.length} 个活动。正文和图片在活动内编辑；页面文案管理标题与介绍，页面图片管理轮播、照片和二维码。</p>
     <p className='admin-muted'>{list.length} 个活动 · 草稿不会出现在官网</p>
     <div className='admin-event-list'>{list.map(e=><button className='admin-event-row' key={e.id} onClick={()=>openEvent(e.id)}><span><strong>{e.translations?.cn?.title||e.translations?.en?.title||e.slug}</strong><small>{e.year} · {e.slug}</small></span><Status value={e.status} live={e.has_published_version}/></button>)}</div>
     {!list.length&&<p className='admin-empty'>没有符合条件的活动。</p>}
    </>)}
    {tab==='years'&&<YearManager api={api} years={years} run={run} refresh={refresh} setDirty={setDirty} discard={discard}/>}
    {tab==='media'&&<MediaLibrary api={api} run={run}/>}
    {tab==='site'&&<SiteManager api={api} run={run} setDirty={setDirty} discard={discard}/>}
    {tab==='pages'&&<PageImages api={api} run={run} setDirty={setDirty} discard={discard}/>}
    {tab==='assistant'&&<Assistant api={api} run={run} discard={discard} openEvent={openEvent} setDirty={setDirty} createDraft={text=>{setAiSource(text);setDirty(false);setTab('ai');}}/>}
    {tab==='ai'&&<AIReview initialSource={aiSource} api={api} run={run} openEvent={openEvent} refresh={refresh} setDirty={setDirty}/>}
   </fieldset>
  </main>
 </div>;
}
