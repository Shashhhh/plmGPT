import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '@styles/info.css';
import CountUp from 'react-countup';

function Info() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 1,
    });

    return (
        <div className='infoContainer'>
            <motion.div 
                ref={ref} 
                initial="beginning" 
                animate={inView ? 'final' : 'beginning'} 
                className='textContainer'
            >
                <div className='infoTextContainer'>
                    <div className='statContainer'>
                        {inView && <CountUp className="count" start={0} end={300} duration={3}/>}
                        <p>
                            USED BY 300 PARTNERS IN THE SIEMENS NETWORK
                        </p>
                    </div>  
                    <div className='statContainer'>
                        {inView && <CountUp className="count" start={0} end={5} duration={3}/>}
                        <p>
                            USED IN 5 DIFFERENT COUNTRIES
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Info;
