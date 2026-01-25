import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeToggleButton } from "../../components/ThemeToggleButton";
import { BoxCounter } from "./BoxCounter";
import { TechLogos } from "./TechLogos";
import { HomeButtons, HomeWrapper } from "./styles/HomePage.styled";

export const HomePage = () => {  
  const handleOnClick = () => {
    console.log('navitage to book page')
  }

  return (
    <HomeWrapper>
      <TechLogos />
      <Typography variant="h3">Vite + React + Axios</Typography>
      <Typography variant="h4">React Query + Zustand + MUI</Typography>
      <BoxCounter />

      <HomeButtons>
        <ThemeToggleButton />

        <Link to={'/books'}>
          <Button variant="contained" color="primary" onClick={handleOnClick}>
            Books
          </Button>
        </Link>
      </HomeButtons>
    </HomeWrapper>
  );
}