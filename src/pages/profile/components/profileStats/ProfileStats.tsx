import { getProfile } from "../../../../api/user";
import { useFetch } from "../../../../hooks/useFetch";
import { formatCount } from "../../../../utils/format";

const ProfileStats = () => {
  const { data: profile, loading, error } = useFetch(getProfile);

  return (
    <section className="profile-card profile-stats">
      <h2 className="profile-section-title">Actividad</h2>
      {loading && <p className="status-message">Cargando...</p>}
      {error && (
        <p className="status-message">No se pudo cargar tu actividad.</p>
      )}
      {profile && (
        <p className="profile-stats-total">
          {formatCount(
            profile.interactionsCount,
            "interacción",
            "interacciones",
          )}
        </p>
      )}
    </section>
  );
};

export default ProfileStats;
