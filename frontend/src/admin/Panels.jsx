import DocumentImport from './DocumentImport';
import React,{useEffect,useState} from 'react';
import {Field,Preview,Status} from './AdminPage';
import {mediaUrl} from '../services/adminApi';

export {default as MediaLibrary} from './MediaLibrary';
export {default as SiteManager} from './SiteManager';
const blankYear=()=>({year:new Date().getFullYear(),sort_order:0,icon:'Leaf',status:'draft',translations:{en:{title:'',summary:''},cn:{title:'',summary:''}}});
export function YearManager({api,years,run,refresh,setDirty,discard}){
 const [selected,setSelected]=useState(''),[data,setData]=useState(blankYear);
 const change=patch=>{setData(d=>({...d,...patch}));setDirty(true);};
 async function save(status){
  if(status==='published'&&!window.confirm('确认发布此年份及其已发布活动？'))return;
  const translations=Object.fromEntries(Object.entries(data.translations).filter(([,t])=>t.title?.trim()).map(([l,t])=>[l,{title:t.title,summary:t.summary||''}]));
  await run(async()=>{
   const r=await api.request('/years/'+data.year,{method:'PUT',body:{year:Number(data.year),sort_order:Number(data.sort_order),icon:data.icon,status,translations}});
   setData(r.data);setSelected(r.data.id);setDirty(false);await refresh();
  },status==='published'?'年份已发布。':'年份已保存为草稿。');
 }
 return <form onSubmit={e=>{e.preventDefault();save('draft');}} className='admin-card'>
  <div className='admin-toolbar'><Field label='选择年份'><select value={selected} onChange={e=>{if(!discard())return;setSelected(e.target.value);setData(e.target.value?JSON.parse(JSON.stringify(years.find(y=>y.id===e.target.value))):blankYear());setDirty(false);}}><option value=''>新建年份</option>{years.map(y=><option key={y.id} value={y.id}>{y.year}</option>)}</select></Field><Status value={data.status}/></div>
  <p className='admin-note'>保存年份草稿不会改变官网已有版本。发布年份不会自动发布其中的草稿活动。</p>
  <div className='admin-columns'><Field label='年份' type='number' min='1900' max='2200' required disabled={Boolean(selected)} value={data.year} onChange={e=>change({year:e.target.value})}/><Field label='年份排序' type='number' min='0' required value={data.sort_order} onChange={e=>change({sort_order:e.target.value})}/><Field label='年份图标'><select value={data.icon} onChange={e=>change({icon:e.target.value})}>{['Leaf','Users','HandCoins','Droplets','HeartHandshake'].map(i=><option key={i}>{i}</option>)}</select></Field></div>
  <div className='admin-columns'>{['cn','en'].map(lang=><div key={lang}>
   <Field label={lang==='cn'?'中文年份标题':'English year title'} required={lang==='en'} value={data.translations?.[lang]?.title||''} onChange={e=>change({translations:{...data.translations,[lang]:{...data.translations?.[lang],title:e.target.value}}})}/>
   <Field label={lang==='cn'?'中文年份摘要':'English year summary'}><textarea rows={6} value={data.translations?.[lang]?.summary||''} onChange={e=>change({translations:{...data.translations,[lang]:{...data.translations?.[lang],summary:e.target.value}}})}/></Field>
  </div>)}</div>
  <div className='admin-actions'><button type='submit'>保存年份草稿</button><button type='button' className='admin-primary' onClick={e=>{if(e.currentTarget.form.reportValidity())save('published');}}>发布年份</button></div>
 </form>;
}
export function AIReview({api,run,openEvent,refresh,setDirty,initialSource=''}){
 const [source,setSource]=useState(initialSource),[items,setItems]=useState([]),[selected,setSelected]=useState(null),[ack,setAck]=useState(false),[error,setError]=useState('');
 const load=async()=>setItems((await api.request('/ai/suggestions')).data);
 useEffect(()=>{let live=true;api.request('/ai/suggestions').then(r=>{if(live)setItems(r.data);}).catch(e=>{if(live)setError(e.message);});return()=>{live=false;};},[api]);
 async function select(id){await run(async()=>{setSelected((await api.request('/ai/suggestions/'+id)).data);setAck(false);});}
 async function generate(e){e.preventDefault();await run(async()=>{
  const r=await api.request('/ai/drafts',{method:'POST',body:{source_text:source}});
  setSelected((await api.request('/ai/suggestions/'+r.suggestion_id)).data);setAck(false);setDirty(false);await load();
 },'建议已生成，请逐项对照来源审核。尚未创建活动。');}
 async function review(action){
  if(action==='reject'&&!window.confirm('确认拒绝这条建议？原始记录仍会保留。'))return;
  await run(async()=>{
   const r=await api.request('/ai/suggestions/'+selected.id+'/'+action,{method:'POST',body:action==='accept'?{warnings_acknowledged:ack}:{}});
   setSelected(s=>({...s,...r.data}));await load();await refresh();
  },action==='accept'?'已接受建议并创建草稿。请进入活动编辑检查后，再单独发布。':'建议已拒绝，未创建活动。');
 }
 const preview=selected?{translations:selected.payload.titles,event_date:selected.payload.event_date,blocks:selected.payload.blocks.map((b,i)=>({...b,id:String(i),src:mediaUrl(b.image_url)}))}:null;
 return <div>
  <p className='admin-note'>AI 仅生成待审核建议。接受建议创建草稿，公开发布必须在活动编辑页单独操作。</p>
  <DocumentImport api={api} run={run} onText={text=>{setSource(text);setDirty(true);}}/>
  <form className='admin-card' onSubmit={generate}><h2>整理活动资料</h2><Field label='公众号文章、Word 提取文本或活动笔记'><textarea rows={8} minLength={10} maxLength={100000} required value={source} onChange={e=>{setSource(e.target.value);setDirty(Boolean(e.target.value));}} placeholder='粘贴原始资料，保留原始数字、日期和图片地址。'/></Field><button className='admin-primary' type='submit'>生成待审核建议</button></form>
  {error&&<p role='alert' className='admin-error'>{error}</p>}
  <section className='admin-card'><div className='admin-toolbar'><h2>建议记录</h2><button onClick={()=>run(load)}>刷新建议</button></div><div className='admin-event-list'>{items.map(s=><button key={s.id} className='admin-event-row' onClick={()=>select(s.id)}><span>{new Date(s.created_at).toLocaleString()}<small>{s.warnings.length} 条审核提醒</small></span><Status value={s.status}/></button>)}</div>{!items.length&&<p className='admin-muted'>暂无建议。</p>}</section>
  {selected&&<section className='admin-card'><div className='admin-toolbar'><h2>审核建议</h2><Status value={selected.status}/></div>
   <details open><summary>原始资料</summary><pre className='admin-source'>{selected.source_text}</pre></details>
   <h3>需要核对</h3><ul className='admin-warnings'>{selected.warnings.map((w,i)=><li key={i}>{w}</li>)}</ul>
   <p>年份：{selected.payload.year??'未知'} · 日期：{selected.payload.event_date||'未知'} · Slug：{selected.payload.slug}</p>
   <details><summary>建议的年份摘要（已有年份不会自动覆盖）</summary><div className='admin-columns'>{['cn','en'].map(l=><div key={l}><h4>{selected.payload.year_summaries[l].title}</h4><p>{selected.payload.year_summaries[l].summary}</p></div>)}</div></details>
   <div className='admin-columns'><Preview event={preview} language='cn'/><Preview event={preview} language='en'/></div>
   {selected.status==='pending'?<><label className='admin-check'><input type='checkbox' checked={ack} onChange={e=>setAck(e.target.checked)}/>我已对照来源核对数字、日期、姓名、地点和儿童等敏感信息，并审核全部提醒。</label><div className='admin-actions'><button className='admin-primary' disabled={!ack} onClick={()=>review('accept')}>接受为草稿</button><button onClick={()=>review('reject')}>拒绝建议</button></div></>:selected.event_id&&<button className='admin-primary' onClick={()=>openEvent(selected.event_id)}>打开草稿活动</button>}
  </section>}
 </div>;
}
