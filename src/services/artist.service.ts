import api from "../api/client";
import { searchMusicalEntity } from "./search.service";

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
};

export type ArtistDetail = {
  externalId: string;
  name: string;
  picture_big: string;
  topTracks: ArtistTopTrack[];
  albums: ArtistAlbum[];
};

export const getArtistDetail = async (id: string): Promise<ArtistDetail> => {
  const { data } = await api.get<ArtistDetail>(`/musical-entity/artist/${id}`);
  return data;
};

export const getArtistIdByName = async (
  name: string,
): Promise<string | null> => {
  const response = await searchMusicalEntity(name, "artist");
  const results = response.results;
  const normalized = name.trim().toLowerCase();
  const match =
    results.find(
      (r) => r.type === "artist" && r.name.trim().toLowerCase() === normalized,
    ) ?? results.find((r) => r.type === "artist");

  return match?.type === "artist" ? match.externalId : null;
};