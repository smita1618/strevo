import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("strevo-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("strevo-theme", theme);
    set({ theme });
  },
}));
