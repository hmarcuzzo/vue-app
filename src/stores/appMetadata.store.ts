import { defineStore } from "pinia";

import { ThemeType } from "@/core/constants/enums/themeType.enum.ts";

interface AppMetadataState {
  theme: ThemeType;
}

export const useAppMetadataStore = defineStore("appMetadata", {
  state: (): AppMetadataState => ({
    theme: ThemeType.LIGHT,
  }),

  getters: {
    isDarkTheme(state: AppMetadataState): boolean {
      if (state.theme === ThemeType.SYSTEM) {
        return window.matchMedia(`(prefers-color-scheme: ${ThemeType.DARK})`).matches;
      }
      return state.theme === ThemeType.DARK;
    },
    isLightTheme(state: AppMetadataState): boolean {
      if (state.theme === ThemeType.SYSTEM) {
        return !window.matchMedia(`(prefers-color-scheme: ${ThemeType.DARK})`).matches;
      }
      return state.theme === ThemeType.LIGHT;
    },
    isSystemTheme(state: AppMetadataState): boolean {
      return state.theme === ThemeType.SYSTEM;
    },
  },

  actions: {
    setTheme(theme: ThemeType): void {
      this.theme = theme;
      if (theme === ThemeType.SYSTEM) {
        const prefersDark = window.matchMedia(`(prefers-color-scheme: ${ThemeType.DARK})`).matches;
        document.documentElement.setAttribute("data-theme", prefersDark ? ThemeType.DARK : ThemeType.LIGHT);
      } else {
        document.documentElement.setAttribute("data-theme", theme);
      }
    },

    initTheme(): void {
      if (this.theme === ThemeType.DARK || this.theme === ThemeType.LIGHT || this.theme === ThemeType.SYSTEM) {
        this.setTheme(this.theme);
      } else {
        this.setTheme(ThemeType.SYSTEM);
      }

      window.matchMedia(`(prefers-color-scheme: ${ThemeType.DARK})`).addEventListener("change", (e) => {
        if (this.theme === ThemeType.SYSTEM) {
          document.documentElement.setAttribute("data-theme", e.matches ? ThemeType.DARK : ThemeType.LIGHT);
        }
      });
    },
  },

  persist: true,
});
