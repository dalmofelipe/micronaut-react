import { Search as SearchIcon } from '@mui/icons-material';
import { Alert, InputAdornment, Pagination, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { BookCard } from '../../components/BookCard';
import { BookDetailModal } from '../../components/BookDetailModal';
import { BookFilters } from '../../components/BookFilters';
import { BookListSkeleton } from '../../components/BookListSkeleton';
import { useGetAllBooks } from '../../hooks/useBooks';
import { useDebounce } from '../../hooks/useDebounce';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useBookFiltersStore } from '../../store/useBookFiltersStore';
import type { IBook } from '../../types';
import {
  BooksContainer,
  EmptyStateContainer,
  HeroContent,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
  MainContent,
  PaginationContainer,
  StyledBookGrid,
  StyledSearchField,
} from './styles/HomePage.styled';

const ITEMS_PER_PAGE = 10;

export const HomePage = () => {
  useQueryParams();

  const [searchInput, setSearchInput] = useState('');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const { filters, setSearch, setPage } = useBookFiltersStore();
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  const { allBooks = [], isLoadingAllBooks, errorAllBooks } = useGetAllBooks();

  const filteredBooks = useMemo(() => {
    return (allBooks || []).filter((book: IBook) => {
      const matchesSearch = !filters.search 
        || book.title.toLowerCase().includes(filters.search.toLowerCase());

      return matchesSearch;
    });
  }, [allBooks, filters.search]);

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = useMemo(() => {
    const startIndex = (filters.page - 1) * ITEMS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBooks, filters.page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters.page]);

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
  };

  const handleBookClick = (book: IBook) => {
    setSelectedBookId(book.id);
  };

  const renderHeroSection = () => (
    <HeroSection>
      <HeroContent maxWidth="md">
        <HeroTitle variant="h2">
          📚 MN React Books
        </HeroTitle>
        <HeroSubtitle variant="h6">
          Sci-fi, fantasia, quadrinhos, mangá e biografias técnicas
        </HeroSubtitle>
        <StyledSearchField
          fullWidth
          placeholder="Buscar livros..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </HeroContent>
    </HeroSection>
  );

  const renderLoadingState = () => <BookListSkeleton count={8} />;

  const renderErrorState = () => (
    <Alert severity="error">
      Erro ao carregar livros. Tente novamente mais tarde.
    </Alert>
  );

  const renderEmptyState = () => (
    <EmptyStateContainer>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Nenhum livro encontrado
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Tente ajustar os filtros ou fazer uma nova busca
      </Typography>
    </EmptyStateContainer>
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <PaginationContainer>
        <Pagination
          count={totalPages}
          page={filters.page}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </PaginationContainer>
    );
  };

  const renderBookGrid = () => (
    <>
      <StyledBookGrid>
        {paginatedBooks.map((book: IBook) => (
          <BookCard key={book.id} book={book} onClick={handleBookClick} />
        ))}
      </StyledBookGrid>
      {renderPagination()}
    </>
  );

  const renderBooksContent = () => {
    if (isLoadingAllBooks) return renderLoadingState();
    if (errorAllBooks) return renderErrorState();
    if (filteredBooks.length === 0) return renderEmptyState();
    if (paginatedBooks.length > 0) return renderBookGrid();
    return null;
  };

  return (
    <>
      {renderHeroSection()}

      <MainContent maxWidth="xl">
        <BooksContainer>{renderBooksContent()}</BooksContainer>
        <BookFilters />
      </MainContent>

      <BookDetailModal
        bookId={selectedBookId}
        open={!!selectedBookId}
        onClose={() => setSelectedBookId(null)}
      />
    </>
  );
};