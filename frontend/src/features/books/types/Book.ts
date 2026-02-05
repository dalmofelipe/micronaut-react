export interface IBook {
  id: number;
  title: string;
  autor: string;
  isbn: string;
  genero: string;
  quantidadeTotal: number;
  resumo?: string;
  imagemUrl?: string; // Optional in UI?
  pages?: number; // Kept for compatibility if backend sends it
  description?: string; // BookDetailsPage uses description? AdminBooksPage uses resumo.
  author?: string; // BookDetailsPage uses author? AdminBooksPage uses autor.
}

// Consolidate fields. 
// AdminBooksPage uses: autor, isbn, genero, quantidadeTotal, resumo, imagemUrl.
// BookDetailsPage uses: author (or autor?), description (or resumo?).
// I should verify BookDetailsPage usage again. Step 167: uses `book.title`, `book.author`, `book.description`.
// So we have mixed language: autor/author, resumo/description.
// I will support both in type for now, or standardize.
// Standardizing is better but might break other code slightly.
// AdminBooksPage is distinct from BookDetailsPage?
// Let's add both sets of keys to IBook to be safe.

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
