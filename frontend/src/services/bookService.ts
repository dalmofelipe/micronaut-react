import api from "../config/axios";
import type { IBook, ICreateBookRequest, IUpdateBookRequest, IPagedResponse } from "../types";

export const bookService = {
  getAll: async (page = 0, size = 10, search = ""): Promise<IPagedResponse<IBook>> => {
    const response = await api.get('/books', { params: { page, size, search } });
    return response.data;
  },

  getAllUnpaged: async (): Promise<IBook[]> => {
    const response = await api.get('/books', { params: { page: -1 } });
    return response.data;
  },

  getById: async (id: number): Promise<IBook> => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  create: async (data: ICreateBookRequest): Promise<IBook> => {
    const response = await api.post('/books', data);
    return response.data;
  },

  update: async (id: number, data: IUpdateBookRequest): Promise<IBook> => {
    const response = await api.put(`/books/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};
