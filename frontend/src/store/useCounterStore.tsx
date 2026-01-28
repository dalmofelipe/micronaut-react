import { create } from "zustand";

interface ICounterStore {
  count: number; 
  increment: () => void 
}

export const useCounter = create<ICounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));