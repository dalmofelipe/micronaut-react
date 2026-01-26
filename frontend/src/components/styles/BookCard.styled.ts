import { Card, CardContent, CardMedia, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

export const StyledCardMedia = styled(CardMedia)({
  height: 240,
  backgroundColor: '#e0e0e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '3rem',
  color: '#9e9e9e',
});

export const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const StyledChipsContainer = styled(Box)({
  display: 'flex',
  gap: '8px',
  marginTop: 'auto',
  flexWrap: 'wrap',
});
