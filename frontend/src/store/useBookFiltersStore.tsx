import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IBookFilters } from '../types';

interface IBookFiltersStore {
  filters: IBookFilters;
  setSearch: (search: string) => void;
  setAuthor: (author: string) => void;
  setGenre: (genre: string) => void;
  setAvailability: (availability: IBookFilters['availability']) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const defaultFilters: IBookFilters = {
  search: '',
  author: '',
  genre: '',
  availability: 'all',
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
      setAuthor: (author) =>
        set((state) => ({
          filters: { ...state.filters, author, page: 1 },
        })),
      setGenre: (genre) =>
        set((state) => ({
          filters: { ...state.filters, genre, page: 1 },
        })),
      setAvailability: (availability) =>
        set((state) => ({
          filters: { ...state.filters, availability, page: 1 },
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
