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
                        {inView && <CountUp className="count" start={0} end={450} duration={3} suffix="+"/>}
                        <p>
                            USED BY <span>450+</span> PARTNERS PROFESSIONALS
                        </p>
                    </div>  
                    <div className='statContainer'>
                        {inView && <CountUp className="count" start={0} end={27} duration={3} suffix="%"/>}
                        <p>
                            INCREASED SALES PROFESSIONALS BANDWIDTH BY OVER  <span>27%</span> 
                        </p>
                    </div>
                    <div className='statContainer'>
                        {inView && <CountUp className="count" start={0} end={5} duration={3}/>}
                        <p>
                            USED IN <span>5</span> DIFFERENT COUNTRIES
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Info;
