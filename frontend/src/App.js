import React, {lazy, Suspense} from 'react';
import SiteContentProvider from './services/SiteContentProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WebsiteChat from './components/WebsiteChat';
import {useLocation} from 'react-router-dom';

import OurEffortsSection from './pages/OurEffortsSection';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

const AdminPage = lazy(() => import('./admin/AdminPage'));

function PublicWebsiteChat(){
 const {pathname}=useLocation();
 return pathname==='/admin'||pathname.startsWith('/admin/')?null:<WebsiteChat/>;
}

function App() {
	return (
		<SiteContentProvider><Router>
			<Routes>
				<Route path='/admin/*' element={<Suspense fallback={<p role='status'>正在加载管理后台…</p>}><AdminPage /></Suspense>} />
				<Route path='/contact' element={<ContactUs />} />
				<Route path='/about' element={<AboutUs />} />
				<Route path='/our-efforts' element={<OurEffortsSection />} />
				<Route path='/' element={<Home />} />
			</Routes>
            <PublicWebsiteChat />
		</Router></SiteContentProvider>
	);
}

export default App;
