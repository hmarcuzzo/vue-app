export interface LoginResponse {
  user: object;
  expires_in: string;
  access_token: string;
  token_type: string;
}

export interface JwtPayload {
  exp: number;
}
