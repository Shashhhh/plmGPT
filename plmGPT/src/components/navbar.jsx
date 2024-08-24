import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#000000',
        },
    },
});

export default function ButtonAppBar() {
return (
    <ThemeProvider theme={darkTheme}>
    <Box sx={{ width: '100%' }}>
        <AppBar position="fixed" color="primary" enableColorOnDark sx={{ backgroundColor: 'black', boxShadow: 'none' }}>
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Siemens Logo
            </Typography>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            >
            <MenuIcon />
            </IconButton>
        </Toolbar>
        </AppBar>
     </Box>
    </ThemeProvider>
  );
}
