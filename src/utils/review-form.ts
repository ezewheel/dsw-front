import type { MusicalEntityType } from "../api/musical-entity";
import { entityPath } from "./routes";

export const REVIEW_FORM_ID = "review-form";

export const reviewFormPath = (
  type: MusicalEntityType,
  id: string | number,
): string => `${entityPath(type, id)}#${REVIEW_FORM_ID}`;

export const focusReviewForm = () => {
  const reviewForm = document.getElementById(REVIEW_FORM_ID);
  reviewForm?.scrollIntoView({ behavior: "smooth", block: "start" });
  reviewForm?.focus({ preventScroll: true });
};
