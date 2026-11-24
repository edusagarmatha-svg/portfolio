import type { ReactNode } from "react";

type Variant = "neutral" | "gold" | "forest" | "outline";
type Size = "sm" | "md";

export interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  neutral: "bg-accent-soft text-mutedgreen",
  gold: "bg-gold/15 text-gold",
  forest: "bg-forest text-cream",
  outline: "border border-sage text-mutedgreen",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-2 py-0.5 text-[0.6875rem]",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-pill font-medium uppercase tracking-wide",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}