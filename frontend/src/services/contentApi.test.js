import {renderHook,waitFor,act} from '@testing-library/react';
import {getTimeline,contentLanguage,getContent} from './contentApi';
import {useTimelineContent} from './useTimelineContent';
import {refreshSiteContent} from './SiteContentProvider';
import {createInstance} from 'i18next';
afterEach(()=>{jest.useRealTimers();jest.restoreAllMocks();});
test('normalizes language and distinguishes empty published data from API failures',async()=>{
 expect(contentLanguage('zh-CN')).toBe('cn');
 global.fetch=jest.fn(async()=>({ok:true,json:async()=>({data:[]})}));
 expect(await getTimeline('cn')).toEqual([]);
 global.fetch.mockResolvedValue({ok:false,status:503});
 await expect(getTimeline('en')).rejects.toThrow('503');
 global.fetch.mockResolvedValue({ok:true,json:async()=>({data:{}})});
 await expect(getTimeline('en')).rejects.toThrow('Invalid');
});
test('hook refetches language and ignores stale responses',async()=>{
 let resolveEnglish;
 global.fetch=jest.fn((url)=>url.includes('lang=en')?new Promise(resolve=>{resolveEnglish=resolve;}):Promise.resolve({ok:true,json:async()=>({data:[]})}));
 const {result,rerender}=renderHook(({lang})=>useTimelineContent(lang),{initialProps:{lang:'en'}});
 expect(result.current.status).toBe('loading');
 rerender({lang:'cn'});
 await waitFor(()=>expect(result.current.status).toBe('empty'));
 await act(async()=>resolveEnglish({ok:true,json:async()=>({data:[{year:2025,events:[]}]})}));
 expect(result.current.lang).toBe('cn');expect(result.current.data).toEqual([]);
});
test('hook exposes failure for static fallback',async()=>{
 global.fetch=jest.fn().mockRejectedValue(new Error('offline'));
 const {result}=renderHook(()=>useTimelineContent('cn'));
 await waitFor(()=>expect(result.current.status).toBe('error'));expect(result.current.data).toBeNull();
});
test('request timeout aborts instead of loading indefinitely',async()=>{
 jest.useFakeTimers();
 global.fetch=jest.fn((url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new Error('aborted')))));
 const pending=getContent('timeline','en');
 const assertion=expect(pending).rejects.toThrow('aborted');
 jest.advanceTimersByTime(8001);await assertion;
});
test('site refresh replaces stale API overrides and retains built-in texts',async()=>{
 const i18n=createInstance();await i18n.init({lng:'en',resources:{en:{translation:{}}}});
 global.fetch=jest.fn().mockResolvedValueOnce({ok:true,json:async()=>({resources:{about:{title:'First'}}})}).mockResolvedValueOnce({ok:true,json:async()=>({resources:{}})});
 await refreshSiteContent(i18n,'en');expect(i18n.t('about.title')).toBe('First');
 await refreshSiteContent(i18n,'en');expect(i18n.t('about.title')).toBe('About Little Green Leaves');
});
