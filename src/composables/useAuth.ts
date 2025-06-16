import axios, { type AxiosResponse } from "axios";
import { ref } from "vue";

import client from "@/apis/client";
import type { LoginResponse } from "@/core/interfaces/auth.interface";

export function useAuth() {
  const basePath: string = "/auth-service";

  const error = ref<string>("");

  async function login(username: string, password: string, remember = false): Promise<AxiosResponse<LoginResponse>> {
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      if (remember) params.append("scope", "remember");

      return await client.post<LoginResponse>(`${basePath}/login`, params.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          error.value = "Invalid username or password.";
        } else {
          error.value = "Network error—please try again later.";
        }
      } else {
        error.value = "An unexpected error occurred.";
      }

      throw err;
    }
  }

  async function refresh(): Promise<AxiosResponse<LoginResponse>> {
    try {
      return client.post<LoginResponse>(`${basePath}/refresh`, {});
    } catch (err: unknown) {
      error.value = "Token refresh failed: " + err;

      throw err;
    }
  }

  return {
    error,

    login,
    refresh,
  };
}
