import api from "@/app/config/axios";
import type { IPagedResponse } from "@/shared/types";
import type { IBook, ICreateBookRequest, IUpdateBookRequest } from "../types/Book";

export const getAll = async (page = 0, size = 10, search = ""): Promise<IPagedResponse<IBook>> => {
  const response = await api.get('/books', { params: { page, size, search } });
  return response.data;
};

export const getAllUnpaged = async (): Promise<IBook[]> => {
  const response = await api.get('/books', { params: { page: -1 } });
  return response.data;
};

export const getById = async (id: number): Promise<IBook> => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const create = async (data: ICreateBookRequest): Promise<IBook> => {
  const response = await api.post('/books', data);
  return response.data;
};

export const update = async (id: number, data: IUpdateBookRequest): Promise<IBook> => {
  const response = await api.put(`/books/${id}`, data);
  return response.data;
};

export const remove = async (id: number): Promise<void> => {
  await api.delete(`/books/${id}`);
};
