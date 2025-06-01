import type { AxiosResponse } from "axios";

import client from "@/apis/client";
import type { LoginResponse } from "@/core/types/auth.type";

class AuthService {
  private readonly basePath: string = "/auth-service";

  async login(username: string, password: string, remember?: boolean): Promise<AxiosResponse<LoginResponse>> {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    if (remember) params.append("scope", "remember");

    return await client.post<LoginResponse>(`${this.basePath}/login`, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  async refresh(): Promise<AxiosResponse<LoginResponse>> {
    return await client.post<LoginResponse>(`${this.basePath}/refresh`, {});
  }
}

export default new AuthService();
