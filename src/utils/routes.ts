import type { SearchApiType } from "../services/search.service";

export const entityPath = (type: SearchApiType, id: string | number): string =>
  `/${type}/${id}`;
