import { createTheme } from "@mui/material";

// https://mui.com/material-ui/customization/default-theme/
// Dashboard theme baseado na imagem de referência

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6C5DD3', // Roxo principal
      light: '#8777D9',
      dark: '#5A4DB8',
    },
    secondary: {
      main: '#FF6B9D', // Rosa/coral
      light: '#FF8FB5',
      dark: '#E85788',
    },
    success: {
      main: '#00C48C', // Verde para status DEVOLVIDO
    },
    error: {
      main: '#FF5757', // Vermelho para status ATRASADO
    },
    info: {
      main: '#0095FF', // Azul para status ATIVO
    },
    warning: {
      main: '#FFA26B',
    },
    background: {
      default: '#F5F5FA', // Lavanda claro
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748',
      secondary: '#718096',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(108, 93, 211, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2D3748',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E2E8F0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8777D9',
      light: '#9B8FE0',
      dark: '#6C5DD3',
    },
    secondary: {
      main: '#FF8FB5',
      light: '#FFA8C5',
      dark: '#FF6B9D',
    },
    success: {
      main: '#00D9A5',
    },
    error: {
      main: '#FF6B6B',
    },
    info: {
      main: '#4DA8FF',
    },
    warning: {
      main: '#FFB27D',
    },
    background: {
      default: '#1A1A2E',
      paper: '#252540',
    },
    text: {
      primary: '#F7FAFC',
      secondary: '#CBD5E0',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#252540',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#252540',
          borderRight: '1px solid #3D3D5C',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});
