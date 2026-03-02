import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookManager } from "../service/BookManager";
import type { ICreateBookRequest, IUpdateBookRequest } from "../types/Book";

export const useGetBooks = (page: number, size: number, search: string) => {
  return useQuery({
    queryKey: ['books', page, size, search],
    queryFn: () => BookManager.getAll(page, size, search),
  });
};

export const useGetAllBooks = () => {
  return useQuery({
    queryKey: ['books', 'all'],
    queryFn: () => BookManager.getAll(0, 1000, ""),
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateBookRequest) => BookManager.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IUpdateBookRequest }) =>
      BookManager.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => BookManager.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useGetBookById = (id: string) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => BookManager.getById(Number(id)),
    enabled: !!id,
  });
};
