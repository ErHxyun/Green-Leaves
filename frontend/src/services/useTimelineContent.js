import {useEffect, useState} from 'react';
import {contentLanguage, getTimeline} from './contentApi';
export function useTimelineContent(language, enabled = true) {
 const lang = contentLanguage(language);
 const [state,setState] = useState({lang:null,data:null,status:'loading'});
 useEffect(() => {
  if (!enabled) return undefined;
  const controller = new AbortController();
  setState({lang,data:null,status:'loading'});
  getTimeline(lang,controller.signal).then(data => {
   if (!controller.signal.aborted) setState({lang,data,status:data.length ? 'ready' : 'empty'});
  }).catch(() => {
   if (!controller.signal.aborted) setState({lang,data:null,status:'error'});
  });
  return () => controller.abort();
 }, [lang,enabled]);
 return state.lang === lang ? state : {lang,data:null,status:'loading'};
}
