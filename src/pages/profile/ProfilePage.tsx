import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import ProfileForm from "./components/profileForm/ProfileForm";
import PasswordForm from "./components/passwordForm/PasswordForm";
import ProfileStats from "./components/profileStats/ProfileStats";
import OwnInteractions from "./components/ownInteractions/OwnInteractions";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <p className="app-container profile-page status-message">
        Cargando perfil...
      </p>
    );
  }

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

export default ProfilePage;
