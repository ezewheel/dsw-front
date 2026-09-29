import { useState } from "react";
import { FaBan } from "react-icons/fa";
import { getErrorMessage } from "../../../../api/client";
import { banUser, type UserDetail } from "../../../../api/user";
import ConfirmModal from "../../../../components/confirmModal/ConfirmModal";
import "./BanUserButton.css";

type BanUserButtonProps = {
  user: UserDetail;
  onBanned: () => void;
};

const BanUserButton = ({ user, onBanned }: BanUserButtonProps) => {
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const confirmBan = async () => {
    setConfirming(false);
    setPending(true);
    setError("");

    try {
      await banUser(user.id);
      onBanned();
    } catch (banError) {
      setError(getErrorMessage(banError, "No se pudo banear al usuario."));
      setPending(false);
    }
  };

  return (
    <div className="ban-user">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <button
        type="button"
        className="app-btn app-btn-danger ban-user-button"
        onClick={() => setConfirming(true)}
        disabled={pending}
      >
        <FaBan aria-hidden="true" />
        {pending ? "Baneando..." : "Banear usuario"}
      </button>
      {confirming && (
        <ConfirmModal
          title="Banear usuario"
          message={`¿Querés banear a ${user.nickname}? Se van a eliminar todas sus reseñas y no va a poder volver a ingresar. No se puede deshacer.`}
          confirmLabel="Banear"
          onConfirm={confirmBan}
          onCancel={() => setConfirming(false)}
        />
      )}
    </div>
  );
};

export default BanUserButton;
