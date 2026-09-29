import { Link } from "react-router-dom";
import type { UserSummary } from "../../../../api/user";
import { userPath } from "../../../../utils/routes";
import "../searchResultItem/SearchResultItem.css";
import "./UserResultItem.css";

const UserResultItem = ({ user }: { user: UserSummary }) => (
  <Link to={userPath(user.id)} className="search-result-item">
    <div
      className="search-result-placeholder user-result-avatar"
      aria-hidden="true"
    >
      {user.nickname.charAt(0).toUpperCase()}
    </div>

    <div className="search-result-info">
      <div className="search-result-title">{user.nickname}</div>
      <div className="search-result-meta">Usuario</div>
    </div>
  </Link>
);

export default UserResultItem;
