import React from 'react';
import Gradient from '../components/shaderGradient';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import '@styles/landing.css';
import { TypeAnimation } from 'react-type-animation';
function Landing() {
    return (
        <div className='introContainer'>
            <Gradient />
            <div className='welcomeHeader'>
                <TypeAnimation
                    sequence={[
                        'Welcome to Siemens GPT',
                        1500,
                        'Smart. Efficient. AI-Driven.',
                        1000,
                        'Redefine Success with Siemens GPT',
                        1000,
                        'Streamline Your Workflow with AI',
                        1000,
                        'Enhance Your Sales Strategy',
                        1000,   
                        'Optimize Your Product Lifecycle',
                        1000,
                        'Empower Your Team with AI',
                        1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                />
            </div>
            <div className='scrollContainer'>
                <p className='scrollText'>
                    SCROLL FOR MORE
                </p>
                <ArrowDownwardIcon />
            </div>
        </div>
    );
}


export default Landing;
