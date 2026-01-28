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

  const formatGenre = (genre: string): string => {
    const genreMap: Record<string, string> = {
      'SCIENCE_FICTION': 'Ficção Científica',
      'FANTASY': 'Fantasia',
      'COMICS': 'Quadrinhos',
      'MANGA': 'Mangá',
      'HORROR': 'Terror',
      'ROMANCE': 'Romance',
      'BIOGRAPHY': 'Biografia',
      'TECHNICAL': 'Técnico',
      'OTHER': 'Outro',
    };
    return genreMap[genre] || genre;
  };

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

    return <Chip label={formatGenre(book.genre)} variant="outlined" color="primary" />;
  };

  const renderIsbn = () => {
    if (!book?.isbn) return null;

    return <Chip label={`ISBN: ${book.isbn}`} variant="outlined" color="default" />;
  };

  const renderSummary = () => {
    if (!book) return null;

    return (
      <>
        <Typography variant="h6" gutterBottom>
          Resumo
        </Typography>
        {book.summary ? (
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
            {book.summary}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            Resumo não disponível
          </Typography>
        )}
      </>
    );
  };

  const renderQuantities = () => {
    if (!book) return null;

    const hasQuantities =
      book.totalQuantity !== undefined || book.availableQuantity !== undefined;

    if (!hasQuantities) return null;

    const available = book.availableQuantity ?? 0;
    const total = book.totalQuantity ?? 0;
    const borrowed = total - available;

    return (
      <>
        <Divider />
        <StyledContentContainer>
          <Typography variant="h6" gutterBottom>
            Disponibilidade
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            <strong>{available}</strong> de <strong>{total}</strong> exemplares disponíveis
          </Typography>
          {borrowed > 0 && (
            <Typography variant="body2" color="text.secondary">
              {borrowed} {borrowed === 1 ? 'exemplar emprestado' : 'exemplares emprestados'}
            </Typography>
          )}
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
                label={
                  isAvailable 
                    ? `Disponível (${book.availableQuantity})` 
                    : 'Indisponível'
                }
                color={isAvailable ? 'success' : 'error'}
                size="medium"
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
