import React, { forwardRef } from 'react';
import LandingTemplate from './landingTemplate';

const ToolDieShop = forwardRef((props, ref) => (
    <LandingTemplate
        ref={ref}
        header="Tool And Die Shop"
        description="Description"
        background="/toolshop.jpg"
        path='/chat?assistantChoice=Machinist'
    />
));

const ValueProp = forwardRef((props, ref) => (
    <LandingTemplate
        ref={ref}
        header="Value Prop Helper"
        description="Description"
        background="gray"
    />
));

const YoutubeGPT = forwardRef((props, ref) => (
    <LandingTemplate
        ref={ref}
        header="YoutubeGPT"
        description="A specialized AI assistant designed to efficiently identify and recommend Siemens YouTube videos tailored to specific user needs and contexts."
        background="black"
    />
));
const CaseStudyFinder = forwardRef((props, ref) => (
    <LandingTemplate
        ref= {ref}
        header= "Case Study Finder"
        description="A specialized AI assistant designed to help users find and present company-specific case studies."
        background= "gray"
        path='/chat?assistantChoice=Case_study_finder'
    />
));
export { ToolDieShop, ValueProp, YoutubeGPT, CaseStudyFinder};
