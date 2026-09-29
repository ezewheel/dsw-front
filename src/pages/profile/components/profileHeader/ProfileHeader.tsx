import type { ReactNode } from "react";
import "./ProfileHeader.css";

type ProfileHeaderProps = {
  eyebrow: string;
  nickname: string;
  email?: string;
  children?: ReactNode;
};

const ProfileHeader = ({
  eyebrow,
  nickname,
  email,
  children,
}: ProfileHeaderProps) => (
  <header className="profile-header">
    <p className="profile-header-eyebrow">{eyebrow}</p>
    <h1 className="profile-header-name">{nickname}</h1>
    {email && <p className="profile-header-email">{email}</p>}
    {children}
  </header>
);

export default ProfileHeader;
