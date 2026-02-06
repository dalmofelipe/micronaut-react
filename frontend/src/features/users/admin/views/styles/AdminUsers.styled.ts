import { styled, Paper, Box } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(2),
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
}));

export const FilterContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const PageHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
}));
