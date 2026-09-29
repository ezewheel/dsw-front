import Modal from "../modal/Modal";
import "./DeleteReviewModal.css";

type DeleteReviewModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteReviewModal = ({ onConfirm, onCancel }: DeleteReviewModalProps) => (
  <Modal title="Eliminar reseña" onClose={onCancel}>
    <p className="delete-review-modal-text">
      ¿Querés eliminar tu reseña? No se puede deshacer.
    </p>
    <div className="delete-review-modal-actions">
      <button
        type="button"
        className="app-btn app-btn-secondary"
        onClick={onCancel}
      >
        Cancelar
      </button>
      <button
        type="button"
        className="app-btn app-btn-danger"
        onClick={onConfirm}
      >
        Eliminar
      </button>
    </div>
  </Modal>
);

export default DeleteReviewModal;
