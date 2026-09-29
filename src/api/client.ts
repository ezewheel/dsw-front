import axios from "axios";

const TOKEN_KEY = "token";

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const saveToken = (token: string): void =>
  localStorage.setItem(TOKEN_KEY, token);

export const removeToken = (): void => localStorage.removeItem(TOKEN_KEY);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const isAccountSuspended = (error: unknown): boolean =>
  axios.isAxiosError<{ code?: string }>(error) &&
  error.response?.data?.code === "ACCOUNT_SUSPENDED";

export const isUnauthorized = (error: unknown): boolean =>
  axios.isAxiosError(error) && error.response?.status === 401;

type ErrorResponse = {
  message?: string;
  errors?: { messages: string[] }[];
};

export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (!axios.isAxiosError<ErrorResponse>(error)) return fallback;
  const data = error.response?.data;
  return data?.errors?.[0]?.messages[0] ?? data?.message ?? fallback;
};

export default api;
