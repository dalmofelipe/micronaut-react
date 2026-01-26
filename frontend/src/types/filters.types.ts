export interface IBookFilters {
  search: string;
  autor: string;
  genero: string;
  disponibilidade: 'todos' | 'disponiveis' | 'indisponiveis';
  page: number;
}
