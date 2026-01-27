import { CircularProgress, Typography, Button, Chip, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetBookById } from "../../hooks/useBooks";
import { BookDetailsCard, BookDetailsHeader, BookDetailsInfo, BookDetailsWrapper } from "./styles/BookDetailsPage.styled";

export const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { book, isLoadingBook, isErrorBook, errorBook } = useGetBookById(Number(id));

  if (isLoadingBook) {
    return (
      <BookDetailsWrapper>
        <CircularProgress />
      </BookDetailsWrapper>
    );
  }

  if (isErrorBook || !book) {
    return (
      <BookDetailsWrapper>
        <Typography variant="h5" color="error">
          Erro ao carregar detalhes do livro: {errorBook?.message}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Voltar
        </Button>
      </BookDetailsWrapper>
    );
  }

  return (
    <BookDetailsWrapper>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
      >
        Voltar
      </Button>

      <BookDetailsCard>
        <BookDetailsHeader>
          <BookDetailsInfo>
            <Typography variant="h3" component="h1">
              {book.title}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {book.author || 'Autor desconhecido'}
            </Typography>
          </BookDetailsInfo>
        </BookDetailsHeader>

        {book.description && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Descrição
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {book.description}
            </Typography>
          </Box>
        )}

        {book.id && (
          <Box>
            <Chip label={`ID: ${book.id}`} variant="outlined" />
          </Box>
        )}
      </BookDetailsCard>
    </BookDetailsWrapper>
  );
};
