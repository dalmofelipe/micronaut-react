import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ILoanFilters, TLoanStatus } from '../types';

interface ILoanFiltersStore {
  filters: ILoanFilters;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  setStatus: (status?: TLoanStatus) => void;
  setUserId: (userId?: number) => void;
  resetFilters: () => void;
}

const defaultFilters: ILoanFilters = {
  page: 0,
  size: 10,
};

export const useLoanFiltersStore = create<ILoanFiltersStore>()(
  persist(
    (set) => ({
      filters: defaultFilters,
      setPage: (page) => set((state) => ({ filters: { ...state.filters, page } })),
      setSize: (size) => set((state) => ({ filters: { ...state.filters, size, page: 0 } })),
      setStatus: (status) => set((state) => ({ filters: { ...state.filters, status, page: 0 } })),
      setUserId: (userId) => set((state) => ({ filters: { ...state.filters, userId, page: 0 } })),
      resetFilters: () => set({ filters: defaultFilters }),
    }),
    { name: 'loan-filters-storage' }
  )
);
