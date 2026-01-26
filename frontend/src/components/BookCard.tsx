import { Typography, Chip } from '@mui/material';
import type { IBook } from '../types';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledChipsContainer,
} from './styles/BookCard.styled';

interface IBookCardProps {
  book: IBook;
  onClick: (book: IBook) => void;
}

export function BookCard({ book, onClick }: IBookCardProps) {
  const disponivel = book.quantidadeDisponivel !== undefined 
    ? book.quantidadeDisponivel > 0 
    : true;

  const renderAutor = () => {
    if (!book.autor) return null;

    return (
      <Typography variant="body2" color="text.secondary" noWrap>
        {book.autor}
      </Typography>
    );
  };

  const renderGenero = () => {
    if (!book.genero) return null;

    return <Chip label={book.genero} size="small" variant="outlined" />;
  };

  return (
    <StyledCard onClick={() => onClick(book)}>
      <StyledCardMedia image={book.imagemUrl} title={book.title}>
        {!book.imagemUrl && '📚'}
      </StyledCardMedia>
      <StyledCardContent>
        <Typography variant="h6" component="h3" gutterBottom noWrap>
          {book.title}
        </Typography>
        {renderAutor()}
        <StyledChipsContainer>
          <Chip
            label={disponivel ? 'Disponível' : 'Indisponível'}
            color={disponivel ? 'success' : 'error'}
            size="small"
          />
          {renderGenero()}
          <Chip label={`${book.pages} páginas`} size="small" variant="outlined" />
        </StyledChipsContainer>
      </StyledCardContent>
    </StyledCard>
  );
}
