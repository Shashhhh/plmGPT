import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import LandingTemplate from './landingTemplate';
function ValueProp() {
    const navigate = useNavigate();

    return (
        <div>
            <LandingTemplate 
            header={"Value Prop Helper"} 
            description={"Description"}
            background={"linear-gradient(45deg, #ff8a00, #e52e71)"}/>
        </div>
    );
}
export default (ValueProp);