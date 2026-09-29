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

const SUSPENDED_ACCOUNT_MESSAGE = "Tu cuenta fue suspendida";

export const isAccountSuspended = (error: unknown): boolean =>
  axios.isAxiosError<{ message?: string }>(error) &&
  error.response?.status === 403 &&
  error.response.data?.message === SUSPENDED_ACCOUNT_MESSAGE;

export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (!axios.isAxiosError<{ message?: string }>(error)) return fallback;
  return error.response?.data?.message ?? fallback;
};

export default api;
