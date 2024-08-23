import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';
import './App.css';
import AnimatedRoutes from './components/animatedRoutes';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#099',
    },
    secondary: orange,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <AnimatedRoutes/>
    </ThemeProvider>
  );
}

export default App;
