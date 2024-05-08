import React from "react";
import { mergeClasses } from "../../utils/string-manipulations";

interface InputProps {
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  value?: string | number | readonly string[];
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
}

export function Input({
  id,
  type = "text",
  value,
  placeholder,
  disabled,
  autoFocus,
  required,
  readOnly,
  onChange,
  className,
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus={autoFocus}
      required={required}
      readOnly={readOnly}
      onChange={onChange}
      className={mergeClasses("border-2 p-2 border-zinc-950", className)}
    />
  );
}
