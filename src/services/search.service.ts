import api from "../api/client";

export type SearchApiType = "track" | "album" | "artist";

export interface SearchTrack {
  externalId: string;
  type: "track";
  title: string;
  artist: { name: string };
  album: { cover_medium: string };
  averageRating: number | null;
}

export interface SearchAlbum {
  externalId: string;
  type: "album";
  title: string;
  artist: { name: string };
  album: { cover_medium: string };
  averageRating: number | null;
}

export interface SearchArtist {
  externalId: string;
  type: "artist";
  name: string;
  picture_medium: string;
  averageRating: number | null;
}

export type SearchResult = SearchTrack | SearchAlbum | SearchArtist;

export const searchMusicalEntity = async (
  query: string,
  type: SearchApiType,
): Promise<SearchResult[]> => {
  const { data } = await api.get<{ results: SearchResult[] }>(
    "/musical-entity/search",
    { params: { query, type } },
  );
  return data.results;
};