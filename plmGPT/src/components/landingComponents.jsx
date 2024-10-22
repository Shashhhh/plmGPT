import React, { forwardRef } from 'react';
import LandingTemplate from './landingTemplate';

const ToolDieShop = forwardRef((props, ref) => (
    <LandingTemplate
        ref={ref}
        header="Tool And Die Shop"
        description="Learn about the tool and die business from a machinist with 30 years of experience in CAD/CAM, CNC, and mold design."
        background="/toolshop.jpg"
        path='/chat?assistantChoice=Machinist'
    />
));

const ValueProp = forwardRef((props, ref) => (
    <LandingTemplate
        ref={ref}
        header="Value Prop Helper"
        description="Get assistance in crafting compelling value propositions. Understand what makes your product stand out and how to effectively communicate its unique benefits to customers."
        background="/valuePropImg.png"
        path='/chat?assistantChoice=Value_prop'
    />
));

const YoutubeGPT = forwardRef((props, ref) => (
    <LandingTemplate
        ref={ref}
        header="YoutubeGPT"
        description="A specialized AI assistant designed to efficiently identify and recommend Siemens YouTube videos tailored to specific user needs and contexts."
        background="/youtubeGPTPic.jpg"
        path="/chat?assistantChoice=YoutubeGPT"
    />
));
const CaseStudyFinder = forwardRef((props, ref) => (
    <LandingTemplate
        ref= {ref}
        header= "Case Study Finder"
        description="A specialized AI assistant designed to help users find and present company-specific case studies."
        background= "/caseStudyPic.png"
        path='/chat?assistantChoice=Case_study_finder'
    />
));
export { ToolDieShop, ValueProp, YoutubeGPT, CaseStudyFinder};
