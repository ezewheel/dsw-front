import { useCallback, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { getUser } from "../../api/user";
import { useAuth } from "../../context/auth-context";
import { useFetch } from "../../hooks/useFetch";
import NotFound from "../../components/notFound/NotFound";
import ProfileForm from "./components/profileForm/ProfileForm";
import PasswordForm from "./components/passwordForm/PasswordForm";
import ProfileStats from "./components/profileStats/ProfileStats";
import OwnReviews from "./components/ownReviews/OwnReviews";
import ProfileHeader from "./components/profileHeader/ProfileHeader";
import "./ProfilePage.css";

const LoadingProfile = () => (
  <p className="app-container profile-page status-message">
    Cargando perfil...
  </p>
);

const OwnProfile = () => {
  const { user, loading } = useAuth();
  const [statsVersion, setStatsVersion] = useState(0);

  if (loading) return <LoadingProfile />;

  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="app-container profile-page">
      <div className="profile-overview">
        <ProfileHeader
          eyebrow="Mi perfil"
          nickname={user.nickname}
          email={user.email}
        >
          <ProfileStats key={statsVersion} />
        </ProfileHeader>
        <div className="profile-settings">
          <ProfileForm user={user} />
          <PasswordForm />
        </div>
      </div>
      <OwnReviews
        onChange={() => setStatsVersion((version) => version + 1)}
      />
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
      <ProfileHeader eyebrow="Perfil" nickname={user.nickname} />
    </div>
  );
};

const ProfilePage = () => {
  const { id } = useParams();
  return id ? <UserProfile id={id} /> : <OwnProfile />;
};

export default ProfilePage;
