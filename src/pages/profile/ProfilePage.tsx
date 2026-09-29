import { useCallback, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { FaUser, FaUserSlash } from "react-icons/fa";
import { getProfile, getUser } from "../../api/user";
import { useAuth } from "../../context/auth-context";
import { useFetch } from "../../hooks/useFetch";
import NotFound from "../../components/notFound/NotFound";
import ProfileForm from "./components/profileForm/ProfileForm";
import PasswordForm from "./components/passwordForm/PasswordForm";
import ProfileStats from "./components/profileStats/ProfileStats";
import OwnReviews from "./components/ownReviews/OwnReviews";
import ProfileHeader from "./components/profileHeader/ProfileHeader";
import UserReviews from "./components/userReviews/UserReviews";
import BanUserButton from "./components/banUserButton/BanUserButton";
import "./ProfilePage.css";

const LoadingProfile = () => (
  <p className="app-container profile-page status-message">
    Cargando perfil...
  </p>
);

const OwnProfile = () => {
  const { user, loading } = useAuth();
  const { data: profile, reload: reloadProfile } = useFetch(
    useCallback(() => (user ? getProfile() : Promise.resolve(null)), [user]),
    { keepPreviousData: true },
  );

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
          {profile && (
            <ProfileStats
              reviewsCount={profile.interactionsCount}
              createdAt={profile.createdAt}
            />
          )}
        </ProfileHeader>
        <div className="profile-settings">
          <ProfileForm user={user} />
          <PasswordForm />
        </div>
      </div>
      <OwnReviews onChange={reloadProfile} />
    </div>
  );
};

const UserProfile = ({ id }: { id: string }) => {
  const { user: viewer } = useAuth();
  const [banned, setBanned] = useState(false);
  const { data: user, loading, error, reload } = useFetch(
    useCallback(() => getUser(id), [id]),
  );

  if (viewer?.id === Number(id)) return <Navigate to="/profile" replace />;

  if (loading) return <LoadingProfile />;

  if (banned) {
    return (
      <div className="app-container profile-page">
        <NotFound
          icon={<FaUserSlash />}
          title="Usuario baneado"
          text="Se eliminaron todas sus reseñas y ya no puede ingresar a su cuenta."
        />
      </div>
    );
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

  const canBan = viewer?.role === "moderator" && user.role === "user";

  return (
    <div className="app-container profile-page">
      <div className="profile-overview">
        <ProfileHeader eyebrow="Perfil" nickname={user.nickname}>
          <ProfileStats
            reviewsCount={user.interactionsCount}
            createdAt={user.createdAt}
          />
          {canBan && (
            <BanUserButton user={user} onBanned={() => setBanned(true)} />
          )}
        </ProfileHeader>
        <UserReviews userId={id} onReviewDeleted={reload} />
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const { id } = useParams();
  return id ? <UserProfile key={id} id={id} /> : <OwnProfile />;
};

export default ProfilePage;
