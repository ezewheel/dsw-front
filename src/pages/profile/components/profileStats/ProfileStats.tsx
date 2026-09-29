import { FaCalendarAlt, FaCommentDots } from "react-icons/fa";
import { getProfile } from "../../../../api/user";
import { useFetch } from "../../../../hooks/useFetch";
import { formatCount, formatDate } from "../../../../utils/format";
import "./ProfileStats.css";

const ProfileStats = () => {
  const { data: profile } = useFetch(getProfile);

  if (!profile) return null;

  return (
    <ul className="profile-stats">
      <li className="profile-stats-item">
        <FaCommentDots className="profile-stats-icon" aria-hidden="true" />
        {formatCount(profile.interactionsCount, "reseña", "reseñas")}
      </li>
      <li className="profile-stats-item">
        <FaCalendarAlt className="profile-stats-icon" aria-hidden="true" />
        Miembro desde el {formatDate(profile.createdAt)}
      </li>
    </ul>
  );
};

export default ProfileStats;
