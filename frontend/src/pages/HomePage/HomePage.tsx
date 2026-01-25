import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeToggleButton } from "../../components/ThemeToggleButton";
import { HomeButtons, HomeWrapper } from "./styles/HomePage.styled";

export const HomePage = () => {
  return (
    <HomeWrapper>
      <Typography variant="h3">Vite + React + Axios</Typography>
      <Typography variant="h4">React Query + Zustand + MUI</Typography>

      <HomeButtons>
        <ThemeToggleButton />

        <Link to={'/books'}>
          <Button variant="contained" color="primary">
            Books
          </Button>
        </Link>
      </HomeButtons>
    </HomeWrapper>
  );
}