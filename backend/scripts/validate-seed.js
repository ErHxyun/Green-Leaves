import {HttpError} from '../src/validation.js';
export function validateSeed(seed){
 const errors=[],all=new Set(),years=new Set(seed.years.map(y=>y.id)),events=new Set(seed.events.map(e=>e.id)),media=new Set(seed.media.map(m=>m.id));
 for(const row of [...seed.years,...seed.events,...seed.blocks,...seed.media,...seed.site]){
  if(!row.id||all.has(row.id))errors.push('Missing or duplicate ID: '+row.id);all.add(row.id);
  if(row.status&&!['draft','published','archived'].includes(row.status))errors.push('Invalid status: '+row.id);
  for(const lang of Object.keys(row.translations||{}))if(!['en','cn'].includes(lang))errors.push('Invalid language: '+row.id);
 }
 for(const e of seed.events)if(!years.has(e.year_id))errors.push('Missing year: '+e.id);
 for(const b of seed.blocks){
  if(!events.has(b.event_id)||!['text','subtitle','image'].includes(b.type))errors.push('Invalid block: '+b.id);
  if(b.type==='image'&&!media.has(b.media_id))errors.push('Missing media: '+b.id);
 }
 for(const e of seed.events){
  const bs=seed.blocks.filter(b=>b.event_id===e.id);
  if(new Set(bs.map(b=>b.sort_order)).size!==bs.length||bs.some(b=>!Number.isInteger(b.sort_order)||b.sort_order<0))errors.push('Invalid block order: '+e.id);
 }
 if(errors.length)throw new HttpError(422,'Invalid seed structure',errors);
 return true;
}
