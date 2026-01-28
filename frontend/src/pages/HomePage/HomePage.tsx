import { CircularProgress, Typography } from "@mui/material";
import { BooksGrid, HomeTitle, HomeWrapper } from "./styles/HomePage.styled";
import { useGetAllBooks } from "../../hooks/useBooks";
import { BookCard } from "../../components/BookCard";
import { HeroSearch } from "../../components/HeroSearch";
import type { TBook } from "../../types/book.type";
import { useState, useMemo, useEffect } from "react";

export const HomePage = () => {
  const { allBooks, isLoadingAllBooks, isErrorAllBooks, errorAllBooks } = useGetAllBooks();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredBooks = useMemo(() => {
    if (!allBooks) return [];
    if (!debouncedSearchTerm.trim()) return allBooks;
    
    const search = debouncedSearchTerm.toLowerCase();
    return allBooks.filter((book: TBook) => 
      book.title.toLowerCase().includes(search) ||
      (book.author && book.author.toLowerCase().includes(search))
    );
  }, [allBooks, debouncedSearchTerm]);

  const renderLoading = () => {
    if (!isLoadingAllBooks) return null;

    return (
      <HomeWrapper>
        <CircularProgress />
      </HomeWrapper>
    );
  };

  const renderError = () => {
    if (!isErrorAllBooks) return null;

    return (
      <HomeWrapper>
        <Typography variant="h5" color="error">
          Erro ao carregar livros: {errorAllBooks?.message}
        </Typography>
      </HomeWrapper>
    );
  };

  const renderTitle = () => {
    const title = searchTerm 
      ? `Resultados da busca (${filteredBooks.length})` 
      : 'Últimos livros adicionados';

    return (
      <HomeTitle>
        <Typography variant="h5">
          {title}
        </Typography>
      </HomeTitle>
    );
  };

  const renderBooksList = () => {
    if (!filteredBooks || filteredBooks.length === 0) {
      const message = searchTerm 
        ? 'Nenhum livro encontrado para sua busca.' 
        : 'Nenhum livro encontrado.';

      return (
        <Typography variant="body1">
          {message}
        </Typography>
      );
    }

    return (
      <BooksGrid>
        {filteredBooks.map((book: TBook) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author || 'Admin'}
            description={book.description || 'lorem ipsum...'}
          />
        ))}
      </BooksGrid>
    );
  };

  return (
    <>
      {renderLoading()}
      {renderError()}
      {!isLoadingAllBooks && !isErrorAllBooks && (
        <HomeWrapper>
          <HeroSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          {renderTitle()}
          {renderBooksList()}
        </HomeWrapper>
      )}
    </>
  );
}