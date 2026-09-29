import { useCallback, useState, type FormEvent } from "react";
import { getErrorMessage } from "../../api/client";
import { useAuth } from "../../context/auth-context";
import { useAuthModals } from "../authModals/auth-modals-context";
import {
  createReview,
  deleteReview,
  getOwnReview,
  type EntityReview,
} from "../../api/reviews";
import type { MusicalEntityType } from "../../api/musical-entity";
import { useFetch } from "../../hooks/useFetch";
import { formatShortDate } from "../../utils/format";
import Modal from "../modal/Modal";
import StarRating from "../starRating/StarRating";
import "./ReviewForm.css";

type ReviewFormProps = {
  entityType: MusicalEntityType;
  externalId: string;
  onChange: () => void;
};

const ReviewForm = ({ entityType, externalId, onChange }: ReviewFormProps) => {
  const { user } = useAuth();
  const { openLogin } = useAuthModals();
  const { data: ownReview, loading } = useFetch(
    useCallback(
      () =>
        user ? getOwnReview(entityType, externalId) : Promise.resolve(null),
      [user, entityType, externalId],
    ),
  );

  if (!user) {
    return (
      <div className="review-form">
        <h3 className="review-form-title">Dejá tu reseña</h3>
        <p className="review-form-login-text">
          Iniciá sesión para dejar tu reseña.
        </p>
        <button
          type="button"
          className="app-btn app-btn-primary"
          onClick={openLogin}
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="review-form">
        <p className="status-message">Cargando tu reseña...</p>
      </div>
    );
  }

  return (
    <ReviewEditor
      entityType={entityType}
      externalId={externalId}
      ownReview={ownReview}
      onChange={onChange}
    />
  );
};

const TITLES = {
  new: "Dejá tu reseña",
  view: "Tu reseña",
  edit: "Editá tu reseña",
};

type ReviewEditorProps = {
  entityType: MusicalEntityType;
  externalId: string;
  ownReview: EntityReview | null;
  onChange: () => void;
};

type SavedReview = {
  value: number;
  content: string;
  publishedAt: string;
};

const ReviewEditor = ({
  entityType,
  externalId,
  ownReview,
  onChange,
}: ReviewEditorProps) => {
  const [saved, setSaved] = useState<SavedReview | null>(
    ownReview && {
      value: ownReview.value,
      content: ownReview.content ?? "",
      publishedAt: ownReview.updatedAt,
    },
  );
  const [value, setValue] = useState(saved?.value ?? 0);
  const [content, setContent] = useState(saved?.content ?? "");
  const [editing, setEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const mode = !saved ? "new" : editing ? "edit" : "view";
  const readOnly = mode === "view";

  const hasChanges =
    !saved || value !== saved.value || content.trim() !== saved.content;

  const startEditing = () => {
    setNotice("");
    setError("");
    setEditing(true);
  };

  const discardChanges = () => {
    if (!saved) return;
    setValue(saved.value);
    setContent(saved.content);
    setValidated(false);
    setError("");
    setEditing(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value === 0) {
      setValidated(true);
      return;
    }

    setPending(true);
    setError("");
    setNotice("");

    try {
      const trimmedContent = content.trim();
      const review = await createReview(entityType, externalId, {
        value,
        content: trimmedContent || undefined,
      });
      setNotice(saved ? "Reseña actualizada." : "¡Reseña publicada!");
      setSaved({
        value,
        content: trimmedContent,
        publishedAt: review.updatedAt,
      });
      setContent(trimmedContent);
      setValidated(false);
      setEditing(false);
      onChange();
    } catch (saveError) {
      setError(
        getErrorMessage(
          saveError,
          "No se pudo guardar tu reseña. Intentalo de nuevo.",
        ),
      );
    } finally {
      setPending(false);
    }
  };

  const handleDelete = async () => {
    setConfirmingDelete(false);
    setPending(true);
    setError("");
    setNotice("");

    try {
      await deleteReview(entityType, externalId);
      setSaved(null);
      setValue(0);
      setContent("");
      setNotice("Reseña eliminada.");
      onChange();
    } catch (deleteError) {
      setError(
        getErrorMessage(
          deleteError,
          "No se pudo eliminar tu reseña. Intentalo de nuevo.",
        ),
      );
    } finally {
      setPending(false);
    }
  };

  const alerts = (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {notice && (
        <div className="alert alert-success" role="status">
          {notice}
        </div>
      )}
    </>
  );

  return (
    <>
      <form
        className={`review-form review-form-${mode}${validated ? " was-validated" : ""}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <div key={`heading-${mode}`} className="review-form-fade">
          <h3 className="review-form-title">{TITLES[mode]}</h3>
          {saved && (
            <p className="review-form-hint">
              Publicada el {formatShortDate(saved.publishedAt)}
            </p>
          )}
        </div>

        <div className="form-field">
          <span className="form-label" id="review-form-rating-label">
            Tu puntuación
          </span>
          <div className="review-form-rating">
            <StarRating
              value={value}
              onChange={setValue}
              readOnly={readOnly}
              size="md"
            />
            {!readOnly && value > 0 && (
              <button
                type="button"
                className="review-form-clear"
                onClick={() => setValue(0)}
              >
                Limpiar
              </button>
            )}
          </div>
          {validated && value === 0 && (
            <p className="form-feedback form-feedback-visible" role="alert">
              Elegí una puntuación, puede ser de a media estrella.
            </p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="review-form-content">
            Tu opinión
          </label>
          <textarea
            id="review-form-content"
            rows={4}
            className="form-input"
            placeholder={
              readOnly ? "Sin opinión escrita." : "Dejá tu opinión (opcional)"
            }
            value={content}
            onChange={(event) => setContent(event.target.value)}
            readOnly={readOnly}
            maxLength={1000}
          />
          <p className="review-form-hint review-form-limit">
            Tu reseña puede tener hasta 1000 caracteres.
          </p>
        </div>

        {alerts}

        <div
          key={`actions-${mode}`}
          className="review-form-actions review-form-fade"
        >
          {readOnly ? (
            <>
              <button
                type="button"
                className="app-btn app-btn-primary"
                onClick={startEditing}
                disabled={pending}
              >
                Editar reseña
              </button>
              <button
                type="button"
                className="app-btn review-form-delete"
                onClick={() => setConfirmingDelete(true)}
                disabled={pending}
              >
                Eliminar reseña
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="app-btn app-btn-primary"
                disabled={pending || !hasChanges}
              >
                {saved ? "Guardar cambios" : "Publicar reseña"}
              </button>
              {saved && (
                <button
                  type="button"
                  className="app-btn review-form-secondary"
                  onClick={discardChanges}
                  disabled={pending}
                >
                  Descartar cambios
                </button>
              )}
            </>
          )}
        </div>
      </form>

      {confirmingDelete && (
        <Modal
          title="Eliminar reseña"
          onClose={() => setConfirmingDelete(false)}
        >
          <p className="review-form-confirm-text">
            ¿Querés eliminar tu reseña? No se puede deshacer.
          </p>
          <div className="review-form-confirm-actions">
            <button
              type="button"
              className="app-btn review-form-secondary"
              onClick={() => setConfirmingDelete(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="app-btn review-form-delete"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ReviewForm;
