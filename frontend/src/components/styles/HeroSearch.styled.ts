import { Box, styled, TextField } from "@mui/material";

export const HeroContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(6, 0),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

export const HeroTitle = styled(Box)(({
  textAlign: 'center',
  maxWidth: 600,
}));

export const SearchField = styled(TextField)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
  },
}));
