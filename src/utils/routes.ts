import type { MusicalEntityType } from "../api/musical-entity";
import type { SearchType } from "./search";

export const entityPath = (type: MusicalEntityType, id: string | number): string =>
  `/${type}/${id}`;

export const userPath = (id: number): string => `/user/${id}`;

export const searchPath = (query: string, type: SearchType): string =>
  `/search?query=${encodeURIComponent(query)}&type=${type}`;
