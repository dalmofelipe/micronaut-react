import { CircularProgress, Typography } from "@mui/material";
import { BooksGrid, HomeTitle, HomeWrapper } from "./styles/HomePage.styled";
import { useGetAllBooks } from "../../hooks/useBooks";
import { BookCard } from "../../components/BookCard";
import { HeroSearch } from "../../components/HeroSearch";
import type { TBook } from "../../types/book.type";
import { useState, useMemo } from "react";

export const HomePage = () => {
  const { allBooks, isLoadingAllBooks, isErrorAllBooks, errorAllBooks } = useGetAllBooks();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = useMemo(() => {
    if (!allBooks) return [];
    if (!searchTerm.trim()) return allBooks;
    
    const search = searchTerm.toLowerCase();
    return allBooks.filter((book: TBook) => 
      book.title.toLowerCase().includes(search) ||
      (book.author && book.author.toLowerCase().includes(search))
    );
  }, [allBooks, searchTerm]);

  if (isLoadingAllBooks) {
    return (
      <HomeWrapper>
        <CircularProgress />
      </HomeWrapper>
    );
  }

  if (isErrorAllBooks) {
    return (
      <HomeWrapper>
        <Typography variant="h5" color="error">
          Erro ao carregar livros: {errorAllBooks?.message}
        </Typography>
      </HomeWrapper>
    );
  }

  return (
    <HomeWrapper>
      <HeroSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <HomeTitle>
        <Typography variant="h5">
          {searchTerm ? `Resultados da busca (${filteredBooks.length})` : 'Últimos livros adicionados'}
        </Typography>
      </HomeTitle>
      
      {filteredBooks && filteredBooks.length > 0 ? (
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
      ) : (
        <Typography variant="body1">
          {searchTerm ? 'Nenhum livro encontrado para sua busca.' : 'Nenhum livro encontrado.'}
        </Typography>
      )}
    </HomeWrapper>
  );
}