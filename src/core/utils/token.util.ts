import { jwtDecode } from "jwt-decode";

import type { JwtPayload } from "@/core/types/auth.type.ts";

export const AUTH_KEY = "auth_token" as const;
export const REFRESH_KEY = "refresh_token" as const;
export type TokenKey = typeof AUTH_KEY | typeof REFRESH_KEY;

class TokenUtil {
  private getItem(key: TokenKey): string | null {
    return localStorage.getItem(key) ?? sessionStorage.getItem(key);
  }

  getAuthToken(): string | null {
    return this.getItem(AUTH_KEY);
  }

  getRefreshToken(): string | null {
    return this.getItem(REFRESH_KEY);
  }

  /**
   * Sets the authentication and refresh tokens in the appropriate storage
   * @param authToken  value of the authentication token
   * @param refreshToken value of the refresh token
   * @param remember if true, tokens are stored in localStorage, otherwise in sessionStorage
   */
  setTokens(authToken: string, refreshToken: string, remember: boolean): void {
    const target = remember ? localStorage : sessionStorage;
    const other = remember ? sessionStorage : localStorage;

    // clear the tokens from the other storage
    [AUTH_KEY, REFRESH_KEY].forEach((k) => other.removeItem(k));

    // set the tokens in the target storage
    target.setItem(AUTH_KEY, authToken);
    target.setItem(REFRESH_KEY, refreshToken);
  }

  clearTokens(): void {
    [AUTH_KEY, REFRESH_KEY].forEach((k) => {
      localStorage.removeItem(k);
      sessionStorage.removeItem(k);
    });
  }

  /**
   * Checks if the tokens are stored in localStorage
   * @param key the key to check, defaults to AUTH_KEY
   */
  isKeyInLocalStorage(key: TokenKey = AUTH_KEY): boolean {
    return localStorage.getItem(key) !== null;
  }

  isTokenValid(token: string): boolean {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}

export const tokenUtil = new TokenUtil();
