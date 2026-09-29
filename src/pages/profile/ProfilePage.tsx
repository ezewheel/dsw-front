import { useCallback } from "react";
import { Navigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { getUser } from "../../api/users";
import { useAuth } from "../../context/auth-context";
import { useFetch } from "../../hooks/useFetch";
import NotFound from "../../components/notFound/NotFound";
import "./ProfilePage.css";

type ProfileCardProps = {
  title: string;
  nickname: string;
  email?: string;
};

const ProfileCard = ({ title, nickname, email }: ProfileCardProps) => (
  <div className="app-container profile-page">
    <section className="profile-card">
      <h1 className="profile-title">{title}</h1>
      <dl className="profile-data">
        <dt>Nickname</dt>
        <dd>{nickname}</dd>
        {email && (
          <>
            <dt>Email</dt>
            <dd>{email}</dd>
          </>
        )}
      </dl>
    </section>
  </div>
);

const OwnProfile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="app-container profile-page status-message">Cargando perfil...</p>;
  }

  if (!user) return <Navigate to="/" replace />;

  return (
    <ProfileCard
      title="Mi perfil"
      nickname={user.nickname}
      email={user.email}
    />
  );
};

const UserProfile = ({ id }: { id: string }) => {
  const { data: user, loading, error } = useFetch(
    useCallback(() => getUser(id), [id]),
  );

  if (loading) {
    return <p className="app-container profile-page status-message">Cargando perfil...</p>;
  }

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

  return <ProfileCard title="Perfil" nickname={user.nickname} />;
};

const ProfilePage = () => {
  const { id } = useParams();
  return id ? <UserProfile id={id} /> : <OwnProfile />;
};

export default ProfilePage;
