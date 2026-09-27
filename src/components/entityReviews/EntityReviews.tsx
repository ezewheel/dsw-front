import { useState } from "react";
import type { MusicalEntityType } from "../../api/musical-entity";
import ReviewForm from "../reviewForm/ReviewForm";
import ReviewList from "../reviewList/ReviewList";
import "./EntityReviews.css";

type EntityReviewsProps = {
  entityType: MusicalEntityType;
  externalId: string;
  onReviewChange: () => void;
};

const EntityReviews = ({
  entityType,
  externalId,
  onReviewChange,
}: EntityReviewsProps) => {
  const [reviewChanges, setReviewChanges] = useState(0);

  return (
    <section className="entity-reviews">
      <h2 className="entity-reviews-title">Reseñas</h2>
      <div className="entity-reviews-layout">
        <div className="entity-reviews-form">
          <ReviewForm
            entityType={entityType}
            externalId={externalId}
            onChange={() => {
              setReviewChanges((count) => count + 1);
              onReviewChange();
            }}
          />
        </div>
        <div className="entity-reviews-list">
          <ReviewList
            key={reviewChanges}
            entityType={entityType}
            externalId={externalId}
          />
        </div>
      </div>
    </section>
  );
};

export default EntityReviews;
