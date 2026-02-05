import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookService } from "../services/bookService";
import type { ICreateBookRequest, IUpdateBookRequest } from "../types";

export const useGetBooks = (page: number, size: number, search: string) => {
  return useQuery({
    queryKey: ['books', page, size, search],
    queryFn: () => bookService.getAll(page, size, search),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetAllBooks = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['all-books'],
    queryFn: bookService.getAllUnpaged,
    staleTime: 1000 * 60 * 5,
  });

  return {
    allBooks: data,
    isLoadingAllBooks: isLoading,
    isErrorAllBooks: isError,
    errorAllBooks: error,
  };
};

export const useGetBookById = (id: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['book', id],
    queryFn: () => bookService.getById(id),
    enabled: !!id,
  });

  return {
    book: data,
    isLoadingBook: isLoading,
    isErrorBook: isError,
    errorBook: error,
  };
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateBookRequest) => bookService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IUpdateBookRequest }) => bookService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => bookService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
};
