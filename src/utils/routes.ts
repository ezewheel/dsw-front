import type { MusicalEntityType } from "../api/musical-entity";

export const entityPath = (type: MusicalEntityType, id: string | number): string =>
  `/${type}/${id}`;
