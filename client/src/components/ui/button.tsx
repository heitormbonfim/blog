import React from "react";
import { appendClasses } from "../../utils/string-manipulations";

interface ButtonProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  autoFocus?: boolean;
}

export function Button({
  id,
  children,
  className,
  onClick,
  type = "button",
  disabled,
  autoFocus,
}: ButtonProps) {
  return (
    <button
      id={id}
      type={type}
      className={appendClasses(
        "px-3 py-2 border bg-zinc-900 text-zinc-100 hover:opacity-50 duration-300",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      autoFocus={autoFocus}
    >
      {children}
    </button>
  );
}
