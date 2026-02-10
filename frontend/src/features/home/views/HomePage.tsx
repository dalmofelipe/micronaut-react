import { BookCard } from "@/features/books/catalog/views/BookCard";
import { useGetBooks } from "@/features/books/shared/hooks/useBooks";
import { CircularProgress, Typography } from "@mui/material";
import { HomeWrapper } from "./styles/HomePage.styled";

export const HomePage = () => {
  
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    isError,
    error
  } = useGetBooks(0, 50, "");

  const booksToDisplay = searchResults?.content || [];
  const loading = isSearchLoading;
  const hasError = isError;
  const errorMessage = error?.message;

  if (loading) {
    return (
      <HomeWrapper>
        <CircularProgress />
      </HomeWrapper>
    );
  }

  if (hasError) {
    return (
      <HomeWrapper>
        <Typography color="error">Erro ao carregar livros: {errorMessage}</Typography>
      </HomeWrapper>
    );
  }

  const renderBooks = () => {
    if(!loading && booksToDisplay.length === 0) {
      return (
        <Typography color="text.secondary" align="center">
          Nenhum livro encontrado.
        </Typography>
      );
    }

    return booksToDisplay.map((book: any) => (
      <BookCard
        key={book.id}
        id={book.id}
        title={book.title}
        author={book.autor || book.author || ""}
        description={book.resumo || book.description}
      />
    ));
  };

  return (<HomeWrapper>{renderBooks()}</HomeWrapper>);
};