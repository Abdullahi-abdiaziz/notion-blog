// store/themeStore.ts
import { create } from "zustand";

interface ThemeState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: "dark", // Default theme
  setTheme: (theme) => set({ theme }),
}));

export default useThemeStore;
