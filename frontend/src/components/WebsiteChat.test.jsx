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
