import api from "../api/client";

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
