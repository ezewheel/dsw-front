import { useCallback } from "react";
import { Navigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { getUser } from "../../api/user";
import { useAuth } from "../../context/auth-context";
import { useFetch } from "../../hooks/useFetch";
import NotFound from "../../components/notFound/NotFound";
import ProfileForm from "./components/profileForm/ProfileForm";
import PasswordForm from "./components/passwordForm/PasswordForm";
import ProfileStats from "./components/profileStats/ProfileStats";
import OwnInteractions from "./components/ownInteractions/OwnInteractions";
import "./ProfilePage.css";

const LoadingProfile = () => (
  <p className="app-container profile-page status-message">
    Cargando perfil...
  </p>
);

const OwnProfile = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingProfile />;

  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="app-container profile-page">
      <h1 className="profile-title">Mi perfil</h1>
      <div className="profile-settings">
        <ProfileForm user={user} />
        <PasswordForm />
      </div>
      <ProfileStats />
      <OwnInteractions />
    </div>
  );
};

const UserProfile = ({ id }: { id: string }) => {
  const { data: user, loading, error } = useFetch(
    useCallback(() => getUser(id), [id]),
  );

  if (loading) return <LoadingProfile />;

  if (error || !user) {
    return (
      <div className="app-container profile-page">
        <NotFound
          icon={<FaUser />}
          title="Usuario no encontrado"
          text="No encontramos un usuario con ese id, o el servicio no está disponible en este momento."
        />
      </div>
    );
  }

  return (
    <div className="app-container profile-page">
      <h1 className="profile-title">Perfil</h1>
      <section className="profile-card">
        <dl className="profile-data">
          <dt>Nickname</dt>
          <dd>{user.nickname}</dd>
        </dl>
      </section>
    </div>
  );
};

const ProfilePage = () => {
  const { id } = useParams();
  return id ? <UserProfile id={id} /> : <OwnProfile />;
};

export default ProfilePage;
