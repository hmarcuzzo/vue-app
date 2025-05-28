import { defineStore } from "pinia";

import { tokenUtil, AUTH_KEY, REFRESH_KEY } from "@/core/utils/token.util.ts";

interface AuthState {
  authToken: string | null;
  refreshToken: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    authToken: tokenUtil.getItem(AUTH_KEY),
    refreshToken: tokenUtil.getItem(REFRESH_KEY),
  }),

  getters: {
    isAuthValid: (state) => state.authToken != null && tokenUtil.isTokenValid(state.authToken),
    isRefreshValid: (state) => state.refreshToken != null && tokenUtil.isTokenValid(state.refreshToken),
  },

  actions: {
    setTokens(authToken: string, refreshToken: string, remember: boolean = true) {
      const [target, other] = remember ? [localStorage, sessionStorage] : [sessionStorage, localStorage];

      // clear tokens from other storage
      [AUTH_KEY, REFRESH_KEY].forEach((key) => other.removeItem(key));

      // set tokens
      target.setItem(AUTH_KEY, authToken);
      target.setItem(REFRESH_KEY, refreshToken);

      // update state
      this.authToken = authToken;
      this.refreshToken = refreshToken;
    },

    clearTokens() {
      [AUTH_KEY, REFRESH_KEY].forEach((key) => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
      this.authToken = null;
      this.refreshToken = null;
    },
  },
});
