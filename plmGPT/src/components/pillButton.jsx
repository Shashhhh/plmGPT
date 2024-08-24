import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: 8,
  borderRadius: 25,
  width: 150,
  fontSize: 16,
  fontWeight: 'bold',
  backgroundColor: '#099',
  color: 'white',
  transition: 'background-color 0.3s, transform 0.3s, color 0.3s',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    transform: 'scale(1.05)',
    color: 'black',
  },
}));

function PillButton(props) {
  return <StyledButton variant="contained" {...props} />;
}

export default PillButton;
