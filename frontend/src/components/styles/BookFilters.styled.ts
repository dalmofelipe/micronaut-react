import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFilterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const StyledFilterHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StyledFilterTitle = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const StyledSidebar = styled(Box)(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  borderLeft: `1px solid ${theme.palette.divider}`,
  height: 'fit-content',
  position: 'sticky',
  top: 80,
}));
