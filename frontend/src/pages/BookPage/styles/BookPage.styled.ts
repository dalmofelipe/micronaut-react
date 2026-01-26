import { Box, styled } from "@mui/material"

export const BookPageWrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "auto auto auto",
  gap: theme.spacing(2.5),
  width: "100%",
  maxWidth: 800,
  padding: "25px 0",
}))

export const BookPageButtons = styled('div')({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "15px",
})