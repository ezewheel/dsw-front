import "./FeatureRow.css";

type FeatureRowProps = {
  index: number;
  title: string;
  text: string;
};

const FeatureRow = ({ index, title, text }: FeatureRowProps) => {
  const position = String(index + 1).padStart(2, "0");

  return (
    <div className="feature-row">
      <div className="feature-marker">
        <span className="feature-index">{position}</span>
      </div>
      <div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-text">{text}</p>
      </div>
    </div>
  );
};

export default FeatureRow;