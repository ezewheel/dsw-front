import api from "../api/client";
import type { LoginRequest, LoginResponse, User } from "../types/auth.types";

const TOKEN_KEY = "token";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", credentials);
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
};

export const me = async (): Promise<User> => {
  const token = getToken();
  const { data } = await api.get<User>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};