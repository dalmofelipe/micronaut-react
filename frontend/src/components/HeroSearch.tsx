import { Typography } from "@mui/material";
import { HeroContainer, HeroTitle, SearchField, StyledSearchIcon } from "./styles/HeroSearch.styled";

interface IHeroSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const HeroSearch = ({ searchTerm, onSearchChange }: IHeroSearchProps) => {
  return (
    <HeroContainer>
      <HeroTitle>
        <Typography color="primary" variant="h3" gutterBottom>
          Bem-vindo à Biblioteca
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore nossa coleção e encontre seu próximo livro favorito
        </Typography>
      </HeroTitle>

      <SearchField
        fullWidth
        placeholder="Buscar por título ou autor..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: <StyledSearchIcon />
          }
        }}
      />
    </HeroContainer>
  );
};
