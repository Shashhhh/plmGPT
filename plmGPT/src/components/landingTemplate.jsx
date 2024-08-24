import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import PillButton from './pillButton';
import '@styles/landingTemplate.css'

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

function LandingTemplate({ header , description, background }) {
    const navigate = useNavigate();

    return (
        <div className='templateContainer' style={{ background }}>
            <motion.div variants={item} className='textContainer'>
                <h1 className='welcomeHeader'>
                    {header}
                </h1>
                <p className='helperText'>
                    {description}
                </p>
                <div className="buttonContainer">
                    <PillButton>
                        TRY ME
                    </PillButton>
                </div>
            </motion.div>
        
        </div>
    );
}
export default (LandingTemplate);