import React,{useEffect,useState} from 'react';
import {Field,Status} from './AdminPage';
import MediaLibrary from './MediaLibrary';
import {mediaUrl} from '../services/adminApi';
export default function PageImages({api,run,setDirty,discard}){
 const [items,setItems]=useState([]),[draft,setDraft]=useState(null),[picker,setPicker]=useState(null),[error,setError]=useState('');
 useEffect(()=>{let active=true;api.request('/pages').then(r=>{if(active)setItems(r.data);}).catch(e=>{if(active)setError(e.message);});return()=>{active=false;};},[api]);
 const change=images=>{setDraft(d=>({...d,images}));setDirty(true);};
 async function save(status){
  if(status==='published'&&!window.confirm('确认将这一组图片更新到官网？'))return;
  await run(async()=>{const r=await api.request('/pages/'+draft.id,{method:'PUT',body:{expected_revision:draft.revision,status,images:draft.images.map(i=>({...(i.id?{id:i.id}:{}),media_id:i.media_id,translations:i.translations}))}});setDraft(r.data);setItems(list=>list.map(i=>i.id===r.data.id?r.data:i));setDirty(false);},status==='published'?'页面图片已更新到官网。':'图片草稿已保存，官网仍显示原来的图片。');
 }
 return <section className='admin-card'><h2>页面图片与二维码</h2><p>选择位置，即可更换图片。轮播和寄语图片可以增加、移除或调整顺序。</p>
 {error&&<p role='alert'>{error}</p>}
 <Field label='选择图片所在位置'><select value={draft?.id||''} onChange={e=>{if(discard()){setDraft(JSON.parse(JSON.stringify(items.find(i=>i.id===e.target.value)||null)));setDirty(false);}}}><option value=''>请选择页面位置</option>{items.map(i=><option key={i.id} value={i.id}>{i.label}</option>)}</select></Field>
 {draft&&<><Status value={draft.status}/><p className='admin-note'>保存草稿不会替换官网现有图片。审核后点击“更新图片到官网”。</p>
 {draft.images.map((image,index)=><div className='admin-block' key={image.id||index}>
 <div className='admin-image-choice'><img src={mediaUrl(image.src)} alt={image.translations.cn.alt}/><button type='button' onClick={()=>setPicker(index)}>替换图片 {index+1}</button>
 {['homeHero','testimonials'].includes(draft.id)&&<><button type='button' disabled={index===0} onClick={()=>{const images=[...draft.images];[images[index-1],images[index]]=[images[index],images[index-1]];change(images);}}>上移</button><button type='button' disabled={index===draft.images.length-1} onClick={()=>{const images=[...draft.images];[images[index+1],images[index]]=[images[index],images[index+1]];change(images);}}>下移</button><button type='button' disabled={draft.images.length===1} onClick={()=>change(draft.images.filter((_,i)=>i!==index))}>移除图片</button></>}
 </div><div className='admin-columns'>{['cn','en'].map(lang=><div key={lang}>{['alt','caption'].map(field=><Field key={field} label={(lang==='cn'?'中文':'英文')+(field==='alt'?'图片替代文字':'资料说明（供编辑者参考）')} value={image.translations[lang][field]} onChange={e=>change(draft.images.map((i,n)=>n===index?{...i,translations:{...i.translations,[lang]:{...i.translations[lang],[field]:e.target.value}}}:i))}/>)}</div>)}</div></div>)}
 {['homeHero','testimonials'].includes(draft.id)&&<button type='button' disabled={draft.images.length>=30} onClick={()=>setPicker(draft.images.length)}>添加图片</button>}
 <div className='admin-actions'><button type='button' onClick={()=>save('draft')}>保存图片草稿</button><button type='button' className='admin-primary' onClick={()=>save('published')}>更新图片到官网</button></div></>}
 {picker!==null&&<div className='admin-overlay' role='dialog' aria-label='选择页面图片'><div className='admin-modal'><button type='button' onClick={()=>setPicker(null)}>关闭图片选择</button><MediaLibrary api={api} run={run} onSelect={m=>{const images=[...draft.images];images[picker]={...images[picker],media_id:m.id,src:m.url,translations:images[picker]?.translations||{cn:{alt:'',caption:''},en:{alt:'',caption:''}}};change(images);setPicker(null);}}/></div></div>}
 </section>;
}
