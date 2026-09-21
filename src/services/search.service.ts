import api from "../api/client";

export type SearchApiType = "track" | "album" | "artist";

export interface SearchTrack {
  externalId: string;
  type: "track";
  title: string;
  artist: { id: number; name: string };
  album: { id: number; title: string; cover_medium?: string };
  averageRating: number | null;
  reviewsCount: number;
}

export interface SearchAlbum {
  externalId: string;
  type: "album";
  title: string;
  cover_medium?: string;
  artist: { id: number; name: string };
  averageRating: number | null;
  reviewsCount: number;
}

export interface SearchArtist {
  externalId: string;
  type: "artist";
  name: string;
  picture_medium?: string;
  averageRating: number | null;
  reviewsCount: number;
}

export type SearchResult = SearchTrack | SearchAlbum | SearchArtist;

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  hasMore: boolean;
}

export const searchMusicalEntity = async (
  query: string,
  type: SearchApiType,
  options?: { limit?: number; index?: number },
): Promise<SearchResponse> => {
  const { data } = await api.get<SearchResponse>("/musical-entity/search", {
    params: { query, type, ...options },
  });
  return data;
};