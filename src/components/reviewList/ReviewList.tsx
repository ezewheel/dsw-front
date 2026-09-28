import { Link } from "react-router-dom";
import {
  ENTITY_TYPE_LABELS,
  type EntitySummary,
} from "../../api/musical-entity";
import type { EntityReview } from "../../api/reviews";
import { formatDate } from "../../utils/format";
import { entityPath } from "../../utils/routes";
import StarRating from "../starRating/StarRating";
import "./ReviewList.css";

type ReviewListProps = {
  reviews: (EntityReview & { entity?: EntitySummary })[];
};

const ReviewList = ({ reviews }: ReviewListProps) => (
  <div className="review-list">
    {reviews.map((review) => (
      <article className="review-list-item" key={review.id}>
        <span className="review-list-avatar" aria-hidden="true">
          {review.user.nickname.charAt(0).toUpperCase()}
        </span>
        <div className="review-list-body">
          <div className="review-list-header">
            <span className="review-list-author">{review.user.nickname}</span>
            <StarRating value={review.value} readOnly size="sm" />
          </div>
          {review.entity && (
            <p className="review-list-entity">
              <Link
                to={entityPath(review.entity.type, review.entity.externalId)}
                className="review-list-entity-link"
              >
                {review.entity.title ?? "Contenido no disponible"}
              </Link>
              {" · "}
              {ENTITY_TYPE_LABELS[review.entity.type]}
            </p>
          )}
          {review.content && (
            <p className="review-list-text">{review.content}</p>
          )}
          <span className="review-list-date">
            {formatDate(review.updatedAt)}
          </span>
        </div>
      </article>
    ))}
  </div>
);

export default ReviewList;
