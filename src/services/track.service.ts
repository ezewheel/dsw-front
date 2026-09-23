import api from "../api/client";

export type TrackDetail = {
  externalId: string;
  title: string;
  duration: number;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_big: string;
  };
};

export const getTrackDetail = async (id: string): Promise<TrackDetail> => {
  const { data } = await api.get<TrackDetail>(`/musical-entity/track/${id}`);
  return data;
};