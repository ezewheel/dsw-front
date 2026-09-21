import api from "../api/client";
import { searchMusicalEntity } from "./search.service";

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
    id?: number;
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

export const getAlbumIdByTitle = async (
  title: string,
): Promise<string | null> => {
  const response = await searchMusicalEntity(title, "album");
  const results = response.results;
  const normalized = title.trim().toLowerCase();
  const match =
    results.find(
      (r) => r.type === "album" && r.title.trim().toLowerCase() === normalized,
    ) ?? results.find((r) => r.type === "album");

  return match?.type === "album" ? match.externalId : null;
};