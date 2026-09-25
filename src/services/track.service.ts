import api from "../api/client";

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