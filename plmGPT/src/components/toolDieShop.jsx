import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import LandingTemplate from './landingTemplate';
function ToolDieShop() {
    const navigate = useNavigate();

    return (
        <div>
            <LandingTemplate header={"Tool And Die Shop"} description={"Description"}/>
        </div>
    );
}
export default (ToolDieShop);