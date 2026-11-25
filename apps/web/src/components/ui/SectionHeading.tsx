import type { ReactNode } from "react";

type Align = "left" | "center";
type Size = "md" | "lg";
type Tone = "light" | "dark";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: Align;
  size?: Size;
  tone?: Tone;
  className?: string;
}

const titleStyles: Record<Size, string> = {
  md: "text-display",
  lg: "text-display-lg",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "md",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={[
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <p className="text-eyebrow font-medium uppercase text-gold reveal" style={{ transitionDelay: "0ms" }}>
          {eyebrow}
        </p>
      )}
      <h2
        className={[
          "mt-3 font-display font-semibold tracking-tight reveal",
          tone === "dark" ? "text-cream" : "text-charcoal",
          titleStyles[size],
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ transitionDelay: "120ms" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={[
            "mt-4 text-body-lg leading-relaxed reveal",
            tone === "dark" ? "text-cream/75" : "text-mutedgreen",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ transitionDelay: "240ms" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}