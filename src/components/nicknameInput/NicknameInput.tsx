import type { ChangeEvent } from "react";

const MAX_NICKNAME_LENGTH = 30;

type NicknameInputProps = {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const NicknameInput = ({
  id,
  value,
  onChange,
  placeholder,
}: NicknameInputProps) => (
  <>
    <input
      id={id}
      type="text"
      className="form-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      pattern=".*\S.*"
      maxLength={MAX_NICKNAME_LENGTH}
    />
    <p className="form-feedback">Ingresá un nickname.</p>
  </>
);

export default NicknameInput;
