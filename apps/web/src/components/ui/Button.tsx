import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:cursor-not-allowed disabled:opacity-50";
  const styles: Record<Variant, string> = {
    primary:
      "bg-forest text-cream shadow-sm hover:bg-forest/90 hover:shadow-md active:translate-y-px",
    secondary:
      "border border-forest/30 bg-white text-forest hover:border-gold hover:bg-forest/5",
    ghost: "text-mutedgreen hover:text-forest",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
