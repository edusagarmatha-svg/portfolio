import type { ReactNode } from "react";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-sage bg-cream/60 px-6 py-12 text-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && <div className="mb-4 text-gold">{icon}</div>}
      <h3 className="font-display text-heading font-semibold text-charcoal">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-body text-mutedgreen">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button variant="ghost" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}