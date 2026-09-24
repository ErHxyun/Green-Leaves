import React from 'react';
import {render,screen,fireEvent,waitFor} from '@testing-library/react';
import WebsiteChat from './WebsiteChat';
import {askWebsite} from '../services/contentApi';
jest.mock('../services/contentApi',()=>({contentLanguage:l=>l==='cn'?'cn':'en',askWebsite:jest.fn()}));
jest.mock('react-i18next',()=>({useTranslation:()=>({i18n:{language:'cn'},t:(_key,options)=>options.defaultValue})}));
test('opens, asks, displays plain source text and source link',async()=>{
 askWebsite.mockResolvedValue({answer:'官网原文',sources:[{id:'s1',title:'活动',text:'捐赠140本书',url:'/our-efforts?event=test'}]});
 render(<WebsiteChat/>);fireEvent.click(screen.getByRole('button',{name:'问问小绿叶'}));
 fireEvent.click(screen.getByRole('button',{name:'小绿叶是什么组织？'}));
 expect(await screen.findByText('捐赠140本书')).toBeInTheDocument();
 expect(screen.getByRole('link',{name:/查看来源/})).toHaveAttribute('href','/our-efforts?event=test');
 expect(askWebsite.mock.calls[0][1]).toBe('cn');
});
test('shows quota error and keeps contact link usable',async()=>{
 askWebsite.mockRejectedValue(Object.assign(new Error('limited'),{status:429}));
 render(<WebsiteChat/>);fireEvent.click(screen.getByRole('button',{name:'问问小绿叶'}));
 fireEvent.click(screen.getByRole('button',{name:'如何联系你们？'}));
 await waitFor(()=>expect(screen.getByRole('alert')).toHaveTextContent('额度'));
 expect(screen.getByRole('link',{name:'联系小绿叶'})).toHaveAttribute('href','/contact');
});

test('uses a single minimize control and sends both sides of the conversation',async()=>{
 askWebsite.mockReset();
 askWebsite.mockResolvedValue({answer:'你好！今天想聊什么？',sources:[]});
 render(<WebsiteChat/>);
 fireEvent.click(screen.getByRole('button',{name:'问问小绿叶'}));
 expect(screen.queryByRole('button',{name:'关闭',exact:true})).not.toBeInTheDocument();
 const input=screen.getByRole('textbox',{name:'聊天消息'});
 fireEvent.change(input,{target:{value:'你好'}});
 fireEvent.click(screen.getByRole('button',{name:'发送'}));
 await screen.findByText('你好！今天想聊什么？');
 await waitFor(()=>expect(input).not.toBeDisabled());
 fireEvent.change(input,{target:{value:'给我一个志愿服务点子'}});
 fireEvent.click(screen.getByRole('button',{name:'发送'}));
 expect(askWebsite.mock.calls[1][2]).toEqual([{role:'user',content:'你好'},{role:'assistant',content:'你好！今天想聊什么？'}]);
 await waitFor(()=>expect(input).not.toBeDisabled());
 fireEvent.click(screen.getByRole('button',{name:'收起聊天'}));
 expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
 fireEvent.click(screen.getByRole('button',{name:'问问小绿叶'}));
 expect(screen.getByText('给我一个志愿服务点子')).toBeInTheDocument();
 fireEvent.keyDown(screen.getByRole('dialog'),{key:'Escape'});
 expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
