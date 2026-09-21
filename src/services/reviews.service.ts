import api from "../api/client";
import type { SearchApiType } from "./search.service";

export interface EntityReviewUser {
  id: number;
  nickname: string;
}

export interface EntityReview {
  id: number;
  user: EntityReviewUser;
  value: number;
  content: string | null;
  createdAt: string;
  updatedAt: string;
}

export const getEntityReviews = async (
  type: SearchApiType,
  externalId: string,
): Promise<EntityReview[]> => {
  const { data } = await api.get<EntityReview[]>(
    `/musical-entity/${type}/${externalId}/reviews`,
  );
  return data;
};