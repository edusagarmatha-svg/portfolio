import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
}

export function Textarea({
  error = false,
  errorMessage,
  className = "",
  id,
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      <textarea
        id={id}
        className={[
          "w-full rounded-md border border-sage/50 bg-white/90 text-forest transition-all duration-normal ease-[var(--ease-premium)] placeholder:text-mutedgreen/40 focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 disabled:cursor-not-allowed disabled:opacity-50",
          "resize:vertical",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
            : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={error || undefined}
        aria-describedby={errorMessage && id ? `${id}-error` : undefined}
        {...props}
      />
      {errorMessage && (
        <p id={id ? `${id}-error` : undefined} className="mt-1 text-xs text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
}