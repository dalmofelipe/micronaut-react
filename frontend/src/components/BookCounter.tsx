import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useGetBookById } from "../hooks/useBooks";
import { useCounter } from "../store/useCounterStore";
import { BookCounterRoot, BookCounterSection } from "./styles/BookCounter.styled";

const randomIndex = () : number => {
  const ids = [1, 2, 3];
  return ids[Math.floor(Math.random() * ids.length)];
}

export const BookCounter = () => {
  const { count, increment } = useCounter();
  const [ bookId ] = useState(() => randomIndex());
  const { book, isLoadingBook } = useGetBookById(bookId);

  const renderBook = () => {
    if (isLoadingBook) {
      return <p>Carregando...</p>;
    }

    if (book) {
      return (
        <pre style={{ textAlign: 'left' }}>
          {JSON.stringify(book, null, 2)}
        </pre>
      );
    }

    return <p>Não foi possível carregar dados...</p>;
  }

  return (
    <BookCounterRoot>
      <BookCounterSection>
        <Typography variant="h5">Exemplo Zustand + MUI</Typography>

        <Button variant="contained" onClick={increment}>
          Zustand count: {count}
        </Button>
      </BookCounterSection>

      <BookCounterSection>
        <Typography variant="h5">Exemplo React Query + Axios</Typography>
        <Typography variant="h6">Consulta ao Backend /books</Typography>
        {renderBook()}
      </BookCounterSection>
    </BookCounterRoot>
  );
}
