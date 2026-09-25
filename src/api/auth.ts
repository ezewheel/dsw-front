import api, { removeToken, saveToken } from "./client";

export interface User {
  id: number;
  nickname: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", credentials);
  saveToken(data.token);
  return data;
};

export const register = async (
  credentials: RegisterRequest,
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/register", credentials);
  saveToken(data.token);
  return data;
};

export const me = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/me");
  return data;
};

export const logout = (): void => {
  removeToken();
};
