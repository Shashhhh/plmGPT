import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Gradient from '../components/shaderGradient';
import { motion } from 'framer-motion';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import '@styles/landing.css'

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

function Landing() {
    const navigate = useNavigate();

    return (
        <div className='introContainer'>
        <Gradient/>
            <div className='textContainer'>
                <motion.h1  variants={item}  className='welcomeHeader'>
                    THE SIEMENS GPT EXPERIENCE
                </motion.h1>
            <div className='scrollContainer'>
                <p className='scrollText'>
                        SCROLL FOR MORE
                </p>
                <ArrowDownwardIcon/>
            </div>
                
            </div>
        
        </div>
    );
}
export default (Landing);