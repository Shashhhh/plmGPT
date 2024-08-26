import React from 'react';
import {Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from '../pages/landingPage';
import {AnimatePresence} from 'framer-motion';
import Chat from '../pages/chatScreen';
function AnimatedRoutes() {
const location = useLocation();
return (
    <AnimatePresence mode='wait'>
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/chat" element= {<Chat/>}/>
    </Routes>
    </AnimatePresence>

);
}

export default AnimatedRoutes;
