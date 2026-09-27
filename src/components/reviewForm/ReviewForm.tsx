import { useState, type FormEvent } from "react";
import { getErrorMessage } from "../../api/client";
import { useAuth } from "../../context/auth-context";
import { useAuthModals } from "../authModals/auth-modals-context";
import {
  createReview,
  type CreateReviewInput,
} from "../../api/reviews";
import type { MusicalEntityType } from "../../api/musical-entity";
import StarRating from "../starRating/StarRating";
import "./ReviewForm.css";

type ReviewFormProps = {
  entityType: MusicalEntityType;
  externalId: string;
  onSubmitted?: () => void;
};

const ReviewForm = ({
  entityType,
  externalId,
  onSubmitted,
}: ReviewFormProps) => {
  const { user } = useAuth();
  const { openLogin } = useAuthModals();

  const [value, setValue] = useState(0);
  const [content, setContent] = useState("");
  const [validated, setValidated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value === 0) {
      setValidated(true);
      return;
    }

    setSubmitting(true);
    setError("");
    setSaved(false);

    const input: CreateReviewInput = {
      value,
      content: content.trim() || undefined,
    };

    try {
      await createReview(entityType, externalId, input);
      setValue(0);
      setContent("");
      setValidated(false);
      setSaved(true);
      onSubmitted?.();
    } catch (saveError) {
      setError(
        getErrorMessage(
          saveError,
          "No se pudo guardar tu reseña. Intentalo de nuevo.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  };

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

  return (
    <form
      className={`review-form${validated ? " was-validated" : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <h3 className="review-form-title">Dejá tu reseña</h3>

      <div className="form-field">
        <span className="form-label" id="review-form-rating-label">
          Tu puntuación
        </span>
        <div className="review-form-rating">
          <StarRating value={value} onChange={setValue} size="md" />
          {value > 0 && (
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
          placeholder="Dejá tu opinión (opcional)"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          maxLength={1000}
        />
        <p className="review-form-hint">
          Tu reseña puede tener hasta 1000 caracteres.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {saved && (
        <div className="alert alert-success" role="status">
          ¡Reseña publicada!
        </div>
      )}

      <button
        type="submit"
        className="app-btn app-btn-primary"
        disabled={submitting}
      >
        {submitting ? "Publicando..." : "Publicar reseña"}
      </button>
    </form>
  );
};

export default ReviewForm;
