const base=(process.env.REACT_APP_CONTENT_API_URL||'').replace(/\/$/,'');
export function mediaUrl(url){
 if(!url)return '';
 if(/^https?:\/\//i.test(url))return url;
 if(/^\/(?!\/)/.test(url))return base+url;
 return '';
}
export function createAdminApi(key,onUnauthorized=()=>{}){
 const lifetime=new AbortController();
 return {
  dispose:()=>lifetime.abort(),
  async request(path,{method='GET',body,timeout=100000}={}){
   const controller=new AbortController();
   const abort=()=>controller.abort();
   lifetime.signal.addEventListener('abort',abort);
   if(lifetime.signal.aborted)controller.abort();
   const timer=setTimeout(abort,timeout);
   try{
    const multipart=body instanceof FormData;
    const response=await fetch(base+'/api/admin'+path,{
     method,cache:'no-store',signal:controller.signal,
     headers:{'X-Admin-API-Key':key,...(body!==undefined&&!multipart?{'Content-Type':'application/json'}:{})},
     ...(body!==undefined?{body:multipart?body:JSON.stringify(body)}:{})
    });
    const result=await response.json();
    if(!response.ok){
     if(response.status===401)onUnauthorized();
     const details=Array.isArray(result.error?.details)?result.error.details.map(d=>(d.path?.join('.')||'字段')+': '+d.message).join('；'):'';
     const message=response.status===503?'服务未配置或暂不可用：'+(result.error?.message||'请检查服务配置'):result.error?.message||'请求失败';
     const error=new Error(message+(details?' — '+details:''));error.status=response.status;throw error;
    }
    return result;
   }catch(error){
    if(error.name==='AbortError')throw new Error('请求已中止或超时。写入结果可能尚未确认，请刷新列表确认后再重试。');
    throw error;
   }finally{clearTimeout(timer);lifetime.signal.removeEventListener('abort',abort);}
  }
 };
}
