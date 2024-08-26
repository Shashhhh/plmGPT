import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Avatars() {
    return (
        <Stack direction="row" spacing={15} justifyContent="center">
            <Card sx={{ 
                width: 300,
                height: 500,
                display: 'flex', 
                alignItems: 'center',  
                flexDirection: 'column',
            }}>
                <Avatar 
                    alt="Temp" 
                    src="/jason_avatar.png"
                    sx={{ 
                        width: '12rem', 
                        height: '12rem',
                        transform: 'rotate(-3deg)',
                        mt: 3,
                    }}
                />
                <CardContent>
                    <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="div" 
                        sx={{ textAlign: 'center' }}
                    >
                        Jason Lin
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ 
                width: 300,
                height: 500,
                display: 'flex', 
                alignItems: 'center',  
                flexDirection: 'column',
            }}>
                <Avatar 
                    alt="Temp" 
                    src="/jason_avatar.png"
                    sx={{ 
                        width: '12rem', 
                        height: '12rem',
                        transform: 'rotate(-3deg)',
                        mt: 3,
                    }}
                />
                <CardContent>
                    <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="div" 
                        sx={{ textAlign: 'center' }}
                    >
                        Thomas King
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </Card>
        </Stack>
    );
}
