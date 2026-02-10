// Hooks públicos
export { useGetBooks, useGetBookById, useGetAllBooks } from './hooks/useBooks';

// Types públicos
export type { IBook, IBookRequest } from './types/Book';

// Pages principais (entry points de rotas)
export { AdminBooksPage } from './views/admin/books-list/AdminBooksPage';
export { BookDetailsPage } from './views/catalog/book-details/BookDetailsPage';
