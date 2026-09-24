import {describeSiteKey} from './siteLabels';
import React,{useEffect,useState} from 'react';
import {Field,Status} from './AdminPage';
import DocumentImport from './DocumentImport';
export default function Assistant({api,run,openEvent,createDraft,setDirty,discard}){
 const [threads,setThreads]=useState([]),[thread,setThread]=useState(null),[messages,setMessages]=useState([]),[message,setMessage]=useState(''),[source,setSource]=useState(''),[sites,setSites]=useState([]),[site,setSite]=useState(''),[proposals,setProposals]=useState([]),[events,setEvents]=useState([]),[ack,setAck]=useState({}),[error,setError]=useState('');
 useEffect(()=>{let live=true;Promise.all([api.request('/assistant/threads'),api.request('/site-content')]).then(([a,b])=>{if(live){setThreads(a.data);setSites(b.data);}}).catch(e=>{if(live)setError(e.message);});return()=>{live=false;};},[api]);
 async function send(e){e.preventDefault();await run(async()=>{
  const r=await api.request('/assistant/messages',{method:'POST',body:{...(thread?{thread_id:thread}:{}),message,site_id:site||null,source_text:source}});
  setThread(r.thread_id);setMessages(m=>[...m,{role:'user',content:message},{role:'assistant',content:r.reply}]);setMessage('');setDirty(false);setEvents(r.events);if(r.proposal)setProposals(p=>[r.proposal,...p]);setThreads((await api.request('/assistant/threads')).data);
 });}
 async function review(p,action){await run(async()=>{const r=await api.request('/assistant/proposals/'+p.id+'/'+action,{method:'POST',body:{warnings_acknowledged:!!ack[p.id]}});setProposals(list=>list.map(i=>i.id===p.id?r.data:i));},action==='accept'?'已保存为文案草稿，官网原版本保持不变。请到页面文案审核发布。':'已拒绝修改建议。');}
 return <div>
 <p className='admin-note'>小绿叶编辑助手可以查找活动、解释后台操作、润色选中的页面文案。修改会先展示对照，接受后仅保存草稿。</p>
 {error&&<p role='alert'>{error}</p>}
 <section className='admin-card'><div className='admin-toolbar'><h2>与编辑助手对话</h2><button type='button' onClick={()=>{if(!discard())return;setThread(null);setMessages([]);setProposals([]);setEvents([]);setSource('');setMessage('');setSite('');setDirty(false);}}>新对话</button></div>
 <Field label='历史对话'><select value={thread||''} onChange={e=>{const id=e.target.value;if(!id||!discard())return;run(async()=>{const r=await api.request('/assistant/threads/'+id);setThread(id);setMessages(r.messages);setProposals(r.proposals);setEvents([]);setSource('');setMessage('');setSite('');setDirty(false);});}}><option value=''>当前对话</option>{threads.map(t=><option key={t.id} value={t.id}>{(t.title||'新对话').slice(0,50)}</option>)}</select></Field>
 <Field label='要修改的页面文案（查询和咨询可不选）'><select value={site} onChange={e=>setSite(e.target.value)}><option value=''>不修改文案，仅查询或咨询</option>{sites.map(s=><option key={s.id} value={s.id}>{describeSiteKey(s.content_key).group+' · '+describeSiteKey(s.content_key).label+' — '+(s.translations?.cn?.value||s.translations?.en?.value||'空文案').slice(0,45)}</option>)}</select></Field>
 <div className='admin-chat' aria-live='polite'>{!messages.length&&<p className='admin-muted'>可以试试：“帮我找到 2023 年的活动”或“怎样替换联系我们的二维码？”</p>}{messages.map((m,i)=><div key={i} className={'admin-chat-message '+m.role}><strong>{m.role==='user'?'你':'小绿叶助手'}</strong><p>{m.content}</p></div>)}</div>
 <form onSubmit={send}><Field label='发送给助手'><textarea rows={3} required maxLength={6000} value={message} onChange={e=>{setMessage(e.target.value);setDirty(!!e.target.value);}} placeholder='例如：保留所有数字，帮我润色选中的英文文案。'/></Field><button className='admin-primary' type='submit'>发送</button></form>
 {events.length>0&&<div className='admin-event-list'>{events.map(e=><button key={e.id} type='button' className='admin-event-row' onClick={()=>openEvent(e.id)}>{e.year} · {e.titles.cn||e.titles.en}<span>打开活动 →</span></button>)}</div>}
 </section>
 <section className='admin-card'><DocumentImport api={api} run={run} onText={text=>{setSource(text);setDirty(true);}}/><Field label='供助手参考的资料'><textarea rows={5} maxLength={100000} value={source} onChange={e=>{setSource(e.target.value);setDirty(!!e.target.value);}}/></Field><button type='button' disabled={source.trim().length<10} onClick={()=>createDraft(source)}>整理为活动草稿 →</button><p className='admin-muted'>进入活动草稿助手后，可再次核对资料，再点击生成。</p></section>
 {proposals.map(p=><section className='admin-card' key={p.id}><h2>文案修改对照</h2><Status value={p.status}/>{['cn','en'].map(lang=><div key={lang}><h3>{lang==='cn'?'中文':'英文'}</h3><div className='admin-columns'><div><strong>修改前</strong><pre className='admin-source'>{p.before_snapshot.translations?.[lang]?.value||''}</pre></div><div><strong>建议修改</strong><pre className='admin-source'>{p.after_snapshot.translations?.[lang]?.value||''}</pre></div></div></div>)}
 <ul className='admin-warnings'>{p.warnings.map((w,i)=><li key={i}>{w}</li>)}</ul>{p.status==='pending'&&<><label className='admin-check'><input type='checkbox' checked={!!ack[p.id]} onChange={e=>setAck(a=>({...a,[p.id]:e.target.checked}))}/>我已核对前后内容和全部提醒</label><div className='admin-actions'><button type='button' className='admin-primary' disabled={!ack[p.id]} onClick={()=>review(p,'accept')}>接受文案修改为草稿</button><button type='button' onClick={()=>review(p,'reject')}>拒绝修改</button></div></>}
 </section>)}
 </div>;
}
