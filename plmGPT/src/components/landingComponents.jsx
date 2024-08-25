import React, { forwardRef } from 'react';
import LandingTemplate from './landingTemplate';

const ToolDieShop = forwardRef((props, ref) => (
    <LandingTemplate
        ref={ref}
        header="Tool And Die Shop"
        description="Description"
        background="black"
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
        description="Description"
        background="black"
    />
));
const CaseStudyFinder = forwardRef((props, ref) => (
    <LandingTemplate
        ref= {ref}
        header= "Case Study Finder"
        description="Description"
        background= "gray"
    />
));
export { ToolDieShop, ValueProp, YoutubeGPT, CaseStudyFinder};
