import React,{useEffect,useState} from 'react';
import {Field,Status} from './AdminPage';
import {siteGroups,describeSiteKey} from './siteLabels';
export default function SiteManager({api,run,setDirty,discard}){
 const [items,setItems]=useState([]),[data,setData]=useState(null),[error,setError]=useState(''),[loading,setLoading]=useState(true),[group,setGroup]=useState('首页'),[q,setQ]=useState('');
 useEffect(()=>{let live=true;api.request('/site-content').then(r=>{if(live)setItems(r.data);}).catch(e=>{if(live)setError(e.message);}).finally(()=>{if(live)setLoading(false);});return()=>{live=false;};},[api]);
 async function save(status){
  if(status==='published'&&!window.confirm('确认将这条文案更新到官网？'))return;
  await run(async()=>{
   const r=await api.request('/site-content/'+data.id,{method:'PUT',body:{content_key:data.content_key,status,translations:data.translations}});
   setItems(list=>list.map(i=>i.id===data.id?r.data:i));setData(r.data);setDirty(false);
  },status==='published'?'文案已更新到官网。':'修改已保存为草稿。');
 }
 const filtered=items.filter(i=>{
  const info=describeSiteKey(i.content_key);
  return (q||info.group===group)&&[info.group,info.label,i.translations?.cn?.value,i.translations?.en?.value].join(' ').toLowerCase().includes(q.toLowerCase());
 });
 const info=data?describeSiteKey(data.content_key):null;
 return <section>
  <div className='admin-card'><h2>编辑官网文字</h2><p className='admin-muted'>先选择页面，再点击需要修改的文字。可搜索官网上看到的中文或英文。</p>
   <Field label='搜索官网文字' value={q} onChange={e=>setQ(e.target.value)} placeholder='例如：志愿者、联系我们'/>
   <div className='admin-tabs' aria-label='文案所属页面'>{siteGroups.map(g=><button type='button' key={g} aria-pressed={group===g&&!q} onClick={()=>{if(discard()){setGroup(g);setQ('');setData(null);setDirty(false);}}}>{g}（{items.filter(i=>describeSiteKey(i.content_key).group===g).length}）</button>)}</div>
  </div>
  {error&&<p role='alert' className='admin-error'>{error}</p>}
  <div className='admin-copy-layout'><div className='admin-copy-list' aria-label='可编辑文案'>
   {loading?<p role='status'>正在加载官网文案…</p>:!filtered.length?<p>没有找到相关文字，请尝试其他关键词。</p>:filtered.map(i=>{const d=describeSiteKey(i.content_key);return <button type='button' key={i.id} className='admin-copy-item' aria-pressed={data?.id===i.id} onClick={()=>{if(discard()){setData(JSON.parse(JSON.stringify(i)));setDirty(false);}}}>
    <span className='admin-muted'>{d.group}</span><strong>{d.label}</strong><span className='admin-copy-excerpt'>{i.translations?.cn?.value||i.translations?.en?.value||'尚未填写'}</span><Status value={i.status} live={i.has_published_version}/>
   </button>;})}
  </div><div className='admin-card'>
   {!data?<p className='admin-empty'>点击一条文案，在这里编辑中英文内容。</p>:<>
    <h2>{info.group} · {info.label}</h2><Status value={data.status}/>
    <p className='admin-note'>保存草稿仅保存修改；点击“更新到官网”才会公开。保存草稿时，官网继续显示上一次发布的文案。文字中的双大括号占位符请保持原样。</p>
    <div className='admin-columns'>{['cn','en'].map(lang=><Field key={lang} label={lang==='cn'?'中文文案':'英文文案'}><textarea rows={8} value={data.translations?.[lang]?.value??''} onChange={e=>{setData(d=>({...d,translations:{...d.translations,[lang]:{value:e.target.value}}}));setDirty(true);}}/></Field>)}</div>
    <div className='admin-actions'><button type='button' onClick={()=>save('draft')}>保存文案草稿</button><button type='button' className='admin-primary' onClick={()=>save('published')}>更新到官网</button></div>
   </>}
  </div></div>
 </section>;
}
