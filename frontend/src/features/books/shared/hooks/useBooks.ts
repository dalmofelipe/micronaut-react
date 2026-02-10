import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as BookManager from "../services/BookManager";
import type { IBookRequest } from "../types/Book";

export const useGetBooks = (page: number, size: number, search: string) => {
  return useQuery({
    queryKey: ['books', page, size, search],
    queryFn: () => BookManager.getAllBooks(page, size, search),
  });
};

export const useGetAllBooks = () => {
  return useQuery({
    queryKey: ['books', 'all'],
    queryFn: () => BookManager.getAllBooks(0, 1000, ""),
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IBookRequest) => BookManager.createBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IBookRequest }) =>
      BookManager.updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => BookManager.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useGetBookById = (id: string) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => BookManager.getBookById(Number(id)),
    enabled: !!id,
  });
};
