import React from 'react';
import {render,screen,fireEvent,waitFor} from '@testing-library/react';
import {act} from 'react';
import TreeOfGrowthTimeline from './TreeOfGrowthTimeline';
import i18n from '../services/i18n';
jest.mock('framer-motion',()=>{
 const React=require('react');
 const cache={};
 return {AnimatePresence:({children})=>children,motion:new Proxy({}, {get:(_,tag)=>cache[tag]||(cache[tag]=React.forwardRef(({children,initial,animate,exit,whileInView,viewport,transition,whileHover,whileTap,layout,...props},ref)=>React.createElement(tag,{...props,ref},children)))})};
});
beforeEach(async()=>{await act(async()=>i18n.changeLanguage('en'));});
test('renders built-in timeline when backend is unavailable',async()=>{
 global.fetch=jest.fn().mockRejectedValue(new Error('offline'));
 render(<TreeOfGrowthTimeline/>);
 expect(await screen.findByText('Latest content is unavailable. Showing existing stories.')).toBeInTheDocument();
 expect(screen.getByText('Planting the First Seed')).toBeInTheDocument();
 expect(screen.getByRole('button',{name:/First Park Book Donation/})).toBeInTheDocument();
});
test('valid empty API response stays empty instead of republishing built-in events',async()=>{
 global.fetch=jest.fn(async()=>({ok:true,json:async()=>({data:[]})}));
 render(<TreeOfGrowthTimeline/>);
 expect(await screen.findByText('No published stories yet.')).toBeInTheDocument();
 expect(screen.queryByText('Planting the First Seed')).not.toBeInTheDocument();
});
test('shows API block order, stable IDs and reloads translated content',async()=>{
 global.fetch=jest.fn(async url=>({ok:true,json:async()=>({data:[{year:2025,icon:'Leaf',title:'API Year',summary:'Summary',events:[{id:'stable-event',slug:'slug',title:url.includes('lang=cn')?'中文活动':'API Event',detailBlocks:[{id:'b2',type:'text',content:'Second first'},{id:'b1',type:'text',content:'First second'}]}]}]})}));
 render(<TreeOfGrowthTimeline/>);
 fireEvent.click(await screen.findByRole('button',{name:'API Event'}));
 const first=screen.getByText('Second first'),second=screen.getByText('First second');
 expect(first.compareDocumentPosition(second)&Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
 await act(async()=>i18n.changeLanguage('cn'));
 expect(await screen.findByRole('button',{name:'中文活动'})).toBeInTheDocument();
 await waitFor(()=>expect(screen.queryByText('Second first')).not.toBeInTheDocument());
});
