import type { OwnReview } from "../../hooks/useOwnReview";
import { focusReviewForm } from "../../utils/review-form";

const ReviewCallToAction = ({ ownReview }: { ownReview: OwnReview }) => (
  <button
    type="button"
    className="app-btn app-btn-primary app-btn-block"
    onClick={focusReviewForm}
    disabled={ownReview.loading}
  >
    {ownReview.review ? "Ver tu reseña" : "Dejá tu reseña"}
  </button>
);

export default ReviewCallToAction;
