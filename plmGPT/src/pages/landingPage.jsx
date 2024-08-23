import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '@styles/landingPage.css';
import { motion } from 'framer-motion';
import Landing from '../components/landing';
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
            className='container' 
            variants={container}
            initial="beginning"
            animate="final"
            exit="exit"
        >
       <Landing/>
        </motion.div>
    );
}
export default (LandingPage);