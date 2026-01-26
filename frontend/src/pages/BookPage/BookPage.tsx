import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookCounter } from "../../components/BookCounter";
import { BookPageButtons, BookPageWrapper } from "./styles/BookPage.styled";

export const BookPage = () => {
  const navigate = useNavigate()

  const handleToHome = () => {
    console.log('navitage to home')
    navigate('/')
  }

  const handleToTest = () => {
    console.log('navitage to test')
    navigate('/test')
  }

  return (
    <BookPageWrapper>
      <Box>
        <Typography variant="h3">Book Page</Typography>
        <Typography variant="body1">This is the book page.</Typography>
      </Box>

      <BookCounter />

      <BookPageButtons>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleToHome}
        >
          Home
        </Button>

        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleToTest}
        >
          Test
        </Button>
      </BookPageButtons>
    </BookPageWrapper>
  );
}