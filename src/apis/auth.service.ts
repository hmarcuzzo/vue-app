import type { AxiosResponse } from "axios";

import client from "@/apis/client.ts";
import type { LoginResponse } from "@/core/types/auth.type.ts";

class AuthService {
  private readonly basePath: string = "/auth-service";

  login(username: string, password: string): Promise<AxiosResponse<LoginResponse>> {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    return client.post<LoginResponse>(`${this.basePath}/login`, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
}

export default new AuthService();
