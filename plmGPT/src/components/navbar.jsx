import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PillButton from './pillButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#1e1e1e',
    borderRadius: '15px', 
    boxShadow: 'rgb(38, 38, 38) 0px 1px 0px 0px inset', 
    border: '0.5px solid rgb(31, 31, 31)', 
    p: 2,
};

export default function ButtonAppBar({ scrollToSection, toolDieShopRef, valuePropRef, youtubeGPTRef, caseStudyFinderRef }) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };
    const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        '& .MuiTypography-root': {
            fontWeight: theme.typography.fontWeightBold,
        },
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
                <ListItem disablePadding>
                    <StyledListItemButton onClick={() => scrollToSection(youtubeGPTRef)}>
                        <ListItemText primary="YoutubeGPT" sx={{ textAlign: 'center' }} />
                    </StyledListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <StyledListItemButton onClick={() => scrollToSection(caseStudyFinderRef)}>
                        <ListItemText primary="Case Study Finder" sx={{ textAlign: 'center' }} />
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
                <AppBar 
                position="fixed" 
                color="transparent" enableColorOnDark
                sx= {{backdropFilter: 'blur(10px)'}}
                >
                    <Toolbar>
                        <img
                            src='/SE_Logo_White.png'
                            alt="Siemens Logo"
                            style={{
                                height: '1.5rem',
                                filter: 'brightness(0.8)',
                                marginRight: 'auto',
                            }}
                        />
                        <PillButton onClick={handleModalOpen}>
                            Contact
                        </PillButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            MenuListProps={{
                                onMouseLeave: handleMenuClose,
                            }}
                        >
                            <MenuItem onClick={handleMenuClose}>Item 1</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Item 2</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Item 3</MenuItem>
                        </Menu>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
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
                            backgroundColor: "transparent",
                            top: '64px',
                        },
                    }}
                >
                    {DrawerList}
                </Drawer>
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box sx={modalStyle}>
                        <h2 id="modal-title">Have a question, suggestion, or spotted a bug?</h2>
                        <p id="modal-description">
                        Feel free to reach out! Send an email to{' '}
                        <a href="mailto:linjay@umich.edu" style={{ color: '#099', textDecoration: 'none' }}>
                            linjay@umich.edu
                        </a>, and I'll get back to you as soon as possible.
                        </p>
                    </Box>
                </Modal>
            </Box>
        </ThemeProvider>
    );
}
