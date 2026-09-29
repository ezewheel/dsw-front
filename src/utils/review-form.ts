import type { MusicalEntityType } from "../api/musical-entity";
import { entityPath } from "./routes";

export const REVIEW_FORM_ID = "review-form";

const LAYOUT_SETTLE_MS = 300;

export const reviewFormPath = (
  type: MusicalEntityType,
  id: string | number,
): string => `${entityPath(type, id)}#${REVIEW_FORM_ID}`;

export const focusReviewForm = () => {
  const reviewForm = document.getElementById(REVIEW_FORM_ID);
  reviewForm?.scrollIntoView({ behavior: "smooth", block: "start" });
  reviewForm?.focus({ preventScroll: true });
};

export const focusReviewFormOnceSettled = () => {
  let timer = 0;
  const observer = new ResizeObserver(() => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      observer.disconnect();
      focusReviewForm();
    }, LAYOUT_SETTLE_MS);
  });
  observer.observe(document.body);

  return () => {
    observer.disconnect();
    window.clearTimeout(timer);
  };
};
