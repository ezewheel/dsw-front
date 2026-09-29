import api from "./client";
import type { User, UserRole } from "./auth";
import type { ReviewsWithEntityResult } from "./reviews";

export type UserSummary = {
  id: number;
  nickname: string;
};

export type UserDetail = UserSummary & {
  role: UserRole;
  interactionsCount: number;
  createdAt: string;
};

export type UserSearchResponse = {
  results: UserSummary[];
  total: number;
};

export interface UserProfile extends User {
  interactionsCount: number;
  createdAt: string;
}

export interface UpdateProfileInput {
  nickname: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export const getProfile = async (): Promise<UserProfile> => {
  const { data } = await api.get<UserProfile>("/user/me");
  return data;
};

export const updateProfile = async (
  input: UpdateProfileInput,
): Promise<UserProfile> => {
  const { data } = await api.put<UserProfile>("/user/me", input);
  return data;
};

export const changePassword = async (
  input: ChangePasswordInput,
): Promise<void> => {
  await api.put("/user/me/password", input);
};

export const getOwnInteractions = async (options: {
  page: number;
  pageSize: number;
}): Promise<ReviewsWithEntityResult> => {
  const { data } = await api.get<ReviewsWithEntityResult>(
    "/user/me/interactions",
    { params: options },
  );
  return data;
};

export const searchUsers = async (
  query: string,
  options?: { limit?: number; index?: number },
): Promise<UserSearchResponse> => {
  const { data } = await api.get<UserSearchResponse>("/user/search", {
    params: { query, ...options },
  });
  return data;
};

export const getUser = async (id: string): Promise<UserDetail> => {
  const { data } = await api.get<UserDetail>(`/user/${id}`);
  return data;
};

export const getUserReviews = async (
  id: string,
  options: { page: number; pageSize: number },
): Promise<ReviewsWithEntityResult> => {
  const { data } = await api.get<ReviewsWithEntityResult>(
    `/user/${id}/reviews`,
    { params: options },
  );
  return data;
};

export const banUser = async (id: number): Promise<void> => {
  await api.post(`/user/${id}/ban`);
};
