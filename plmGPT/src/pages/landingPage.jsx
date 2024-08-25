import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ButtonAppBar from '../components/navbar';
import Landing from '../components/landing';
import Info from '../components/info';
import { ToolDieShop, ValueProp, YoutubeGPT, CaseStudyFinder } from '../components/landingComponents';

const container = {
    beginning: {},
    final: { 
        transition: { 
            staggerChildren: 0.3
        } 
    },
    exit: { opacity: 0 }
};

function LandingPage() {
    const toolDieShopRef = useRef(null);
    const valuePropRef = useRef(null);
    const youtubeGPTRef = useRef(null);
    const caseStudyFinderRef = useRef(null);

    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div 
            variants={container}
            initial="beginning"
            animate="final"
            exit="exit"
        >
            <ButtonAppBar scrollToSection={scrollToSection} 
                        toolDieShopRef={toolDieShopRef} 
                        valuePropRef={valuePropRef}
                        youtubeGPTRef={youtubeGPTRef}
                        caseStudyFinderRef={caseStudyFinderRef} />
            <Landing/>
            <Info/>
            <ToolDieShop ref={toolDieShopRef} />
            <ValueProp ref={valuePropRef} />
            <YoutubeGPT ref = {youtubeGPTRef}/>
            <CaseStudyFinder ref={caseStudyFinderRef}/>
        </motion.div>
    );
}

export default LandingPage;
