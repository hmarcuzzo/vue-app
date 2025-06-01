import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";

import type { JwtPayload } from "@/core/types/auth.type";

interface AuthState {
  token: string | null;
  remember?: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: null,
    remember: false,
  }),

  getters: {
    isAuthenticated(state: AuthState): boolean {
      if (!state.token) return false;

      try {
        const { exp } = jwtDecode<JwtPayload>(state.token);
        return exp * 1000 > Date.now();
      } catch {
        return false;
      }
    },
  },

  actions: {
    setAuthentication({ token, remember }: AuthState): void {
      this.token = token;
      this.remember = remember ?? this.remember;
    },

    clearAuthentication(): void {
      this.setAuthentication({ token: null, remember: false });
    },
  },

  persist: true,
});
