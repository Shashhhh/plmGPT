import React from 'react';
import Gradient from '../components/shaderGradient';
import { motion, useInView } from 'framer-motion';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import '@styles/landing.css';
import { useRef } from 'react';
import { spring } from '../components/animationVariants';
function Landing() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div className='introContainer'>
            <Gradient />
            <div className='textContainer'>
                <motion.h1 
                    ref={ref}
                    initial="offscreen" 
                    animate={isInView ? "onscreen" : "offscreen"}
                    variants={spring} 
                    className='welcomeHeader'
                >
                    SIEMENS GPT EXPERIENCE
                </motion.h1>
                <div className='scrollContainer'>
                    <p className='scrollText'>
                        SCROLL FOR MORE
                    </p>
                    <ArrowDownwardIcon />
                </div>
            </div>
        </div>
    );
}

export default Landing;
