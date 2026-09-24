const base = (process.env.REACT_APP_CONTENT_API_URL || '').replace(/\/$/, '');
export const contentLanguage = language => /^cn|^zh/i.test(language || '') ? 'cn' : 'en';
export async function getContent(path, language, signal) {
 const controller = new AbortController();
 const abort = () => controller.abort();
 if (signal?.aborted) controller.abort();
 signal?.addEventListener('abort', abort);
 const timeout = setTimeout(abort, 8000);
 try {
  const response = await fetch(base + '/api/v1/' + path + '?lang=' + contentLanguage(language), {signal: controller.signal});
  if (!response.ok) throw new Error('Content API HTTP ' + response.status);
  return await response.json();
 } finally {
  clearTimeout(timeout);
  signal?.removeEventListener('abort', abort);
 }
}
export async function getTimeline(language, signal) {
 const result = await getContent('timeline', language, signal);
 if (!Array.isArray(result.data) || result.data.some(y => !Number.isInteger(y.year) || !Array.isArray(y.events) || y.events.some(e => !e.id || !Array.isArray(e.detailBlocks)))) throw new Error('Invalid timeline response');
 return result.data.map(y => ({...y, events:y.events.map(e => ({...e,detailBlocks:e.detailBlocks.map(b => ({...b,src:b.src?.startsWith('/') ? (base || process.env.PUBLIC_URL || '') + b.src : b.src}))}))}));
}

export async function askWebsite(message,lang,history,signal){
 const controller=new AbortController();
 const abort=()=>controller.abort();
 if(signal?.aborted)abort();
 signal?.addEventListener('abort',abort);
 const timeout=setTimeout(abort,100000);
 try{
  const response=await fetch(base+'/api/v1/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,lang,history}),signal:controller.signal});
  if(!response.ok){const error=new Error('Website assistant unavailable');error.status=response.status;throw error;}
  return response.json();
 }finally{clearTimeout(timeout);signal?.removeEventListener('abort',abort);}
}
