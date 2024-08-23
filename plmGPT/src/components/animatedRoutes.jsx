import React from 'react';
import {Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from '../pages/landingPage';
import {AnimatePresence} from 'framer-motion';
function AnimatedRoutes() {
const location = useLocation();
return (
    <AnimatePresence mode='wait'>
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage/>} />
    </Routes>
    </AnimatePresence>

);
}

export default AnimatedRoutes;
