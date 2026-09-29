import Modal from "../modal/Modal";
import "./SuspendedAccountModal.css";

const SuspendedAccountModal = ({ onClose }: { onClose: () => void }) => (
  <Modal title="Cuenta suspendida" onClose={onClose}>
    <p className="suspended-account-text">
      Un moderador suspendió tu cuenta. Se cerró tu sesión y ya no vas a poder
      volver a ingresar.
    </p>
    <button
      type="button"
      className="app-btn app-btn-primary app-btn-block"
      onClick={onClose}
    >
      Entendido
    </button>
  </Modal>
);

export default SuspendedAccountModal;
