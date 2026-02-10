import { create } from "zustand";
import { persist } from "zustand/middleware";
import { lightTheme, darkTheme } from "@/app/theme";

type TThemeMode = "light" | "dark";


interface IThemeStore {
  mode: TThemeMode;
  toggleTheme: () => void;
  theme: typeof lightTheme;
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
}

export const useThemeStore = create<IThemeStore>()(
  persist(
    (set, get) => ({
      mode: "light",

      toggleTheme: () => set((state) => ({
        mode: state.mode === "light" ? "dark" : "light",
      })),

      get theme() {
        return get().mode === "light" ? lightTheme : darkTheme;
      },

      headerHeight: 64,
      setHeaderHeight: (height: number) => set({ headerHeight: height }),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        mode: state.mode,
      }),
    }
  )
);