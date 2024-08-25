import React, { forwardRef } from 'react';
import LandingTemplate from './landingTemplate';
const ValueProp= forwardRef((props, ref) => (
    <LandingTemplate
        ref={ref}
        header="Value Prop Helper"
        description="Description"
        background="gray"
    />
));

export default ValueProp;
