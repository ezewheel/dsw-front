import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import "./Profile.css";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="app-container loading-message">Cargando perfil...</p>;
  }

  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="app-container profile-page">
      <section className="profile-card">
        <h1 className="profile-title">Mi perfil</h1>
        <dl className="profile-data">
          <dt>Nickname</dt>
          <dd>{user.nickname}</dd>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </dl>
      </section>
    </div>
  );
};

export default Profile;
