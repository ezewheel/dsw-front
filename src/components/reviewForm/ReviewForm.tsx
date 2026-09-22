import { useState, type FormEvent } from "react";
import { useAuth } from "../../context/auth-context";
import { useAuthModals } from "../authModals/auth-modals-context";
import {
  createReview,
  type CreateReviewInput,
} from "../../services/reviews.service";
import type { SearchApiType } from "../../services/search.service";
import StarRating from "../starRating/StarRating";
import "./ReviewForm.css";

type ReviewFormProps = {
  entityType: SearchApiType;
  externalId: string;
  onSubmitted?: () => void;
  initialValue?: number;
  initialContent?: string;
};

const ReviewForm = ({
  entityType,
  externalId,
  onSubmitted,
  initialValue = 0,
  initialContent = "",
}: ReviewFormProps) => {
  const { user } = useAuth();
  const { openLogin } = useAuthModals();

  const [value, setValue] = useState(initialValue);
  const [content, setContent] = useState(initialContent);
  const [validated, setValidated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="review-form review-form-login">
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value === 0) {
      setValidated(true);
      return;
    }

    setSubmitting(true);
    setError("");

    const input: CreateReviewInput = {
      value,
      content: content.trim() || undefined,
    };

    try {
      await createReview(entityType, externalId, input);
      setValue(0);
      setContent("");
      setValidated(false);
      onSubmitted?.();
    } catch {
      setError("No se pudo guardar tu reseña. Intentalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className={`review-form${validated ? " was-validated" : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-field">
        <span className="form-label" id="review-form-rating-label">
          Tu puntuación
        </span>
        <StarRating value={value} onChange={setValue} size="md" />
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