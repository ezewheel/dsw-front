import api from "../api/client";
import type { SearchApiType } from "./search.service";

export interface TopRatedItem {
  externalId: string;
  type: SearchApiType;
  title: string | null;
  cover: string | null;
  artist: string | null;
  averageRating: number;
  reviewsCount: number;
}

export interface TopRated {
  artists: TopRatedItem[];
  albums: TopRatedItem[];
  tracks: TopRatedItem[];
}

export const getTopRated = async (): Promise<TopRated> => {
  const { data } = await api.get<TopRated>("/musical-entity/top-rated");
  return data;
};