import React,{useState} from 'react';
import {Field} from './AdminPage';
export default function DocumentImport({api,run,onText}){
 const [name,setName]=useState(''),[warnings,setWarnings]=useState([]);
 return <div className='admin-upload-box'><h3>上传 Word 或文本资料</h3><p>支持 .docx 和 UTF-8 .txt，最大 10 MB。上传只提取文字，不会自动提交给 AI 或发布。</p>
 <Field label='选择资料文件'><input type='file' accept='.docx,.txt' onChange={e=>{const file=e.target.files?.[0];if(!file)return;run(async()=>{const body=new FormData();body.append('document',file);const r=await api.request('/documents/extract',{method:'POST',body});onText(r.text);setName(file.name);setWarnings(r.warnings);},'资料已导入，请核对正文。');e.target.value='';}}/></Field>
 {name&&<p role='status'>已导入：{name}</p>}{warnings.map(w=><p className='admin-muted' key={w}>{w}</p>)}
 </div>;
}
