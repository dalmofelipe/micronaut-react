export interface IBook {
  id: number;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  totalAvailable: number;
  resumo?: string;
  imageUrl?: string;
  pages?: number;
  description?: string;
}

export interface IBookRequest {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  totalAvailable: number;
  resumo?: string;
  imageUrl?: string;
  pages?: number;
}

export type TBook = IBook;
