import { useCallback } from "react";
import type { MusicalEntityType } from "../api/musical-entity";
import { getOwnReview } from "../api/reviews";
import { useAuth } from "../context/auth-context";
import { useFetch } from "./useFetch";

export type OwnReview = ReturnType<typeof useOwnReview>;

export const useOwnReview = (
  entityType: MusicalEntityType,
  externalId: string,
) => {
  const { user } = useAuth();
  const { data, loading, reload } = useFetch(
    useCallback(
      () =>
        user ? getOwnReview(entityType, externalId) : Promise.resolve(null),
      [user, entityType, externalId],
    ),
  );

  return { review: data, loading, reload };
};
