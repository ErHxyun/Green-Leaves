import {render,screen,waitFor,fireEvent} from '@testing-library/react';
import {act} from 'react';
import App from './App';
import i18n from './services/i18n';
beforeEach(async()=>{
 window.history.replaceState({},'', '/about');
 global.fetch=jest.fn(async url=>({ok:true,json:async()=>({resources:{about:{title:url.includes('lang=cn')?'数据库简介':'Database about'}}})}));
 await act(async()=>{await i18n.changeLanguage('en');});
});
afterEach(()=>jest.restoreAllMocks());
test('About page uses API i18next resources and re-fetches when language changes',async()=>{
 render(<App/>);
 expect(await screen.findByText('Database about')).toBeInTheDocument();
 fireEvent.click(screen.getByRole('button',{name:'中文'}));
 expect(await screen.findByText('数据库简介')).toBeInTheDocument();
 await waitFor(()=>expect(global.fetch.mock.calls.some(([url])=>url.includes('lang=cn'))).toBe(true));
 expect(screen.getAllByRole('link').some(link=>link.getAttribute('href')==='/contact')).toBe(true);
});
