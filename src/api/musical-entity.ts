import api from "./client";

export type MusicalEntityType = "track" | "album" | "artist";

export const ENTITY_TYPE_LABELS: Record<MusicalEntityType, string> = {
  track: "canción",
  album: "álbum",
  artist: "artista",
};

export type EntitySummary = {
  externalId: string;
  type: MusicalEntityType;
  title: string | null;
  cover: string | null;
  artist: string | null;
  averageRating: number | null;
  ratingsCount: number;
};

export interface SearchResponse {
  results: EntitySummary[];
  total: number;
}

export const searchMusicalEntity = async (
  query: string,
  type: MusicalEntityType,
  options?: { limit?: number; index?: number },
): Promise<SearchResponse> => {
  const { data } = await api.get<SearchResponse>("/musical-entity/search", {
    params: { query, type, ...options },
  });
  return data;
};

export interface TopRated {
  artists: EntitySummary[];
  albums: EntitySummary[];
  tracks: EntitySummary[];
}

export const getTopRated = async (): Promise<TopRated> => {
  const { data } = await api.get<TopRated>("/musical-entity/top-rated");
  return data;
};

export type AlbumSong = {
  externalId: string;
  title: string;
  duration: number;
  averageRating: number | null;
};

export type AlbumDetail = {
  externalId: string;
  title: string;
  cover_big: string;
  cover_medium: string;
  release_date: string;
  artist: {
    id: number;
    name: string;
  };
  averageRating: number | null;
  duration: number;
  songs: AlbumSong[];
};

export const getAlbumDetail = async (id: string): Promise<AlbumDetail> => {
  const { data } = await api.get<AlbumDetail>(`/musical-entity/album/${id}`);
  return data;
};

export type ArtistTopTrack = {
  externalId: string;
  title: string;
  album: {
    title: string;
    cover_medium: string;
  };
  averageRating: number | null;
};

export type ArtistAlbum = {
  externalId: string;
  title: string;
  cover_big: string;
  release_date: string;
  averageRating: number | null;
};

export type ArtistDetail = {
  externalId: string;
  name: string;
  picture_big: string;
  averageRating: number | null;
  topTracks: ArtistTopTrack[];
  albums: ArtistAlbum[];
};

export const getArtistDetail = async (id: string): Promise<ArtistDetail> => {
  const { data } = await api.get<ArtistDetail>(`/musical-entity/artist/${id}`);
  return data;
};

export type TrackDetail = {
  externalId: string;
  title: string;
  duration: number;
  artist: {
    id: number;
    name: string;
  };
  album: {
    id: number;
    title: string;
    cover_big: string;
  };
  averageRating: number | null;
  ratingsCount: number;
};

export const getTrackDetail = async (id: string): Promise<TrackDetail> => {
  const { data } = await api.get<TrackDetail>(`/musical-entity/track/${id}`);
  return data;
};
