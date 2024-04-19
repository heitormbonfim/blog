import React from "react";
import { appendClasses } from "../../utils/string-manipulations";

interface TextareaProps {
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string | number | readonly string[];
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
}

export function Textarea({
  id,
  value,
  placeholder,
  disabled,
  autoFocus,
  required,
  readOnly,
  onChange,
  className,
}: TextareaProps) {
  return (
    <textarea
      id={id}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus={autoFocus}
      required={required}
      readOnly={readOnly}
      onChange={onChange}
      className={appendClasses("border-2 border-zinc-950 p-2", className)}
    />
  );
}
