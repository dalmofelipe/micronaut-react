import { Paper, styled } from "@mui/material";

export const BookCounterRoot = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  gap: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.25),
}));

export const BookCounterSection = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1.25),
}));
