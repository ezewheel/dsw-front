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

export interface EntityReviewsResult {
  externalId: string;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  items: EntityReview[];
}

export type LatestReviewEntity = {
  externalId: string;
  type: SearchApiType;
  title: string | null;
  cover: string | null;
  artist: string | null;
};

export interface LatestReview {
  id: number;
  user: EntityReviewUser;
  value: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  entity: LatestReviewEntity;
}

export interface ReviewedSong {
  externalId: string;
  title: string | null;
  artist: string | null;
  album: string | null;
  duration: number | null;
  cover: string | null;
  averageRating: number | null;
  reviewsCount: number;
  reviewedAt: string;
}

export const getEntityReviews = async (
  type: SearchApiType,
  externalId: string,
  options?: { page?: number; pageSize?: number },
): Promise<EntityReviewsResult> => {
  const { data } = await api.get<EntityReviewsResult>(
    `/musical-entity/${type}/${externalId}/reviews`,
    { params: options },
  );
  return data;
};

export const getLatestReviews = async (
  limit: number = 20,
): Promise<LatestReview[]> => {
  const { data } = await api.get<LatestReview[]>("/musical-entity/reviews/latest", {
    params: { limit },
  });
  return data;
};

export const getLatestReviewedSongs = async (
  limit: number = 5,
): Promise<ReviewedSong[]> => {
  const { data } = await api.get<ReviewedSong[]>(
    "/musical-entity/latest-reviewed-songs",
    { params: { limit } },
  );
  return data;
};