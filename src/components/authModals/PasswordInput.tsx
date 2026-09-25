import { useState, type ChangeEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./PasswordInput.css";

const MAX_PASSWORD_LENGTH = 72;

type PasswordInputProps = {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  autoFocus?: boolean;
  feedback?: string;
};

const PasswordInput = ({
  id,
  value,
  onChange,
  placeholder,
  required,
  minLength,
  autoFocus,
  feedback,
}: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field">
      <input
        id={id}
        type={visible ? "text" : "password"}
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        maxLength={MAX_PASSWORD_LENGTH}
        autoFocus={autoFocus}
      />
      <button
        type="button"
        className="password-toggle"
        aria-label={visible ? "Ocultar contraseña" : "Ver contraseña"}
        onClick={() => setVisible((prev) => !prev)}
      >
        {visible ? <FaEyeSlash /> : <FaEye />}
      </button>
      {feedback && <p className="form-feedback">{feedback}</p>}
    </div>
  );
};

export default PasswordInput;