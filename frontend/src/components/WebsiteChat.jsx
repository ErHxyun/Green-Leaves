import React,{useEffect,useRef,useState} from 'react';
import {Box,Button,Paper,Avatar,TextField,Typography,Link,IconButton} from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import logo from '../pictures/logo.jpg';
import {usePageMedia} from '../services/usePageMedia';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {useTranslation} from 'react-i18next';
import {askWebsite,contentLanguage} from '../services/contentApi';
function ChatAvatar({brand,small=false}){
 return <Avatar src={brand.src} alt={brand.alt||'Little Green Leaves'} sx={{width:small?28:40,height:small?28:40,bgcolor:'white',p:.3,border:'1px solid #e0e9e1','& img':{objectFit:'contain'}}}>
  <Box component="img" src={logo} alt="Little Green Leaves" sx={{width:'100%',height:'100%',objectFit:'contain'}}/>
 </Avatar>;
}
export default function WebsiteChat(){
 const brand=usePageMedia('logo',[{src:logo,alt:'Little Green Leaves'}])[0];
 const {i18n}=useTranslation(),cn=contentLanguage(i18n.language)==='cn';
 const [open,setOpen]=useState(false),[question,setQuestion]=useState(''),[messages,setMessages]=useState([]),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const abort=useRef(null),scroll=useRef(null),launcher=useRef(null);
 useEffect(()=>()=>abort.current?.abort(),[]);
 useEffect(()=>{abort.current?.abort();setMessages([]);setError('');setQuestion('');setBusy(false);},[cn]);
 useEffect(()=>{if(scroll.current)scroll.current.scrollTop=scroll.current.scrollHeight;},[messages,busy,open]);
 const close=()=>{setOpen(false);launcher.current?.focus();};
 async function send(value=question){
  if(busy||!value.trim())return;
  const controller=new AbortController();abort.current=controller;setBusy(true);setError('');
  const history=messages.filter(m=>m.role==='user').map(m=>m.text).slice(-4);
  setMessages(m=>[...m.slice(-18),{role:'user',text:value}]);setQuestion('');
  try{
   const answer=await askWebsite(value,cn?'cn':'en',history,controller.signal);
   if(!controller.signal.aborted)setMessages(m=>[...m,{role:'assistant',...answer}]);
  }catch(e){if(!controller.signal.aborted)setError(e.status===429?(cn?'提问较多或今日额度已用完，请稍后重试。':'Request limit reached. Please try later.'):(cn?'助手暂时无法回答，请稍后重试或联系我们。':'The assistant is unavailable. Please try later or contact us.'));}
  finally{if(abort.current===controller)setBusy(false);}
 }
 return <>
  <Button ref={launcher} variant="contained" startIcon={open?<CloseIcon/>:<ChatBubbleOutlineIcon/>} aria-expanded={open} aria-controls={open?'website-chat-panel':undefined} onClick={()=>open?close():setOpen(true)}
   sx={{position:'fixed',bottom:20,right:{xs:16,sm:24},zIndex:1200,borderRadius:8,px:2.5,py:1.25,bgcolor:'#166534',boxShadow:'0 6px 24px #14532d33','&:hover':{bgcolor:'#14532d'}}}>
   {open?(cn?'收起聊天':'Minimize chat'):(cn?'问问小绿叶':'Ask Green Leaves')}
  </Button>
  {open&&<Paper id="website-chat-panel" role="dialog" aria-modal="false" aria-labelledby="website-chat-title" elevation={12} onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();close();}}}
   sx={{position:'fixed',right:{xs:12,sm:24},bottom:80,width:{xs:'calc(100vw - 24px)',sm:390},height:560,maxHeight:'calc(100dvh - 100px)',zIndex:1200,display:'flex',flexDirection:'column',borderRadius:4,overflow:'hidden',border:'1px solid #dce8de',boxShadow:'0 16px 64px #163c2930'}}>
   <Box sx={{display:'flex',alignItems:'center',gap:1.25,p:2,color:'white',background:'linear-gradient(120deg,#14532d,#287749)'}}>
    <ChatAvatar brand={brand}/>
    <Box sx={{flex:1}}>
     <Typography id="website-chat-title" sx={{fontWeight:700,fontSize:16}}>{cn?'小绿叶':'Green Leaves'}</Typography>
     <Typography variant="caption" sx={{opacity:.85}}>{cn?'官网 AI 助手 · 陪你了解我们的故事':'Website AI assistant · Our stories, together'}</Typography>
    </Box>
    <IconButton aria-label={cn?'关闭':'Close'} onClick={close} size="small" sx={{color:'white'}}><CloseIcon fontSize="small"/></IconButton>
   </Box>
   <Box ref={scroll} sx={{flex:1,minHeight:0,overflowY:'auto',overscrollBehavior:'contain',p:2,bgcolor:'#f5f8f5'}}>
    <Typography sx={{textAlign:'center',fontSize:11,color:'#748378',mb:2}}>{cn?'回答依据官网已发布内容':'Answers use published website information'}</Typography>
    <Box role="log" aria-live="polite" aria-label={cn?'聊天记录':'Conversation'}>
     <Box sx={{display:'flex',gap:1,alignItems:'flex-start',mb:2}}>
      <ChatAvatar brand={brand} small/>
      <Box sx={{bgcolor:'white',border:'1px solid #e4ece5',borderRadius:'4px 16px 16px 16px',p:1.5,maxWidth:'85%'}}>
       <Typography variant="body2" sx={{lineHeight:1.8}}>{cn?'你好呀，我是小绿叶 🌱 想了解我们的公益活动、成长故事，或找到联系方式？可以直接问我。':"Hi, I'm Green Leaves 🌱 Ask me about our activities, our story, or how to get in touch."}</Typography>
      </Box>
     </Box>
     {!messages.length&&<Box sx={{display:'flex',gap:1,flexDirection:'column',alignItems:'flex-start',ml:4.5,mb:2}}>
      {(cn?['小绿叶是什么组织？','你们做过哪些公益活动？','如何联系你们？']:['What is Little Green Leaves?','What activities have you organized?','How can I contact you?']).map(q=><Button key={q} variant="outlined" size="small" onClick={()=>send(q)} sx={{borderRadius:5,bgcolor:'white',color:'#216239',borderColor:'#cadfce',textTransform:'none',textAlign:'left'}}>{q}</Button>)}
     </Box>}
     {messages.map((m,i)=>{
      const user=m.role==='user';
      return <Box key={i} sx={{display:'flex',justifyContent:user?'flex-end':'flex-start',alignItems:'flex-start',gap:1,mb:2}}>
       {!user&&<ChatAvatar brand={brand} small/>}
       <Box sx={{maxWidth:user?'85%':'calc(100% - 36px)',minWidth:0,bgcolor:user?'#216239':'white',color:user?'white':'#24372b',border:user?'none':'1px solid #e4ece5',borderRadius:user?'16px 4px 16px 16px':'4px 16px 16px 16px',p:1.5}}>
        <Typography variant="body2" sx={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',lineHeight:1.8}}>{m.text||m.answer}</Typography>
        {m.sources?.map(s=><Box key={s.id} sx={{mt:1.25,pt:1.25,borderTop:'1px solid #e8eee8'}}>
         <Box component="details">
          <Box component="summary" sx={{cursor:'pointer',fontSize:12,color:'#55735c'}}>{cn?'展开官网原文':'Read website excerpt'}</Box>
          <Typography variant="body2" sx={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',mt:1,lineHeight:1.8}}>{s.text}</Typography>
          {s.fallback&&<Typography variant="caption">{cn?'此段使用英文原文回退。':'English source fallback.'}</Typography>}
         </Box>
         <Link href={s.url} sx={{fontSize:12,color:'#216239',display:'inline-block',mt:.5}}>{cn?'查看来源':'View source'} · {s.title}</Link>
        </Box>)}
       </Box>
      </Box>;
     })}
     {busy&&<Box role="status" sx={{bgcolor:'white',borderRadius:'4px 16px 16px 16px',p:1.5,ml:4.5,width:'fit-content',color:'#5d7865',fontSize:13}}>{cn?'小绿叶正在查找资料 ···':'Looking that up ···'}</Box>}
    </Box>
    {error&&<Typography role="alert" sx={{p:1.5,mt:1,borderRadius:2,bgcolor:'#fff1ed',color:'#a33e27',fontSize:13}}>{error}</Typography>}
   </Box>
   <Box sx={{p:1.5,bgcolor:'white',borderTop:'1px solid #e4ece5'}}>
    <Box component="form" onSubmit={e=>{e.preventDefault();send();}} sx={{display:'flex',gap:1,alignItems:'flex-end'}}>
     <TextField autoFocus fullWidth multiline maxRows={3} size="small" placeholder={cn?'给小绿叶发消息…':'Message Green Leaves…'} value={question} onChange={e=>setQuestion(e.target.value)}
      onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();send();}}}
      inputProps={{maxLength:600,'aria-label':cn?'聊天消息':'Chat message'}} disabled={busy}
      sx={{'& .MuiOutlinedInput-root':{borderRadius:3,bgcolor:'#f5f8f5',fontSize:14},'& .MuiOutlinedInput-notchedOutline':{borderColor:'#e0e9e1'},'& .Mui-focused .MuiOutlinedInput-notchedOutline':{borderColor:'#287749'}}}/>
     <IconButton type="submit" aria-label={cn?'发送':'Send'} disabled={busy||!question.trim()} sx={{bgcolor:'#216239',color:'white',borderRadius:3,'&:hover':{bgcolor:'#14532d'},'&.Mui-disabled':{bgcolor:'#eef3ee',color:'#adbeaf'}}}><SendRoundedIcon fontSize="small"/></IconButton>
    </Box>
    <Box sx={{display:'flex',justifyContent:'space-between',gap:1,mt:1}}>
     <Typography sx={{fontSize:10,color:'#859187'}}>{cn?'AI 服务处理问题，请勿填写隐私信息':'AI processes questions. Avoid personal information.'}</Typography>
     <Link href="/contact" sx={{fontSize:11,color:'#53785c',whiteSpace:'nowrap'}}>{cn?'联系小绿叶':'Contact us'}</Link>
    </Box>
   </Box>
  </Paper>}
 </>;
}
