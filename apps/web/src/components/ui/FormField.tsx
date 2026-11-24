import type { ReactNode } from "react";

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  required = false,
  helperText,
  error,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={[ "space-y-1.5", className ].filter(Boolean).join(" ")}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-charcoal"
        >
          {label}
          {required && (
            <span className="ml-1 text-gold" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-mutedgreen">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}