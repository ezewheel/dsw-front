import api from "./client";
import type { User } from "./auth";
import type { ReviewsWithEntityResult } from "./reviews";

export interface UserProfile extends User {
  interactionsCount: number;
}

export interface UpdateProfileInput {
  email: string;
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
