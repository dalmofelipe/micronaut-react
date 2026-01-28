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
  const isAvailable = book.availableQuantity !== undefined 
    ? book.availableQuantity > 0 
    : true;

  const renderAuthor = () => {
    if (!book.author) return null;

    return (
      <Typography variant="body2" color="text.secondary" noWrap>
        {book.author}
      </Typography>
    );
  };

  const renderGenre = () => {
    if (!book.genre) return null;

    return <Chip label={book.genre} size="small" variant="outlined" />;
  };

  return (
    <StyledCard onClick={() => onClick(book)}>
      <StyledCardMedia image={book.imageUrl} title={book.title}>
        {!book.imageUrl && '📚'}
      </StyledCardMedia>
      <StyledCardContent>
        <Typography variant="h6" component="h3" gutterBottom noWrap>
          {book.title}
        </Typography>
        {renderAuthor()}
        <StyledChipsContainer>
          <Chip
            label={isAvailable ? 'Disponível' : 'Indisponível'}
            color={isAvailable ? 'success' : 'error'}
            size="small"
          />
          {renderGenre()}
          <Chip label={`${book.pages} páginas`} size="small" variant="outlined" />
        </StyledChipsContainer>
      </StyledCardContent>
    </StyledCard>
  );
}
