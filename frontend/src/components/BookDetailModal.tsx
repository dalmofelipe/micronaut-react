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

  const disponivel = book?.quantidadeDisponivel !== undefined 
    ? book.quantidadeDisponivel > 0 
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
    if (!book?.imagemUrl) return null;

    return <StyledBookImage src={book.imagemUrl} alt={book.title} />;
  };

  const renderAutor = () => {
    if (!book?.autor) return null;

    return (
      <Typography variant="subtitle1" color="text.secondary">
        {book.autor}
      </Typography>
    );
  };

  const renderGenero = () => {
    if (!book?.genero) return null;

    return <Chip label={book.genero} variant="outlined" />;
  };

  const renderIsbn = () => {
    if (!book?.isbn) return null;

    return <Chip label={`ISBN: ${book.isbn}`} variant="outlined" />;
  };

  const renderResumo = () => {
    if (!book) return null;

    if (book.resumo) {
      return (
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {book.resumo}
        </Typography>
      );
    }

    return (
      <Typography variant="body2" color="text.secondary" fontStyle="italic">
        Resumo não disponível
      </Typography>
    );
  };

  const renderQuantidades = () => {
    if (!book) return null;

    const hasQuantidades =
      book.quantidadeTotal !== undefined || book.quantidadeDisponivel !== undefined;

    if (!hasQuantidades) return null;

    return (
      <>
        <Divider />
        <StyledContentContainer>
          <Typography variant="body2" color="text.secondary">
            Quantidade Total: {book.quantidadeTotal ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Disponíveis: {book.quantidadeDisponivel ?? 'N/A'}
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
          {renderAutor()}
        </DialogTitle>

        <DialogContent dividers>
          <StyledContentContainer>
            {renderBookImage()}

            <StyledChipsContainer>
              <Chip
                label={disponivel ? 'Disponível' : 'Indisponível'}
                color={disponivel ? 'success' : 'error'}
              />
              {renderGenero()}
              {renderIsbn()}
              <Chip label={`${book.pages} páginas`} variant="outlined" />
            </StyledChipsContainer>

            <Divider />

            {renderResumo()}

            {renderQuantidades()}
          </StyledContentContainer>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Fechar</Button>
          <Button variant="contained" disabled={!disponivel}>
            {disponivel ? 'Solicitar Empréstimo' : 'Indisponível'}
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
