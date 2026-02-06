import * as BookRepository from './BookRepository';
import type { ICreateBookRequest, IUpdateBookRequest } from '../types/Book';

export const getAllBooks = async (page = 0, size = 10, search = "") => {
  return BookRepository.getAll(page, size, search);
};

export const getAllBooksUnpaged = async () => {
  return BookRepository.getAllUnpaged();
};

export const getBookById = async (id: number) => {
  return BookRepository.getById(id);
};

export const createBook = async (data: ICreateBookRequest) => {
  return BookRepository.create(data);
};

export const updateBook = async (id: number, data: IUpdateBookRequest) => {
  return BookRepository.update(id, data);
};

export const deleteBook = async (id: number) => {
  return BookRepository.remove(id);
};
