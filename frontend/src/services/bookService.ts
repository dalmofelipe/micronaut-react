import api from "../config/axios";

export const bookService = {
  getBookById: async (id: number) => {
    if (typeof id !== 'number' || id <= 0) {
      throw new Error("Invalid book ID. It must be a positive number.");
    }
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Error fetching book with id ${id}: ${error.message}`);
    }
  },
  
  getAllBooks: async () => {
    try {
      const response = await api.get('/books');
      return response.data;
    } catch (error: any) {
      throw new Error(`Error fetching all books: ${error.message}`);
    }
  },
};
