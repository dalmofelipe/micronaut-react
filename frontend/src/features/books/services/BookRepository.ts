import api from "@/app/config/axios";
import type { IBook, ICreateBookRequest, IUpdateBookRequest } from "../types/Book";
import type { IPagedResponse } from "@/shared/types";

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

// Renamed "delete" to "remove" to avoid keyword conflict if preferred, but "delete" is allowed as property. 
// As named export, "delete" is a reserved word in variable declaration?
// "export const delete = ..." is INVALID in JS.
// So I must rename it to `remove`.
export const remove = async (id: number): Promise<void> => {
  await api.delete(`/books/${id}`);
};
