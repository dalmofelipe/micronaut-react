import type { ICreateBookRequest, IUpdateBookRequest } from '../types/Book';
import { BookRepository } from './BookRepository';

export const BookManager = {
  getAll: (page = 0, size = 10, search = "") => BookRepository.getAll(page, size, search),
  getAllUnpaged: () => BookRepository.getAllUnpaged(),
  getById: (id: number) => BookRepository.getById(id),
  create: (data: ICreateBookRequest) => BookRepository.create(data),
  update: (id: number, data: IUpdateBookRequest) => BookRepository.update(id, data),
  remove: (id: number) => BookRepository.remove(id),
};
