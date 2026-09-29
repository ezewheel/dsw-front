import api from "./client";
import type { EntitySummary, MusicalEntityType } from "./musical-entity";

export interface EntityReviewUser {
  id: number;
  nickname: string;
}

export interface EntityReview {
  id: number;
  user: EntityReviewUser;
  value: number;
  content: string | null;
  updatedAt: string;
}

export interface EntityReviewsResult {
  total: number;
  totalPages: number;
  items: EntityReview[];
}

export interface ReviewWithEntity {
  id: number;
  user: EntityReviewUser;
  value: number;
  content: string;
  updatedAt: string;
  entity: EntitySummary;
}

export interface ReviewsWithEntityResult {
  total: number;
  totalPages: number;
  items: ReviewWithEntity[];
}

export interface ReviewedTrack {
  externalId: string;
  title: string | null;
  artist: string | null;
  artistId: number | null;
  album: string | null;
  albumId: number | null;
  duration: number | null;
  cover: string | null;
  averageRating: number | null;
  ratingsCount: number;
}

export interface CreateReviewInput {
  value: number;
  content?: string;
}

export const createReview = async (
  type: MusicalEntityType,
  externalId: string,
  input: CreateReviewInput,
): Promise<EntityReview> => {
  const { data } = await api.post<EntityReview>(
    `/interaction/${type}/${externalId}/reviews`,
    input,
  );
  return data;
};

export const getOwnReview = async (
  type: MusicalEntityType,
  externalId: string,
): Promise<EntityReview | null> => {
  const { data } = await api.get<EntityReview | null>(
    `/interaction/${type}/${externalId}/reviews/own`,
  );
  return data;
};

export const deleteReview = async (
  type: MusicalEntityType,
  externalId: string,
): Promise<void> => {
  await api.delete(`/interaction/${type}/${externalId}/reviews`);
};

export const getEntityReviews = async (
  type: MusicalEntityType,
  externalId: string,
  options?: { page?: number; pageSize?: number },
): Promise<EntityReviewsResult> => {
  const { data } = await api.get<EntityReviewsResult>(
    `/interaction/${type}/${externalId}/reviews`,
    { params: options },
  );
  return data;
};

export const getLatestReviews = async (options: {
  page: number;
  pageSize: number;
}): Promise<ReviewsWithEntityResult> => {
  const { data } = await api.get<ReviewsWithEntityResult>(
    "/interaction/reviews/latest",
    { params: options },
  );
  return data;
};

export const getLatestReviewedTracks = async (
  limit: number = 5,
): Promise<ReviewedTrack[]> => {
  const { data } = await api.get<ReviewedTrack[]>(
    "/interaction/latest-reviewed-songs",
    { params: { limit } },
  );
  return data;
};
