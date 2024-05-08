import React from "react";
import { mergeClasses } from "../../utils/string-manipulations";

interface ButtonProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  autoFocus?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "link";
}

export function Button({
  id,
  children,
  className,
  onClick,
  type = "button",
  disabled,
  autoFocus,
  variant,
}: ButtonProps) {
  if (variant == "secondary") {
    return (
      <button
        id={id}
        type={type}
        className={mergeClasses(
          "px-3 py-2 border bg-zinc-200 text-zinc-900 hover:opacity-50 duration-300",
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

  if (variant == "ghost") {
    return (
      <button
        id={id}
        type={type}
        className={mergeClasses("px-3 py-2 hover:bg-zinc-200 hover: duration-300", className)}
        onClick={onClick}
        disabled={disabled}
        autoFocus={autoFocus}
      >
        {children}
      </button>
    );
  }

  if (variant == "link") {
    return (
      <button
        id={id}
        type={type}
        className={mergeClasses("text-sky-500 underline hover:opacity-50 duration-300", className)}
        onClick={onClick}
        disabled={disabled}
        autoFocus={autoFocus}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      id={id}
      type={type}
      className={mergeClasses(
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
