import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

export default function ButtonAppBar({ scrollToSection, toolDieShopRef, valuePropRef }) {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    }));

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <StyledListItemButton onClick={() => scrollToSection(toolDieShopRef)}>
                        <ListItemText primary="Tool and Die Shop" sx={{ textAlign: 'center' }} />
                    </StyledListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <StyledListItemButton onClick={() => scrollToSection(valuePropRef)}>
                        <ListItemText primary="Value Prop Helper" sx={{ textAlign: 'center' }} />
                    </StyledListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const darkTheme = createTheme({
        typography: {
            fontFamily: 'Inter',
            fontWeightLight: 400,
            fontWeightRegular: 500,
            fontWeightMedium: 600,
            fontWeightBold: 700,
        },
        palette: {
            mode: 'dark',
            primary: {
                main: '#000000',
            },
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ width: '100%' }}>
                <AppBar position="fixed" color="transparent" enableColorOnDark >
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
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={toggleDrawer(false)}
                    sx={{
                        top: '64px',
                        '& .MuiDrawer-paper': {
                            backgroundColor: "black",
                            top: '64px', 
                        },
                    }}
                >
                    {DrawerList}
                </Drawer>
            </Box>
        </ThemeProvider>
    );
}
