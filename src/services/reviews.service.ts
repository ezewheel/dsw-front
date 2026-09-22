import api from "../api/client";
import { getToken } from "./auth.service";
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

export interface CreateReviewInput {
  value: number;
  content?: string;
}

export const createReview = async (
  type: SearchApiType,
  externalId: string,
  input: CreateReviewInput,
): Promise<EntityReview> => {
  const token = getToken();
  const { data } = await api.post<EntityReview>(
    `/interaction/${type}/${externalId}/reviews`,
    input,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );
  return data;
};

export const getEntityReviews = async (
  type: SearchApiType,
  externalId: string,
  options?: { page?: number; pageSize?: number },
): Promise<EntityReviewsResult> => {
  const { data } = await api.get<EntityReviewsResult>(
    `/interaction/${type}/${externalId}/reviews`,
    { params: options },
  );
  return data;
};

export const getLatestReviews = async (
  limit: number = 20,
): Promise<LatestReview[]> => {
const { data } = await api.get<LatestReview[]>("/interaction/reviews/latest", {
    params: { limit },
  });
  return data;
};

export const getLatestReviewedSongs = async (
  limit: number = 5,
): Promise<ReviewedSong[]> => {
  const { data } = await api.get<ReviewedSong[]>(
    "/interaction/latest-reviewed-songs",
    { params: { limit } },
  );
  return data;
};