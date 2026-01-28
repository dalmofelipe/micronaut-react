export interface IBookFilters {
  search: string;
  author: string;
  genre: string;
  availability: 'all' | 'available' | 'unavailable';
  page: number;
}
