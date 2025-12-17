import { Box, Button, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookCounter } from "../../components/BookCounter";

const BookPageWrapper = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  padding: 25px;
`
const BookPageButtons = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const BookPage = () => {
  const navigate = useNavigate()

  const handleOnClick = () => {
    console.log('navitage to home')
    navigate('/')
  }

  return (
    <BookPageWrapper>
      <Box>
        <Typography variant="h3">Book Page</Typography>
        <Typography variant="body1">This is the book page.</Typography>
      </Box>

      <BookCounter />

      <BookPageButtons>
        <Button variant="contained" color="secondary" onClick={handleOnClick}>
          Home
        </Button>
      </BookPageButtons>
    </BookPageWrapper>
  );
}