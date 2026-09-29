import { FaCalendarAlt, FaCommentDots } from "react-icons/fa";
import { formatCount, formatDate } from "../../../../utils/format";
import "./ProfileStats.css";

type ProfileStatsProps = {
  reviewsCount: number;
  createdAt: string;
};

const ProfileStats = ({ reviewsCount, createdAt }: ProfileStatsProps) => (
  <ul className="profile-stats">
    <li className="profile-stats-item">
      <FaCommentDots className="profile-stats-icon" aria-hidden="true" />
      {formatCount(reviewsCount, "reseña", "reseñas")}
    </li>
    <li className="profile-stats-item">
      <FaCalendarAlt className="profile-stats-icon" aria-hidden="true" />
      Miembro desde el {formatDate(createdAt)}
    </li>
  </ul>
);

export default ProfileStats;
