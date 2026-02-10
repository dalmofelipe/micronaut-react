import { Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { StyledPageHeader } from "./styles/BooksPageHeader.styled";

interface BooksPageHeaderProps {
    onCreateClick: () => void;
}

export function BooksPageHeader({ onCreateClick }: BooksPageHeaderProps) {
    return (
        <StyledPageHeader>
            <Typography variant="h4" fontWeight={700}>
                Livros
            </Typography>
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={onCreateClick}
            >
                Novo Livro
            </Button>
        </StyledPageHeader>
    );
}
