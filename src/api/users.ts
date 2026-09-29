import api from "./client";

export type UserSummary = {
  id: number;
  nickname: string;
};

export type UserSearchResponse = {
  results: UserSummary[];
  total: number;
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

export const getUser = async (id: string): Promise<UserSummary> => {
  const { data } = await api.get<UserSummary>(`/user/${id}`);
  return data;
};
