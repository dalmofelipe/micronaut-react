import { Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

interface BooksPageHeaderProps {
    onCreateClick: () => void;
}

export function BooksPageHeader({ onCreateClick }: BooksPageHeaderProps) {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
        >
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
        </Box>
    );
}
