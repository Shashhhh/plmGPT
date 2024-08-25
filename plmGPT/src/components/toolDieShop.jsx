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

export default ToolDieShop;
