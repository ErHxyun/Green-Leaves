import React,{useEffect,useRef,useState} from 'react';
import {Field} from './AdminPage';
import {mediaUrl} from '../services/adminApi';
export default function MediaLibrary({api,run,onSelect}){
 const [q,setQ]=useState(''),[offset,setOffset]=useState(0),[items,setItems]=useState([]),[total,setTotal]=useState(0),[error,setError]=useState(''),[loading,setLoading]=useState(false),[url,setUrl]=useState(''),[revision,setRevision]=useState(0);
 const [file,setFile]=useState(null),[preview,setPreview]=useState(''),[uploading,setUploading]=useState(false),[uploaded,setUploaded]=useState(null);const input=useRef();
 useEffect(()=>{if(!file){setPreview('');return;}const value=URL.createObjectURL(file);setPreview(value);return()=>URL.revokeObjectURL(value);},[file]);
 useEffect(()=>{
  let live=true;setLoading(true);setError('');
  api.request('/media?q='+encodeURIComponent(q)+'&offset='+offset).then(r=>{if(live){setItems(r.data);setTotal(r.total);}}).catch(e=>{if(live)setError(e.message);}).finally(()=>{if(live)setLoading(false);});
  return()=>{live=false;};
 },[api,q,offset,revision]);
 function choose(next){setError('');if(!next)return;if(!['image/jpeg','image/png','image/webp'].includes(next.type)||next.size>10*1024*1024){setError('请选择 10 MB 以内的 JPG、PNG 或 WebP 图片。');return;}setFile(next);setUploaded(null);}
 async function upload(){
  if(!file||uploading)return;setUploading(true);
  try{await run(async()=>{const body=new FormData();body.append('image',file);const r=await api.request('/media/upload',{method:'POST',body});
   setUploaded(r.data);setFile(null);if(input.current)input.current.value='';setQ('');setOffset(0);setRevision(v=>v+1);if(onSelect)onSelect(r.data);
  },onSelect?'图片已上传并选中，请保存活动草稿。':'图片上传成功，现在可以在活动编辑中使用。');}finally{setUploading(false);}
 }
 return <section className='admin-card'><h2>{onSelect?'选择或上传图片':'图片资料库'}</h2>
  <div className='admin-upload-box' onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();if(!uploading)choose(e.dataTransfer.files?.[0]);}}>
   <h3>从电脑上传图片</h3><p>将一张图片拖到这里，或点击下方选择文件。支持 JPG、PNG、WebP，每张不超过 10 MB。</p>
   <Field label='选择要上传的图片'><input ref={input} type='file' accept='image/jpeg,image/png,image/webp' disabled={uploading} onChange={e=>choose(e.target.files?.[0])}/></Field>
   {file&&<div className='admin-image-choice'><img src={preview} alt='待上传图片预览'/><span>{file.name} · {(file.size/1024/1024).toFixed(2)} MB</span></div>}
   <button type='button' className='admin-primary' disabled={!file||uploading} onClick={upload}>{uploading?'正在上传…':onSelect?'上传并使用这张图片':'上传图片'}</button>
   <p className='admin-muted'>请上传可用于官网的图片。上传后图片链接可访问，活动仍须单独发布。</p>
   {uploaded&&!onSelect&&<p role='status'>已上传：{uploaded.metadata?.original_name}</p>}
  </div>
  <Field label='搜索图片' value={q} onChange={e=>{setQ(e.target.value);setOffset(0);}} placeholder='输入文件名或活动年份'/>
  {error&&<p role='alert' className='admin-error'>{error}</p>}
  <p role='status' className='admin-muted'>{loading?'正在加载图片…':total+' 张图片'}</p>
  <div className='admin-media-grid'>{items.map(m=><button type='button' className='admin-media-item' key={m.id} disabled={!onSelect} onClick={()=>onSelect?.(m)} title={m.metadata?.original_name||m.url}><img src={mediaUrl(m.url)} alt={m.metadata?.original_name||m.metadata?.source_file||'活动图片'} loading='lazy' referrerPolicy='no-referrer'/><span>{m.metadata?.original_name||m.url.split('/').pop()}</span>{onSelect&&<strong>使用此图片</strong>}</button>)}</div>
  <div className='admin-toolbar'><button type='button' disabled={!offset||loading} onClick={()=>setOffset(Math.max(0,offset-24))}>上一页</button><span>{Math.floor(offset/24)+1} / {Math.max(1,Math.ceil(total/24))}</span><button type='button' disabled={offset+24>=total||loading} onClick={()=>setOffset(offset+24)}>下一页</button></div>
  <details><summary>已有网络图片？使用图片链接</summary><div className='admin-toolbar'>
   <Field label='图片链接' value={url} onChange={e=>setUrl(e.target.value)} placeholder='https://…'/>
   <button type='button' disabled={!url.trim()} onClick={()=>run(async()=>{const r=await api.request('/media',{method:'POST',body:{url}});setUrl('');setRevision(v=>v+1);if(onSelect)onSelect(r.data);},'图片地址已登记。')}>添加链接</button>
  </div></details>
 </section>;
}
