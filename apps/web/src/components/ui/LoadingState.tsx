import type { ReactNode } from "react";

export interface LoadingStateProps {
  label?: string;
  children?: ReactNode;
  className?: string;
}

export function LoadingState({
  label = "Loading…",
  children,
  className = "",
}: LoadingStateProps) {
  return (
    <div
      className={[
        "flex items-center gap-3 text-sm text-mutedgreen",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-mutedgreen border-r-transparent"
      />
      <span>{children ?? label}</span>
    </div>
  );
}