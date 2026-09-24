import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {parse} from '@babel/parser';
export const root=fileURLToPath(new URL('../../',import.meta.url));
const hash=v=>crypto.createHash('sha256').update(v).digest('hex').slice(0,24);
const read=p=>fs.readFileSync(path.join(root,p),'utf8').replace(/^\uFEFF/,'');
export function readTimeline(){
 const ast=parse(read('frontend/src/components/TreeOfGrowthTimeline.jsx'),{sourceType:'module',plugins:['jsx']});
 const env={Leaf:'Leaf',Users:'Users',HandCoins:'HandCoins',Droplets:'Droplets',HeartHandshake:'HeartHandshake'};
 function value(n){
  if(['StringLiteral','NumericLiteral','BooleanLiteral'].includes(n.type))return n.value;
  if(n.type==='BinaryExpression'&&n.operator==='+')return value(n.left)+value(n.right);
  if(n.type==='NullLiteral')return null;
  if(n.type==='Identifier'&&Object.hasOwn(env,n.name))return env[n.name];
  if(n.type==='ArrayExpression')return n.elements.map(value);
  if(n.type==='ObjectExpression')return Object.fromEntries(n.properties.map(p=>{
   if(p.type!=='ObjectProperty'||p.computed)throw Error('Unsupported property');
   return [p.key.name??p.key.value,value(p.value)];
  }));
  if(n.type==='CallExpression'&&n.callee.name==='publicImage'&&n.arguments.length===1)return '/pictures/'+value(n.arguments[0]);
  throw Error('Unsupported data expression: '+n.type);
 }
 for(const n of ast.program.body)if(n.type==='VariableDeclaration')for(const d of n.declarations)
  if(d.id.name?.startsWith('img')||d.id.name==='defaultData')env[d.id.name]=value(d.init);
 if(!Array.isArray(env.defaultData))throw Error('defaultData not found');
 return env.defaultData;
}
function flatten(v,p='',out={}){
 for(const[k,x]of Object.entries(v)){
  if((p==='timeline'||p==='')&&/^\d{4}$/.test(k))continue;
  const key=p?p+'.'+k:k;
  if(x&&typeof x==='object'&&!Array.isArray(x))flatten(x,key,out);else out[key]=x;
 }return out;
}
export function extract(){
 const locales=Object.fromEntries(['en','cn'].map(l=>[l,JSON.parse(read('frontend/src/locales/'+l+'/common.json'))]));
 const years=[],events=[],blocks=[],media=new Map(),site=[];
 const report={counts:{},missingTranslations:[],invalidImagePaths:[],duplicateIds:[],numericDateDifferences:[],missingDates:[],unmappedTranslations:[]};
 function compare(id,en,cn){
  if(typeof en!=='string'||typeof cn!=='string')return;
  const nums=s=>(s.replace(/(\d),(?=\d{3}\b)/g,'$1').match(/\d+(?:\.\d+)?|[零一二三四五六七八九十百千万亿]+/g)||[]).sort().join('|');
  if(nums(en)!==nums(cn))report.numericDateDifferences.push({id,en,cn,reason:'Possible number/date difference; review required. Originals unchanged.'});
 }
 function tr(id,en,cn,fields){
  const translations={};
  for(const[lang,source]of [['en',en],['cn',cn]]){
   const values={};for(const f of fields){
    if(source?.[f]!==undefined&&source[f]!==null)values[f]=source[f];
    else report.missingTranslations.push({id,lang,field:f});
   }if(Object.keys(values).length)translations[lang]=values;
  }for(const f of fields)compare(id+'.'+f,en?.[f],cn?.[f]);return translations;
 }
 function asset(url,metadata={}){
  if(!media.has(url))media.set(url,{id:'media-'+hash(url),url,metadata});
  return media.get(url).id;
 }
 for(const[yi,y]of readTimeline().entries()){
  const en=locales.en.timeline?.[y.year],cn=locales.cn.timeline?.[y.year];
  years.push({id:'year-'+y.year,year:y.year,sort_order:yi,icon:y.icon,status:'published',translations:tr('year-'+y.year,{title:en?.title??y.title,summary:en?.summary??y.summary},cn,['title','summary'])});
  for(const[ei,e]of y.events.entries()){
   const et=en?.events?.[e.id],ct=cn?.events?.[e.id],id='event-'+e.id;
   events.push({id,year_id:'year-'+y.year,slug:e.id,event_date:null,sort_order:ei,status:'published',translations:tr(id,{title:et?.title??e.title},ct,['title'])});
   report.missingDates.push({id,reason:'No structured legacy date; dates in original titles/text retained.'});
   const occurrences=new Map();
   for(const[bi,b]of e.detailBlocks.entries()){
    const fingerprint=hash(JSON.stringify([e.id,b.type,b.src??null,b.content??null,b.caption??null]));
    const occurrence=(occurrences.get(fingerprint)||0)+1;occurrences.set(fingerprint,occurrence);
    const bid='block-'+fingerprint+'-'+occurrence;
    blocks.push({id:bid,event_id:id,type:b.type,sort_order:bi,status:'published',media_id:b.type==='image'?asset(b.src,{origin:'timeline'}):null,
     translations:tr(bid,{...b,...et?.blocks?.[bi]},ct?.blocks?.[bi],b.type==='image'?['caption','alt']:['content']),
     legacy_reference:{year:y.year,event_slug:e.id,index:bi}});
   }
   for(const[lang,legacy]of [['en',et],['cn',ct]])for(const key of Object.keys(legacy?.blocks||{}))
    if(!e.detailBlocks[Number(key)])report.unmappedTranslations.push({id,lang,index:key});
  }
 }
 for(const[lang,locale]of Object.entries(locales))for(const[year,y]of Object.entries(locale.timeline||{})){
  if(!/^\d{4}$/.test(year))continue;
  for(const slug of Object.keys(y.events||{}))if(!events.some(e=>e.slug===slug))report.unmappedTranslations.push({lang,year,slug});
 }
 const flat={en:flatten(locales.en),cn:flatten(locales.cn)};
 for(const key of new Set([...Object.keys(flat.en),...Object.keys(flat.cn)]))site.push({id:'site-'+hash(key),content_key:key,status:'published',
  translations:tr(key,flat.en[key]===undefined?null:{value:flat.en[key]},flat.cn[key]===undefined?null:{value:flat.cn[key]},['value'])});
 function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(d=>d.isDirectory()?walk(path.join(dir,d.name)):[path.join(dir,d.name)]);}
 for(const folder of ['frontend/public/pictures','frontend/src/pictures']){
  const dir=path.join(root,folder);if(!fs.existsSync(dir))continue;
  for(const f of walk(dir).filter(f=>/\.(png|jpe?g|gif|webp|svg|avif)$/i.test(f))){
   const relative=path.relative(dir,f).split(path.sep).join('/');
   const url=(folder.includes('/public/')?'/pictures/':'/media/source/')+relative;
   asset(url);const item=media.get(url);
   item.metadata={...item.metadata,source_file:path.relative(root,f).split(path.sep).join('/'),bytes:fs.statSync(f).size};
  }
 }
 for(const m of media.values()){
  const disk=m.url.startsWith('/pictures/')?path.join(root,'frontend/public',m.url):path.join(root,'frontend/src/pictures',m.url.slice('/media/source/'.length));
  if(!fs.existsSync(disk))report.invalidImagePaths.push({id:m.id,url:m.url});
 }
 const seen=new Set();for(const x of [...years,...events,...blocks,...media.values(),...site]){
  if(seen.has(x.id))report.duplicateIds.push(x.id);seen.add(x.id);
 }
 report.counts={years:years.length,events:events.length,blocks:blocks.length,images:media.size,timelineImages:blocks.filter(b=>b.type==='image').length,siteTextKeys:site.length};
 report.misplacedEnglishYears=Object.keys(locales.en).filter(k=>/^\d{4}$/.test(k));
 report.legacyNote='Original effective English display is preserved; misplaced English translations and unmapped Chinese blocks are archived in legacySources, never exposed as site content.';
 return {seed:{schemaVersion:1,years,events,blocks,media:[...media.values()],site,legacySources:locales},report};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const {seed,report}=extract();const dir=path.join(root,'backend/generated');fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,'seed.json'),JSON.stringify(seed,null,2)+'\n');
 fs.writeFileSync(path.join(dir,'consistency-report.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({...report,missingTranslations:report.missingTranslations.length,numericDateDifferences:report.numericDateDifferences.length,missingDates:report.missingDates.length},null,2));
 if(report.duplicateIds.length)process.exitCode=1;
}
