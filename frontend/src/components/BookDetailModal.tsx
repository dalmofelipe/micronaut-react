import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useGetBookById } from '../hooks/useBooks';
import {
  StyledLoadingContainer,
  StyledBookImage,
  StyledChipsContainer,
  StyledContentContainer,
} from './styles/BookDetailModal.styled';

interface IBookDetailModalProps {
  bookId: number | null;
  open: boolean;
  onClose: () => void;
}

export function BookDetailModal({ bookId, open, onClose }: IBookDetailModalProps) {
  const { 
    book, 
    isLoadingBook: isLoading, 
    errorBook: error 
  } = useGetBookById(bookId ?? 0);

  const isAvailable = book?.availableQuantity !== undefined 
    ? book.availableQuantity > 0 
    : true;

  const renderLoading = () => (
    <StyledLoadingContainer>
      <CircularProgress />
    </StyledLoadingContainer>
  );

  const renderError = () => (
    <DialogContent>
      <Alert severity="error">Erro ao carregar detalhes do livro</Alert>
    </DialogContent>
  );

  const renderBookImage = () => {
    if (!book?.imageUrl) return null;

    return <StyledBookImage src={book.imageUrl} alt={book.title} />;
  };

  const renderAuthor = () => {
    if (!book?.author) return null;

    return (
      <Typography variant="subtitle1" color="text.secondary">
        {book.author}
      </Typography>
    );
  };

  const renderGenre = () => {
    if (!book?.genre) return null;

    return <Chip label={book.genre} variant="outlined" />;
  };

  const renderIsbn = () => {
    if (!book?.isbn) return null;

    return <Chip label={`ISBN: ${book.isbn}`} variant="outlined" />;
  };

  const renderSummary = () => {
    if (!book) return null;

    if (book.summary) {
      return (
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {book.summary}
        </Typography>
      );
    }

    return (
      <Typography variant="body2" color="text.secondary" fontStyle="italic">
        Resumo não disponível
      </Typography>
    );
  };

  const renderQuantities = () => {
    if (!book) return null;

    const hasQuantities =
      book.totalQuantity !== undefined || book.availableQuantity !== undefined;

    if (!hasQuantities) return null;

    return (
      <>
        <Divider />
        <StyledContentContainer>
          <Typography variant="body2" color="text.secondary">
            Quantidade Total: {book.totalQuantity ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Disponíveis: {book.availableQuantity ?? 'N/A'}
          </Typography>
        </StyledContentContainer>
      </>
    );
  };

  const renderContent = () => {
    if (!book) return null;

    return (
      <>
        <DialogTitle>
          <Typography variant="h5" component="div">
            {book.title}
          </Typography>
          {renderAuthor()}
        </DialogTitle>

        <DialogContent dividers>
          <StyledContentContainer>
            {renderBookImage()}

            <StyledChipsContainer>
              <Chip
                label={isAvailable ? 'Disponível' : 'Indisponível'}
                color={isAvailable ? 'success' : 'error'}
              />
              {renderGenre()}
              {renderIsbn()}
              <Chip label={`${book.pages} páginas`} variant="outlined" />
            </StyledChipsContainer>

            <Divider />

            {renderSummary()}

            {renderQuantities()}
          </StyledContentContainer>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Fechar</Button>
          <Button variant="contained" disabled={!isAvailable}>
            {isAvailable ? 'Solicitar Empréstimo' : 'Indisponível'}
          </Button>
        </DialogActions>
      </>
    );
  };

  const renderDialogContent = () => {
    if (isLoading) return renderLoading();
    if (error) return renderError();
    return renderContent();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {renderDialogContent()}
    </Dialog>
  );
}
