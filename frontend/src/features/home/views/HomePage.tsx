import { BookCard } from "@/features/books/catalog/views/BookCard";
import { useGetBooks } from "@/features/books/shared/hooks/useBooks";
import { Loading } from "@/shared/components/Loading/Loading";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { HeroSearch } from "./HeroSearch";
import { BooksGrid, HomeTitle, HomeWrapper } from "./styles/HomePage.styled";

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    isError,
    error
  } = useGetBooks(0, 50, debouncedSearchTerm);

  const booksToDisplay = searchResults?.content || [];
  const hasError = isError;
  const errorMessage = error?.message;

  const renderLoading = () => {
    if (!isSearchLoading) return null;

    return <Loading />
  }

  if (hasError && !isSearchLoading) {
    return (
      <HomeWrapper>
        <Typography color="error">Erro ao carregar livros: {errorMessage}</Typography>
      </HomeWrapper>
    );
  }

  const renderBooks = () => {
    if (!isSearchLoading && booksToDisplay.length === 0) {
      return (
        <Typography color="text.secondary" align="center">
          Nenhum livro encontrado.
        </Typography>
      );
    }

    return (
      <BooksGrid>
        {booksToDisplay.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.autor || book.author || ""}
            description={book.resumo || book.description}
          />
        ))}
      </BooksGrid>
    );
  }

  return (
    <HomeWrapper>
      <HeroSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <HomeTitle>Lançamentos e Destaques</HomeTitle>

      {renderLoading()}
      {renderBooks()}
    </HomeWrapper>
  );
};