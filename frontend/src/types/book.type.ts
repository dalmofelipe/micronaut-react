export interface IBook {
  id: number;
  title: string;
  pages: number;
}

export interface ICreateBookRequest {
  title: string;
  pages: number;
}

export interface IUpdateBookRequest {
  title: string;
  pages: number;
}

// Legacy type for compatibility
export type TBook = IBook;
