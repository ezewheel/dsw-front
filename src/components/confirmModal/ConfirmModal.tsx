import Modal from "../modal/Modal";
import "./ConfirmModal.css";

type ConfirmModalProps = {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => (
  <Modal title={title} onClose={onCancel}>
    <p className="confirm-modal-text">{message}</p>
    <div className="confirm-modal-actions">
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
        {confirmLabel}
      </button>
    </div>
  </Modal>
);

export default ConfirmModal;
