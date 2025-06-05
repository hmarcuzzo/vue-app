import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";

import { useAuth } from "@/apis/auth.service";
import type { JwtPayload } from "@/core/interfaces/auth.interface";

interface AuthState {
  token: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: null,
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
    setAuthentication({ token }: AuthState): void {
      this.token = token;
    },

    clearAuthentication(): void {
      this.setAuthentication({ token: null });
    },

    async ensureAuth(): Promise<boolean> {
      if (this.isAuthenticated) return true;

      const { refresh } = useAuth();

      try {
        const data = (await refresh()).data;
        this.setAuthentication({ token: data.access_token });
        return true;
      } catch {
        this.setAuthentication({ token: null });
        return false;
      }
    },
  },
});
