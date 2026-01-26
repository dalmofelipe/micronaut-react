import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IBookFilters } from '../types';

interface IBookFiltersStore {
  filters: IBookFilters;
  setSearch: (search: string) => void;
  setAutor: (autor: string) => void;
  setGenero: (genero: string) => void;
  setDisponibilidade: (disponibilidade: IBookFilters['disponibilidade']) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const defaultFilters: IBookFilters = {
  search: '',
  autor: '',
  genero: '',
  disponibilidade: 'todos',
  page: 1,
};

export const useBookFiltersStore = create<IBookFiltersStore>()(
  persist(
    (set) => ({
      filters: defaultFilters,
      setSearch: (search) =>
        set((state) => ({
          filters: { ...state.filters, search, page: 1 },
        })),
      setAutor: (autor) =>
        set((state) => ({
          filters: { ...state.filters, autor, page: 1 },
        })),
      setGenero: (genero) =>
        set((state) => ({
          filters: { ...state.filters, genero, page: 1 },
        })),
      setDisponibilidade: (disponibilidade) =>
        set((state) => ({
          filters: { ...state.filters, disponibilidade, page: 1 },
        })),
      setPage: (page) =>
        set((state) => ({
          filters: { ...state.filters, page },
        })),
      resetFilters: () => set({ filters: defaultFilters }),
    }),
    {
      name: 'book-filters-storage',
    }
  )
);
