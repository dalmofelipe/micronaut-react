export interface IPagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface IBookFilters {
  page: number;
  size: number;
  search: string;
}
