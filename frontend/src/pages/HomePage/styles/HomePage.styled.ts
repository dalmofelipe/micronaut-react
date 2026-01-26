import { Box, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(8, 0, 6),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 0, 4),
  },
}));

export const HeroContent = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
});

export const HeroTitle = styled(Typography)({
  textAlign: 'center',
  fontWeight: 'bold',
});

export const HeroSubtitle = styled(Typography)({
  textAlign: 'center',
  opacity: 0.9,
});

export const StyledSearchField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
  },
}));

export const MainContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  alignItems: 'flex-start',
  marginBottom: theme.spacing(4),
  padding: '0 !important',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

export const BooksContainer = styled(Box)({
  flex: 1,
  minWidth: 0,
});

export const StyledBookGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));