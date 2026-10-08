import { forwardRef } from "react";
import "./inputPadrao.css";

interface InputPadraoProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  disabled?: boolean;
  required?: boolean;

  name?: string;
  id?: string;

  min?: string | number;
  max?: string | number;
  step?: string | number;

  erro?: string;
  autoFocus?: boolean;
}

const InputPadrao = forwardRef<HTMLInputElement, InputPadraoProps>(
  (
    {
      label,
      type = "text",
      placeholder,
      value,
      onChange,
      onKeyDown,
      disabled = false,
      required = false,
      name,
      id,
      min,
      max,
      step,
      erro,
      autoFocus,
    },
    ref,
  ) => {
    return (
      <div className="input-padrao-container">
        {label && (
          <label htmlFor={id} className="input-padrao-label">
            {label}

            {required && <span className="input-padrao-required">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          className={`input-padrao ${erro ? "input-padrao-erro" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          step={step}
          autoFocus={autoFocus}
        />

        {erro && <span className="input-padrao-mensagem">{erro}</span>}
      </div>
    );
  },
);

InputPadrao.displayName = "InputPadrao";

export default InputPadrao;
