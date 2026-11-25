import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { useSkills } from "../../lib/useSkills";
import { useReveal } from "../../lib/useReveal";
import type { RefObject } from "react";

export function Expertise() {
  const { data } = useSkills();
  const { ref, visible } = useReveal();

  const groups = Object.entries(
    data.reduce<Record<string, string[]>>((acc, s) => {
      const cat = s.category?.trim() || "Other";
      (acc[cat] ??= []).push(s.name);
      return acc;
    }, {})
  );

  return (
    <Section id="expertise" className="bg-cream">
      <Container>
        <div ref={ref as RefObject<HTMLDivElement | null>} className={visible ? "is-visible" : ""}>
          <h2
            className="text-sm font-medium uppercase tracking-[0.18em] text-accent reveal"
            style={{ transitionDelay: "0ms" }}
          >
            Expertise
          </h2>
          <p
            className="mt-3 font-display text-2xl font-semibold tracking-tight text-forest reveal"
            style={{ transitionDelay: "120ms" }}
          >
            Capabilities
          </p>

          {groups.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
              {groups.map(([cat, items], index) => (
                <article
                  key={cat}
                  className="reveal group relative flex h-full flex-col border-t border-border/70 pt-6 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ transitionDelay: `${index * 120 + 200}ms` }}
                >
                  <span
                    className="reveal-fade absolute right-0 top-0 font-display text-6xl leading-none text-gold/15 transition-opacity duration-300 group-hover:text-gold/25"
                    style={{ transitionDelay: `${index * 120 + 260}ms` }}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-display text-2xl font-semibold tracking-tight text-forest">
                    {cat}
                  </h3>

                  <div
                    className="gold-rule mt-4 h-px bg-gold"
                    style={{ transitionDelay: `${index * 120 + 320}ms` }}
                    aria-hidden="true"
                  />

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {items.map((name) => (
                      <li
                        key={name}
                        className="border border-border/70 px-3 py-1.5 text-sm font-medium text-charcoal transition-colors duration-200 hover:border-gold hover:text-forest"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <p
              className="mt-10 text-muted reveal"
              style={{ transitionDelay: "200ms" }}
            >
              No expertise data available
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
