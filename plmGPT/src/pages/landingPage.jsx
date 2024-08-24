import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '@styles/landingPage.css';
import { motion } from 'framer-motion';
import Landing from '../components/landing';
import ButtonAppBar from '../components/navbar';
import Info from '../components/info';
import ToolDieShop from '../components/toolDieShop';
import ValueProp from '../components/valueProp';
const container = {
    beginning: {},
    final: { 
        transition: { 
            staggerChildren: 0.3
        } 
    },
    exit: { opacity: 0 }
};

const item = {
    beginning: { opacity: 0, y: -20 },
    final: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 1,
            ease: 'easeOut' 
        }
    }
};

function LandingPage() {
    const navigate = useNavigate();

    return (
        <motion.div 
            variants={container}
            initial="beginning"
            animate="final"
            exit="exit"
        >
        <ButtonAppBar/>
        <Landing/>
        <Info/>
        <ToolDieShop/>
        <ValueProp/>
        </motion.div>
    );
}
export default (LandingPage);