import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeToggleButton } from "../../components/ThemeToggleButton";
import { BoxCounter } from "./BoxCounter";
import { TechLogos } from "./TechLogos";
import { TestButtons, TestWrapper } from "./styles/TestPage.styled";

export const TestPage = () => {
  const handleOnClick = () => {
    console.log('navitage to book page')
  }

  return (
    <TestWrapper>
      <TechLogos />
      <Typography variant="h3">Vite + React + Axios</Typography>
      <Typography variant="h4">React Query + Zustand + MUI</Typography>
      <BoxCounter />

      <TestButtons>
        <ThemeToggleButton />

        <Link to={'/books'}>
          <Button variant="contained" color="primary" onClick={handleOnClick}>
            Books
          </Button>
        </Link>
      </TestButtons>
    </TestWrapper>
  );
}