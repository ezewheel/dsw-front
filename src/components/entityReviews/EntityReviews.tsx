import { useState } from "react";
import type { MusicalEntityType } from "../../api/musical-entity";
import ReviewForm from "../reviewForm/ReviewForm";
import ReviewList from "../reviewList/ReviewList";
import "./EntityReviews.css";

type EntityReviewsProps = {
  entityType: MusicalEntityType;
  externalId: string;
  onReviewSaved: () => void;
};

const EntityReviews = ({
  entityType,
  externalId,
  onReviewSaved,
}: EntityReviewsProps) => {
  const [savedReviews, setSavedReviews] = useState(0);

  return (
    <section className="entity-reviews">
      <h2 className="entity-reviews-title">Reseñas</h2>
      <div className="entity-reviews-layout">
        <div className="entity-reviews-form">
          <ReviewForm
            entityType={entityType}
            externalId={externalId}
            onSubmitted={() => {
              setSavedReviews((count) => count + 1);
              onReviewSaved();
            }}
          />
        </div>
        <div className="entity-reviews-list">
          <ReviewList
            key={savedReviews}
            entityType={entityType}
            externalId={externalId}
          />
        </div>
      </div>
    </section>
  );
};

export default EntityReviews;
