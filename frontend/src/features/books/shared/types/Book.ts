export interface IBook {
  id: number;
  title: string;
  autor: string;
  isbn: string;
  genero: string;
  quantidadeTotal: number;
  resumo?: string;
  imagemUrl?: string;
  pages?: number;
  description?: string;
  author?: string;
}

export interface ICreateBookRequest {
  title: string;
  autor: string;
  isbn: string;
  genero: string;
  quantidadeTotal: number;
  resumo?: string;
  imagemUrl?: string;
  pages?: number;
}

export interface IUpdateBookRequest {
  title?: string;
  autor?: string;
  isbn?: string;
  genero?: string;
  quantidadeTotal?: number;
  resumo?: string;
  imagemUrl?: string;
  pages?: number;
}

export type TBook = IBook;
