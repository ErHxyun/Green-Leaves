import React,{useState,useEffect} from 'react';
import {Field,Preview,Status} from './AdminPage';
import {MediaLibrary} from './Panels';
import {mediaUrl} from '../services/adminApi';
const clone=x=>JSON.parse(JSON.stringify(x));
export function editorPayload(event){
 const eventTranslations={};
 for(const lang of ['en','cn'])if(event.translations?.[lang]?.title?.trim())eventTranslations[lang]={title:event.translations[lang].title};
 return {expected_revision:event.revision??null,event:{year_id:event.year_id,slug:event.slug,event_date:event.event_date||null,sort_order:Number(event.sort_order),translations:eventTranslations},
  blocks:event.blocks.map((b,i)=>({...(b.id?{id:b.id}:{}),type:b.type,sort_order:i,media_id:b.type==='image'?b.media_id:null,
   translations:Object.fromEntries(['en','cn'].map(lang=>[lang,Object.fromEntries((b.type==='image'?['caption','alt']:['content']).map(f=>[f,b.translations?.[lang]?.[f]??'']))]))
  }))};
}
export default function EventEditor({api,event,years,run,onSaved,dirty,setDirty,back}){
 const [draft,setDraft]=useState(()=>clone(event)),[view,setView]=useState('edit'),[mediaBlock,setMediaBlock]=useState(null),[versions,setVersions]=useState([]),[version,setVersion]=useState(null);
 useEffect(()=>{setDraft(clone(event));setVersions([]);setVersion(null);},[event]);
 const update=patch=>{setDraft(d=>({...d,...patch}));setDirty(true);};
 const changeBlock=(index,patch)=>update({blocks:draft.blocks.map((b,i)=>i===index?{...b,...patch}:b)});
 const changeTranslation=(index,lang,field,value)=>{const b=draft.blocks[index];changeBlock(index,{translations:{...b.translations,[lang]:{...b.translations?.[lang],[field]:value}}});};
 const move=(index,direction)=>{const blocks=[...draft.blocks];[blocks[index],blocks[index+direction]]=[blocks[index+direction],blocks[index]];update({blocks});};
 async function save(e){
  e.preventDefault();
  await run(async()=>{const r=await api.request(event.id?'/events/'+event.id+'/editor':'/events/editor',{method:event.id?'PUT':'POST',body:editorPayload(draft)});await onSaved(r.data);},'已保存为草稿，尚未公开发布。');
 }
 async function transition(action){
  if(!window.confirm(action==='publish'?'确认已审核中英文内容、图片和敏感信息，并公开发布此活动？':'确认归档此活动？归档后公开 API 将不再返回此活动。'))return;
  await run(async()=>{const r=await api.request('/events/'+event.id+'/'+action,{method:'POST',body:{expected_revision:event.revision}});await onSaved(r.data);},action==='publish'?'活动已发布。':'活动已归档。');
 }
 const preview=d=>({...d,blocks:(d.blocks||[]).map(b=>({...b,src:mediaUrl(b.src)}))});
 return <div>
  <div className='admin-toolbar'><button onClick={back}>← 活动列表</button><Status value={event.status} live={event.has_published_version}/><span className='admin-muted'>{event.id?'编辑已有活动':'新活动'}</span></div>
  <p className='admin-note'>保存只生成草稿。编辑已发布活动时，官网继续显示上一次发布的版本；再次点击「发布活动」才会替换。{dirty?' 请先保存，再发布、归档或恢复版本。':''}</p>
  <div className='admin-tabs' role='tablist' aria-label='编辑与预览'>{[['edit','编辑'],['cn','中文预览'],['en','English preview'],['versions','历史版本']].map(([v,label])=><button key={v} type='button' role='tab' aria-selected={view===v} disabled={v==='versions'&&!event.id} onClick={()=>{setView(v);if(v==='versions')run(async()=>setVersions((await api.request('/events/'+event.id+'/versions')).data));}}>{label}</button>)}</div>
  {view==='edit'&&<form onSubmit={save} className='admin-editor-form'>
   <section className='admin-card'><h2>活动信息</h2><div className='admin-columns'>
    <Field label='所属年份'><select required value={draft.year_id} onChange={e=>update({year_id:e.target.value})}><option value=''>请选择年份</option>{years.map(y=><option key={y.id} value={y.id}>{y.year} · {y.has_published_version||y.status==='published'?'已发布':'未发布'}</option>)}</select></Field>
    <Field label='Slug（唯一链接名称）' required pattern='[a-zA-Z0-9_-]+' maxLength={180} value={draft.slug} onChange={e=>update({slug:e.target.value})}/>
    <Field label='活动日期（未知可留空）' value={draft.event_date||''} maxLength={100} onChange={e=>update({event_date:e.target.value})}/>
    <Field label='活动排序' type='number' min='0' step='1' required value={draft.sort_order} onChange={e=>update({sort_order:e.target.value})}/>
    {['cn','en'].map(lang=><Field key={lang} label={lang==='cn'?'中文标题':'English title（必填）'} required={lang==='en'} maxLength={1000} value={draft.translations?.[lang]?.title||''} onChange={e=>update({translations:{...draft.translations,[lang]:{title:e.target.value}}})}/>)}
   </div></section>
   <section className='admin-card'><div className='admin-toolbar'><h2>内容块</h2><span className='admin-muted'>{draft.blocks.length} 块</span></div>
    {draft.blocks.map((b,index)=><div key={b.id||b.localKey||index} className='admin-block'>
     <div className='admin-toolbar'><strong>{index+1}. {{text:'正文',subtitle:'小标题',image:'图片'}[b.type]}</strong><span className='admin-spacer'/><button type='button' aria-label={'上移内容块 '+(index+1)} disabled={index===0} onClick={()=>move(index,-1)}>↑ 上移</button><button type='button' aria-label={'下移内容块 '+(index+1)} disabled={index===draft.blocks.length-1} onClick={()=>move(index,1)}>↓ 下移</button><button type='button' className='admin-danger' onClick={()=>{if(window.confirm('从草稿中移除此内容块？保存后生效，历史版本仍会保留。'))update({blocks:draft.blocks.filter((_,i)=>i!==index)});}}>移除</button></div>
     {b.type==='image'&&<div className='admin-image-choice'>{b.src&&<img src={mediaUrl(b.src)} alt={b.translations?.cn?.alt||b.translations?.en?.alt||''}/>}<button type='button' onClick={()=>setMediaBlock(index)}>选择图片 {index+1}</button><small>{b.src||'未选择图片'}</small></div>}
     <div className='admin-columns'>{['cn','en'].map(lang=><div key={lang}>
      {(b.type==='image'?['caption','alt']:['content']).map(field=><Field key={field} label={(lang==='cn'?'中文':'English')+' '+({content:b.type==='subtitle'?'小标题':'正文',caption:'图片说明',alt:'替代文字'}[field])}><textarea rows={b.type==='text'?5:2} value={b.translations?.[lang]?.[field]??''} onChange={e=>changeTranslation(index,lang,field,e.target.value)}/></Field>)}
     </div>)}</div>
    </div>)}
    <div className='admin-toolbar'>{['subtitle','text','image'].map(type=><button key={type} type='button' onClick={()=>update({blocks:[...draft.blocks,{localKey:window.crypto.randomUUID(),type,media_id:null,src:'',translations:{en:{},cn:{}}}]})}>＋ 添加{{subtitle:'小标题',text:'正文',image:'图片'}[type]}</button>)}</div>
   </section>
   <div className='admin-actions'><button className='admin-primary' type='submit' disabled={!dirty}>保存草稿</button><span>保存不会自动发布</span></div>
  </form>}
  {(view==='cn'||view==='en')&&<Preview event={preview(draft)} language={view}/>}
  {view==='versions'&&<section className='admin-card'><h2>历史版本</h2><p className='admin-muted'>恢复会生成新的草稿版本，不会直接公开。</p>
   <Field label='选择历史版本'><select value={version?.id||''} onChange={e=>setVersion(versions.find(v=>v.id===e.target.value)||null)}><option value=''>请选择</option>{versions.map(v=><option key={v.id} value={v.id}>#{v.id} · {new Date(v.created_at).toLocaleString()} · {v.action}</option>)}</select></Field>
   {version&&<><div className='admin-columns'><Preview event={preview(version.snapshot)} language='cn'/><Preview event={preview(version.snapshot)} language='en'/></div><button disabled={dirty} onClick={()=>{if(window.confirm('将此历史版本恢复为草稿？当前已保存内容仍可在历史版本中找到。'))run(async()=>{const r=await api.request('/events/'+event.id+'/versions/'+version.id+'/restore',{method:'POST',body:{expected_revision:event.revision}});await onSaved(r.data);setView('edit');},'历史版本已恢复为草稿。');}}>恢复为草稿</button></>}
  </section>}
  {event.id&&<div className='admin-actions'><button type='button' className='admin-primary' disabled={dirty||event.status==='published'} onClick={()=>transition('publish')}>发布活动</button><button type='button' disabled={dirty||event.status==='archived'} onClick={()=>transition('archive')}>归档活动</button><button type='button' onClick={()=>{if(!dirty||window.confirm('放弃未保存的修改，重新读取服务器中的版本？'))run(async()=>onSaved((await api.request('/events/'+event.id)).data),'已重新读取服务器内容。');}}>重新读取</button></div>}
  {mediaBlock!==null&&<div className='admin-overlay' role='dialog' aria-modal='true' aria-label='选择活动图片'><section className='admin-modal'><button type='button' onClick={()=>setMediaBlock(null)}>关闭图片选择</button><MediaLibrary api={api} run={run} onSelect={m=>{changeBlock(mediaBlock,{media_id:m.id,src:m.url});setMediaBlock(null);}}/></section></div>}
 </div>;
}
