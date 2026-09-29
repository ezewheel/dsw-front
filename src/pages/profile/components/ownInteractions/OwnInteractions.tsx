import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaMusic, FaPen } from "react-icons/fa";
import { ENTITY_TYPE_LABELS } from "../../../../api/musical-entity";
import type { ReviewWithEntity } from "../../../../api/reviews";
import { getOwnInteractions } from "../../../../api/user";
import Pagination from "../../../../components/pagination/Pagination";
import StarRating from "../../../../components/starRating/StarRating";
import { useFetch } from "../../../../hooks/useFetch";
import { formatDate } from "../../../../utils/format";
import { reviewFormPath } from "../../../../utils/review-form";
import { entityPath } from "../../../../utils/routes";
import "./OwnInteractions.css";

const PAGE_SIZE = 10;

const OwnInteraction = ({ interaction }: { interaction: ReviewWithEntity }) => {
  const { entity } = interaction;
  const title = entity.title ?? "Contenido no disponible";

  return (
    <li className="own-interaction">
      {entity.cover ? (
        <img className="own-interaction-cover" src={entity.cover} alt="" />
      ) : (
        <span className="own-interaction-cover" aria-hidden="true">
          <FaMusic />
        </span>
      )}
      <div className="own-interaction-body">
        <p className="own-interaction-entity">
          <Link
            to={entityPath(entity.type, entity.externalId)}
            className="own-interaction-title"
          >
            {title}
          </Link>
          {" · "}
          {ENTITY_TYPE_LABELS[entity.type]}
        </p>
        <StarRating value={interaction.value} readOnly size="sm" />
        {interaction.content ? (
          <p className="own-interaction-text">{interaction.content}</p>
        ) : (
          <p className="own-interaction-text own-interaction-empty">
            Sin opinión escrita.
          </p>
        )}
        <span className="own-interaction-date">
          {formatDate(interaction.updatedAt)}
        </span>
      </div>
      <Link
        to={reviewFormPath(entity.type, entity.externalId)}
        className="app-btn own-interaction-edit"
        aria-label={`Editar o eliminar tu reseña de ${title}`}
      >
        <FaPen className="own-interaction-edit-icon" aria-hidden="true" />
        Editar o eliminar
      </Link>
    </li>
  );
};

const OwnInteractions = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch(
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

  return (
    <section className="profile-card own-interactions">
      <h2 className="profile-section-title">Mis interacciones</h2>
      <div
        ref={listRef}
        className={`own-interactions-list${loading ? " own-interactions-list-loading" : ""}`}
        aria-busy={loading}
      >
        {!data && loading && (
          <p className="status-message">Cargando interacciones...</p>
        )}
        {error && (
          <p className="status-message">
            No se pudieron cargar tus interacciones.
          </p>
        )}
        {!error && data?.items.length === 0 && (
          <p className="status-message">
            Todavía no calificaste ni reseñaste nada.
          </p>
        )}
        {!error && data && data.items.length > 0 && (
          <>
            <ul className="own-interactions-items">
              {data.items.map((interaction) => (
                <OwnInteraction
                  key={interaction.id}
                  interaction={interaction}
                />
              ))}
            </ul>
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={changePage}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default OwnInteractions;
