import api, { removeToken, saveToken } from "../api/client";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "../types/auth.types";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
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
