import { useQuery } from "@tanstack/react-query";
import { bookService } from "../services/bookService";

export const useGetBookById = (id: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['book-by-id', id],
    queryFn: () => bookService.getBookById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  return {
    book: data,
    isLoadingBook: isLoading,
    isErrorBook: isError,
    errorBook: error,
  };
};

export const useGetAllBooks = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['all-books'],
    queryFn: bookService.getAllBooks,
  });

  return {
    allBooks: data,
    isLoadingAllBooks: isLoading,
    isErrorAllBooks: isError,
    errorAllBooks: error,
  };
};
