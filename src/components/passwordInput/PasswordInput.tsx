import { useState, type ChangeEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./PasswordInput.css";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;

type PasswordInputProps = {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  enforceMinLength?: boolean;
  feedback?: string;
};

const PasswordInput = ({
  id,
  value,
  onChange,
  placeholder,
  enforceMinLength = false,
  feedback = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`,
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
        required
        minLength={enforceMinLength ? MIN_PASSWORD_LENGTH : undefined}
        maxLength={MAX_PASSWORD_LENGTH}
      />
      <button
        type="button"
        className="password-toggle"
        aria-label={visible ? "Ocultar contraseña" : "Ver contraseña"}
        onClick={() => setVisible((prev) => !prev)}
      >
        {visible ? <FaEyeSlash /> : <FaEye />}
      </button>
      <p className="form-feedback">{feedback}</p>
    </div>
  );
};

export default PasswordInput;
