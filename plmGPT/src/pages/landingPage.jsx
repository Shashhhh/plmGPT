import React, { useRef } from 'react';
import ButtonAppBar from '../components/navbar';
import Landing from '../components/landing';
import Info from '../components/info';
import About from '../components/about';
import { ToolDieShop, ValueProp, YoutubeGPT, CaseStudyFinder } from '../components/landingComponents';

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
        <div 
        >
            <ButtonAppBar 
                scrollToSection={scrollToSection} 
                toolDieShopRef={toolDieShopRef} 
                valuePropRef={valuePropRef}
                youtubeGPTRef={youtubeGPTRef}
                caseStudyFinderRef={caseStudyFinderRef} 
            />
            <Landing/>
            <Info/>
            <ToolDieShop ref={toolDieShopRef} />
            <ValueProp ref={valuePropRef} />
            <YoutubeGPT ref = {youtubeGPTRef}/>
            <CaseStudyFinder ref={caseStudyFinderRef}/>
            <About/>
        </div>
    );
}

export default LandingPage;
