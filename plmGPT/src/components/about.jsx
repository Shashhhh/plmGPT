import React from 'react';
import { motion } from 'framer-motion';
import '@styles/about.css'
import Avatars from './avatars';
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

function About() {

    return (
        <div className='aboutContainer'>
            <motion.div variants={item} className='textContainer'>
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