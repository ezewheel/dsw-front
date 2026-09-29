import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { getErrorMessage } from "../../../../api/client";
import { deleteReview, type ReviewWithEntity } from "../../../../api/reviews";
import { getOwnInteractions } from "../../../../api/user";
import DeleteReviewModal from "../../../../components/deleteReviewModal/DeleteReviewModal";
import Pagination from "../../../../components/pagination/Pagination";
import ReviewList from "../../../../components/reviewList/ReviewList";
import { useFetch } from "../../../../hooks/useFetch";
import { reviewFormPath } from "../../../../utils/review-form";
import "./OwnReviews.css";

const PAGE_SIZE = 10;

type OwnReviewsProps = {
  onChange: () => void;
};

const OwnReviews = ({ onChange }: OwnReviewsProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState<ReviewWithEntity | null>(
    null,
  );
  const [deleteError, setDeleteError] = useState("");
  const { data, loading, error, reload } = useFetch(
    useCallback(
      () => getOwnInteractions({ page, pageSize: PAGE_SIZE }),
      [page],
    ),
    { keepPreviousData: true },
  );

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const { entity } = pendingDelete;
    const wasLastOnPage = data?.items.length === 1 && page > 1;
    setPendingDelete(null);
    setDeleteError("");

    try {
      await deleteReview(entity.type, entity.externalId);
      if (wasLastOnPage) setPage(page - 1);
      else reload();
      onChange();
    } catch (deleteFailure) {
      setDeleteError(
        getErrorMessage(
          deleteFailure,
          "No se pudo eliminar tu reseña. Intentalo de nuevo.",
        ),
      );
    }
  };

  const renderActions = (review: ReviewWithEntity) => {
    const { entity } = review;
    const title = entity.title ?? "este contenido";

    return (
      <div className="own-reviews-actions">
        <Link
          to={reviewFormPath(entity.type, entity.externalId)}
          className="app-btn app-btn-secondary own-reviews-action"
          aria-label={`Editar tu reseña de ${title}`}
        >
          <FaPen aria-hidden="true" />
          Editar
        </Link>
        <button
          type="button"
          className="app-btn app-btn-danger own-reviews-action"
          onClick={() => setPendingDelete(review)}
          aria-label={`Eliminar tu reseña de ${title}`}
          title="Eliminar"
        >
          <FaTrashAlt aria-hidden="true" />
        </button>
      </div>
    );
  };

  return (
    <section className="own-reviews">
      <h2 className="own-reviews-title">Mis reseñas</h2>
      {deleteError && (
        <div className="alert alert-danger" role="alert">
          {deleteError}
        </div>
      )}
      <div
        ref={listRef}
        className={`own-reviews-list${loading ? " own-reviews-list-loading" : ""}`}
        aria-busy={loading}
      >
        {!data && loading && (
          <p className="status-message">Cargando reseñas...</p>
        )}
        {error && (
          <p className="status-message">
            No se pudieron cargar tus reseñas.
          </p>
        )}
        {!error && data?.items.length === 0 && (
          <p className="status-message">
            Todavía no calificaste ni reseñaste nada.
          </p>
        )}
        {!error && data && data.items.length > 0 && (
          <>
            <ReviewList reviews={data.items} renderActions={renderActions} />
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={changePage}
            />
          </>
        )}
      </div>

      {pendingDelete && (
        <DeleteReviewModal
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </section>
  );
};

export default OwnReviews;
