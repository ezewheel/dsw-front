import type { IconType } from "react-icons";
import { FaCompactDisc, FaMicrophone, FaMusic, FaUser } from "react-icons/fa";
import type { MusicalEntityType } from "../api/musical-entity";

export type SearchType = MusicalEntityType | "user";

export const SEARCH_TYPES: Record<
  SearchType,
  { label: string; pluralLabel: string; icon: IconType }
> = {
  track: { label: "Canción", pluralLabel: "Canciones", icon: FaMusic },
  album: { label: "Álbum", pluralLabel: "Álbumes", icon: FaCompactDisc },
  artist: { label: "Artista", pluralLabel: "Artistas", icon: FaMicrophone },
  user: { label: "Usuario", pluralLabel: "Usuarios", icon: FaUser },
};

export const isSearchType = (value: string | null): value is SearchType =>
  value !== null && Object.hasOwn(SEARCH_TYPES, value);
