import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {contentLanguage,getContent} from './contentApi';
import en from '../locales/en/common.json';
import cn from '../locales/cn/common.json';
export async function refreshSiteContent(i18n, language, signal) {
 const lang=contentLanguage(language);
 const result=await getContent('site-content',lang,signal);
 if (!result.resources || typeof result.resources !== 'object' || Array.isArray(result.resources)) throw new Error('Invalid site content response');
 if (signal?.aborted) return;
 // Reset to built-in resources before merging, so removed API keys do not remain cached forever.
 i18n.removeResourceBundle(lang,'translation');
 i18n.addResourceBundle(lang,'translation',JSON.parse(JSON.stringify(lang==='cn'?cn:en)),true,true);
 i18n.addResourceBundle(lang,'translation',result.resources,true,true);
 document.title=i18n.t('seo.title',{lng:lang});
 const description=document.querySelector('meta[name=description]');if(description)description.setAttribute('content',i18n.t('seo.description',{lng:lang}));
 i18n.emit('loaded',{[lang]:{translation:true}});
}
export default function SiteContentProvider({children}) {
 const {i18n}=useTranslation();
 useEffect(() => {
  const controller=new AbortController();
  refreshSiteContent(i18n,i18n.language,controller.signal).catch(() => { /* Built-in resources keep all pages usable offline. */ });
  return () => controller.abort();
 },[i18n,i18n.language]);
 return children;
}
