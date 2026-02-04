import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IUserFilters } from '../types';

interface IUserFiltersStore {
  filters: IUserFilters;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
}

const defaultFilters: IUserFilters = {
  page: 0,
  size: 10,
  search: '',
};

export const useUserFiltersStore = create<IUserFiltersStore>()(
  persist(
    (set) => ({
      filters: defaultFilters,
      setPage: (page) => set((state) => ({ filters: { ...state.filters, page } })),
      setSize: (size) => set((state) => ({ filters: { ...state.filters, size, page: 0 } })),
      setSearch: (search) => set((state) => ({ filters: { ...state.filters, search, page: 0 } })),
      resetFilters: () => set({ filters: defaultFilters }),
    }),
    { name: 'user-filters-storage' }
  )
);
