import { useCallback } from "react";
import type { MusicalEntityType } from "../../api/musical-entity";
import { getOwnReview } from "../../api/reviews";
import { useAuth } from "../../context/auth-context";
import { useFetch } from "../../hooks/useFetch";
import { focusReviewForm } from "../../utils/review-form";

type ReviewCallToActionProps = {
  entityType: MusicalEntityType;
  externalId: string;
};

const ReviewCallToAction = ({
  entityType,
  externalId,
}: ReviewCallToActionProps) => {
  const { user } = useAuth();
  const { data: ownReview, loading } = useFetch(
    useCallback(
      () =>
        user ? getOwnReview(entityType, externalId) : Promise.resolve(null),
      [user, entityType, externalId],
    ),
  );

  return (
    <button
      type="button"
      className="app-btn app-btn-primary app-btn-block"
      onClick={focusReviewForm}
      disabled={loading}
    >
      {ownReview ? "Ver tu reseña" : "Dejá tu reseña"}
    </button>
  );
};

export default ReviewCallToAction;
