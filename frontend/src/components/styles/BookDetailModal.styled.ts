import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledLoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 300,
});

export const StyledBookImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: 400,
  objectFit: 'contain',
  borderRadius: theme.shape.borderRadius,
}));

export const StyledChipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
}));

export const StyledContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));
