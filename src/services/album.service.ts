import api from "../api/client";

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
