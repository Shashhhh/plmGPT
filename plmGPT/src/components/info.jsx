import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import '@styles/info.css'
import InfoGradient from './infoShaderGradient';
import { Box} from '@mui/material';
const item = {
    beginning: { opacity: 0, y: -20 },
    final: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 1,
            ease: 'easeOut' 
        }
    }
};
function Info() {

    return (
        <div className='infoContainer'>
            <InfoGradient/>
            <motion.div variants={item} className='textContainer'>
            <h5 className='infoHeader'>
                Siemens AI Tools 
            </h5>
            <div className='infoTextContainer'>
                    <Box 
                    border={1}
                    padding={2} 
                    borderRadius={4} 
                    marginBottom={2}
                    sx={{width: 300, height: 200
                    }}
                    > 
                        <p>
                            used by 300 partners within the Siemens network.
                        </p>
                    </Box>
                    <Box 
                    border={1} 
                    padding={2} 
                    borderRadius={4}
                    sx={{width: 300, height: 200}}
                    > 
                        <p>
                            used across 5 continents
                        </p>
                    </Box>
                </div>
            </motion.div>
        
        </div>
    );
}
export default (Info);