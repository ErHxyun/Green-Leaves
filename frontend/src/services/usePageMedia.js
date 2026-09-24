import {useTranslation} from 'react-i18next';
import {mediaUrl} from './adminApi';
export function usePageMedia(section,fallback){
 const {t}=useTranslation();
 const value=t('pageMedia.'+section,{returnObjects:true,defaultValue:fallback});
 return Array.isArray(value)&&value.length?value.map(i=>({...i,src:mediaUrl(i.src)})):fallback;
}
