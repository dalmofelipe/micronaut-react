import { Box, styled } from '@mui/material';

export const ListPageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

export const StatusBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#fff',
}));

export const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  // display: 'flex',
  gap: theme.spacing(0.5),
}));
