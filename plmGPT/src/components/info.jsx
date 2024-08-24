import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import '@styles/info.css'

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
            <motion.div variants={item} className='textContainer'>
            <h5 className='infoHeader'>
                Info Page
            </h5>
            <div className='infoTextContainer'>
            <p>
                stat 1
            </p>
            <p>
                stat 2
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