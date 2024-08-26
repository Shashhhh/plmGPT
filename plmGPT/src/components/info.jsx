import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import '@styles/info.css'
import InfoGradient from './infoShaderGradient';
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

function Info() {
    const navigate = useNavigate();

    return (
        <div className='infoContainer'>
            <InfoGradient/>
            <motion.div variants={item} className='textContainer'>
            <h5 className='infoHeader'>
                Info Page
            </h5>
            <div className='infoTextContainer'>
            <p>
                AI tools used 300 partners within the Siemens network.
            </p>
            <p>
                Used across 5 countinents
            </p>
            <p>
                stat 3
            </p>
            </div>
            </motion.div>
        
        </div>
    );
}
export default (Info);