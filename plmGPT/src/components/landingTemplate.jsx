import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import PillButton from './pillButton';
import '@styles/landingTemplate.css';
import { useNavigate } from 'react-router-dom';

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

const LandingTemplate = forwardRef(({ header, description, background, path }, ref) => {
    const navigate = useNavigate();
    
    return (
        <div
            className='templateContainer'
            style={{
                background:`url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            ref={ref}
        >
            <motion.div variants={item} className='textContainer'>
                <h1 className='welcomeHeader'>
                    {header}
                </h1>
                <p className='helperText'>
                    {description}
                </p>
                <div className="buttonContainer">
                    <PillButton onClick={() => navigate(`${path}?header=${encodeURIComponent(header)}`)}>
                        TRY ME
                    </PillButton>
                </div>
            </motion.div>
        </div>
    );
});

export default LandingTemplate;
