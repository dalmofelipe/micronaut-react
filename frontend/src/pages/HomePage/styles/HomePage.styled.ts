import { Box, styled } from "@mui/material"

export const HomeWrapper = styled('div')({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: '25px 0',
  width: '100%',
})

export const HomeTitle = styled(Box)({
  textAlign: 'left',
  marginBottom: 16,
})

export const BooksGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: theme.spacing(3),
  width: '100%',
}))