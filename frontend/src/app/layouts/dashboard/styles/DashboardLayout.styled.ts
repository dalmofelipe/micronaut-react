import { Box, styled } from '@mui/material';

// const DRAWER_WIDTH = 240;

export const StyledDashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

export const StyledMainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  margin: '64px auto 0 auto',
  width: '100%',
  maxWidth: '1200px',
  minHeight: 'calc(100vh - 64px)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));
