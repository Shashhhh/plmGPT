import React, {useRef} from 'react';
import { motion , useInView} from 'framer-motion';
import '@styles/about.css'
import Avatars from './avatars';
import {spring} from './animationVariants';

function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <div className='aboutContainer'>
            <motion.div 
            variants={spring} 
            className='textContainer'
            ref={ref}
            initial="offscreen" 
            animate={isInView ? "onscreen" : "offscreen"}>
            <h5 className='aboutHeader'>
                About Us
            </h5>
            <Avatars/>
            <div className='infoTextContainer'>
            </div>
            </motion.div>
        </div>
    );
}
export default About;