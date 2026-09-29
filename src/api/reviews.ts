import api from "./client";
import type { EntitySummary, MusicalEntityType } from "./musical-entity";
import type { UserSummary } from "./user";

export interface EntityReview {
  id: number;
  user: UserSummary;
  value: number;
  content: string;
  publishedAt: string;
}

export type ReviewWithEntity = EntityReview & { entity: EntitySummary };

export type Page<T> = {
  items: T[];
  total: number;
  totalPages: number;
};

export interface ReviewedTrack {
  externalId: string;
  title: string;
  artist: string;
  artistId: number;
  album: string;
  albumId: number;
  duration: number;
  cover: string;
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

export const deleteReviewById = async (reviewId: number): Promise<void> => {
  await api.delete(`/interaction/reviews/${reviewId}`);
};

export const getEntityReviews = async (
  type: MusicalEntityType,
  externalId: string,
  options?: { page?: number; pageSize?: number },
): Promise<Page<EntityReview>> => {
  const { data } = await api.get<Page<EntityReview>>(
    `/interaction/${type}/${externalId}/reviews`,
    { params: options },
  );
  return data;
};

export const getLatestReviews = async (options: {
  page: number;
  pageSize: number;
}): Promise<Page<ReviewWithEntity>> => {
  const { data } = await api.get<Page<ReviewWithEntity>>(
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
