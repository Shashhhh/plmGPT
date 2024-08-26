import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function Avatars() {
  return (
    <Stack direction="row" spacing={50}>
        <Avatar 
            alt="Temp" 
            src="/jason_avatar.png"
            sx={{ width: '12rem', 
                height: '12rem',
                transform: 'rotate(-3deg)'
            }}
        />
        <Avatar 
            alt="Temp" 
            src="/vite.svg"
            sx={{ width: '7rem', height: '7rem' }}
        />
    </Stack>
    
  );
}