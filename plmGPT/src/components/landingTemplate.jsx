import React, { forwardRef, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PillButton from './pillButton';
import '@styles/landingTemplate.css';
import { useNavigate } from 'react-router-dom';
import { spring } from '@components/animationVariants';

const LandingTemplate = forwardRef(({ header, description, background, path }, ref) => {
    const navigate = useNavigate();
    const r = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <div
            className='templateContainer'
            style={{
                background: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
            }}
            ref={ref}
        >
            <div className="overlay"></div> 
            <motion.div 
            className='textContainer'
            ref={r}
            initial="offscreen" 
            animate={isInView ? "onscreen" : "offscreen"}
            variants={spring} 
            >
                <h1 className='welcomeHeader'>
                    {header}
                </h1>
                <p className='helperText'>
                    {description}
                </p>
                <div className="buttonContainer">
                    <PillButton onClick={() => navigate(path)}>
                        TRY ME
                    </PillButton>
                </div>
            </motion.div>
        </div>
    );
});

export default LandingTemplate;
