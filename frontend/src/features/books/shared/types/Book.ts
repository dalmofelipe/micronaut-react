export interface IBook {
  id: number;
  title: string;
  autor: string;
  isbn: string;
  genero: string;
  pages: number;
  quantidadeTotal: number;
  resumo?: string;
  imagemUrl?: string;
  description?: string;
  author?: string;
}

export interface ICreateBookRequest {
  title: string;
  autor: string;
  isbn: string;
  genero: string;
  pages: number;
  quantidadeTotal: number;
  resumo?: string;
  imagemUrl?: string;
}

export interface IUpdateBookRequest {
  title?: string;
  autor?: string;
  isbn?: string;
  genero?: string;
  pages?: number;
  quantidadeTotal?: number;
  resumo?: string;
  imagemUrl?: string;
}

export type TBook = IBook;
