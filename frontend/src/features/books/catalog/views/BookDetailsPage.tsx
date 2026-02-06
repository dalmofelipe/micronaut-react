import { CircularProgress, Typography, Chip, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetBookById } from "../../shared/hooks/useBooks";
import {
  BookDetailsCard,
  BookDetailsHeader,
  BookDetailsInfo,
  BookDetailsWrapper,
  StyledBackButton,
  StyledErrorBackButton
} from "../styles/BookDetailsPage.styled";

export const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: book,
    isLoading: isLoadingBook,
    isError: isErrorBook,
    error: errorBook
  } = useGetBookById(id || "");

  const renderLoading = () => {
    if (!isLoadingBook) return null;

    return (
      <BookDetailsWrapper>
        <CircularProgress />
      </BookDetailsWrapper>
    );
  };

  const renderError = () => {
    if (!isErrorBook && book) return null;

    return (
      <BookDetailsWrapper>
        <Typography variant="h5" color="error">
          Erro ao carregar detalhes do livro: {errorBook?.message}
        </Typography>
        <StyledErrorBackButton
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Voltar
        </StyledErrorBackButton>
      </BookDetailsWrapper>
    );
  };

  const renderDescription = () => {
    if (!book?.description) return null;

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Descrição
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {book.description}
        </Typography>
      </Box>
    );
  };

  const renderBookId = () => {
    if (!book?.id) return null;

    return (
      <Box>
        <Chip label={`ID: ${book.id}`} variant="outlined" />
      </Box>
    );
  };

  return (
    <>
      {renderLoading()}
      {renderError()}
      {book && (
        <BookDetailsWrapper>
          <StyledBackButton
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
          >
            Voltar
          </StyledBackButton>

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

            {renderDescription()}
            {renderBookId()}
          </BookDetailsCard>
        </BookDetailsWrapper>
      )}
    </>
  );
};
