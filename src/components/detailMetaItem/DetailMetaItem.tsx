import type { IconType } from "react-icons";
import { Link } from "react-router-dom";
import "./DetailMetaItem.css";

type DetailMetaItemProps = {
  icon: IconType;
  to?: string;
  children: string;
};

const DetailMetaItem = ({ icon: Icon, to, children }: DetailMetaItemProps) => (
  <div className="detail-meta-item">
    <Icon className="detail-meta-icon" aria-hidden="true" />
    {to ? (
      <Link to={to} className="detail-meta-link" title={children}>
        {children}
      </Link>
    ) : (
      <span>{children}</span>
    )}
  </div>
);

export default DetailMetaItem;
