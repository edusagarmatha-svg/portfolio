import type { ButtonHTMLAttributes, ReactNode } from "react";

type Size = "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  size?: Size;
  variant?: "ghost" | "outline" | "solid";
}

const sizeStyles: Record<Size, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const variantStyles: Record<NonNullable<IconButtonProps["variant"]>, string> = {
  ghost: "text-mutedgreen hover:text-forest hover:bg-forest/5",
  outline: "border border-sage text-charcoal hover:bg-cream",
  solid: "bg-forest text-cream hover:bg-emerald",
};

export function IconButton({
  icon,
  label,
  size = "md",
  variant = "ghost",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={props.type ?? "button"}
      aria-label={label}
      className={[
        "inline-flex items-center justify-center rounded-md transition-all duration-normal ease-[var(--ease-premium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 disabled:pointer-events-none disabled:opacity-50",
        sizeStyles[size],
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon}
    </button>
  );
}