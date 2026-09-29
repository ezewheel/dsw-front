import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { getErrorMessage } from "../../api/client";
import { deleteReviewById } from "../../api/reviews";
import { useAuth } from "../../context/auth-context";
import ConfirmModal from "../confirmModal/ConfirmModal";
import ReviewList, { type Review } from "../reviewList/ReviewList";

type ModeratedReviewListProps = {
  reviews: Review[];
  onReviewDeleted: () => void;
};

const ModeratedReviewList = ({
  reviews,
  onReviewDeleted,
}: ModeratedReviewListProps) => {
  const { user } = useAuth();
  const [pendingDelete, setPendingDelete] = useState<Review | null>(null);
  const [error, setError] = useState("");

  if (user?.role !== "moderator") return <ReviewList reviews={reviews} />;

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const reviewId = pendingDelete.id;
    setPendingDelete(null);
    setError("");

    try {
      await deleteReviewById(reviewId);
      onReviewDeleted();
    } catch (deleteError) {
      setError(
        getErrorMessage(
          deleteError,
          "No se pudo eliminar la reseña. Intentalo de nuevo.",
        ),
      );
    }
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <ReviewList
        reviews={reviews}
        renderActions={(review) => (
          <button
            type="button"
            className="app-btn app-btn-danger review-list-action"
            onClick={() => setPendingDelete(review)}
            aria-label={`Eliminar la reseña de ${review.user.nickname}`}
            title="Eliminar reseña"
          >
            <FaTrashAlt aria-hidden="true" />
          </button>
        )}
      />
      {pendingDelete && (
        <ConfirmModal
          title="Eliminar reseña"
          message={`¿Querés eliminar la reseña de ${pendingDelete.user.nickname}? No se puede deshacer.`}
          confirmLabel="Eliminar"
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </>
  );
};

export default ModeratedReviewList;
