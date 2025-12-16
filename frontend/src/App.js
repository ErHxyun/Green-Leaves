import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OurEffortsSection from './pages/OurEffortsSection';
import AboutUs from './pages/AboutUs';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/about' element={<AboutUs />} />
				<Route path='/our-efforts' element={<OurEffortsSection />} />
				<Route path='/' element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
