import { Box, Paper, styled, Typography } from '@mui/material';

export const PageHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
}));

export const PageTitle = styled(Typography)({
    fontWeight: 700,
});

export const StyledPaper = styled(Paper)({
    width: '100%',
    overflow: 'hidden',
});

export const FilterContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));

export const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginTop: theme.spacing(1),
}));
