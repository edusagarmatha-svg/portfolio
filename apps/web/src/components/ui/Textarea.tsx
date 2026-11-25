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
          "min-h-[120px] w-full resize-y rounded-md border border-sage/40 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-charcoal transition-colors duration-200 placeholder:text-mutedgreen/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "",
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
