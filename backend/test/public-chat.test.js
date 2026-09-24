import test from 'node:test';
import assert from 'node:assert/strict';
import {sourcesFrom,selectCandidates} from '../src/public-chat.js';
test('retrieval always includes website contact and preserves original figures',()=>{
 const sources=sourcesFrom([],{about:{intro:'Founded in 2016.',orgP1:'over 140 children'},impact:{childrenValue:'140',children:'Children supported'},contact:{intro:'Scan the contact QR.'}},'en');
 const selected=selectCandidates([...sources,...Array.from({length:100},(_,i)=>({id:'event'+i,title:'How can Little Green Leaves help',text:'Historical event',url:'/our-efforts?event='+i}))],'How can I contact Little Green Leaves?');
 assert.ok(selected.some(s=>s.url==='/contact'));
 assert.ok(sources.some(s=>s.text.includes('over 140')));
 assert.ok(sources.some(s=>s.text.includes('140\nChildren supported')));
 assert.ok(selected.length<=36);
});
