import { createTheme } from "@mui/material";

// https://mui.com/material-ui/customization/default-theme/

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#d3d6d9',
    },
     primary: {
      main: '#fc5c6c',
    },
  },
  typography: {
    fontFamily: 'Open Sans'
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff8772',
    },
    secondary: {
      main: '#b7cc00'
    },
    info: {
      main: '#00cfe2'
    },
    background: {
      default: '#121212',
    }
  },
  typography: {
    fontFamily: 'Montserrat'
  }
});
