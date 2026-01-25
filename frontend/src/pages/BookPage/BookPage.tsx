import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookCounter } from "../../components/BookCounter";
import { BookPageButtons, BookPageWrapper } from "./styles/BookPage.styled";

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