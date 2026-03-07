import { Card, Typography, styled } from "@mui/material";

export const StyledBookCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

export const StyledAuthorText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
}));
