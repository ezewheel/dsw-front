import type { ChangeEvent } from "react";

const MAX_NICKNAME_LENGTH = 30;

export const NICKNAME_TAKEN_MESSAGE =
  "Ese nickname ya está en uso. Probá con otro.";

type NicknameInputProps = {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
};

const NicknameInput = ({
  id,
  value,
  onChange,
  placeholder,
  error,
}: NicknameInputProps) => (
  <>
    <input
      id={id}
      type="text"
      className={`form-input${error ? " form-input-invalid" : ""}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      pattern=".*\S.*"
      maxLength={MAX_NICKNAME_LENGTH}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    <p
      id={`${id}-error`}
      className={`form-feedback${error ? " form-feedback-visible" : ""}`}
      role={error ? "alert" : undefined}
    >
      {error ?? "Ingresá un nickname."}
    </p>
  </>
);

export default NicknameInput;
