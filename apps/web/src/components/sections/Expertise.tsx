import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { useSkills } from "../../lib/useSkills";
import { useReveal } from "../../lib/useReveal";
import type { RefObject } from "react";

export function Expertise() {
  const { data } = useSkills();
  const { ref, visible } = useReveal();

  return (
    <Section id="expertise" className="bg-cream !pb-8">
      <Container>
        <div ref={ref as RefObject<HTMLDivElement | null>} className={visible ? "is-visible" : ""}>
          <h2
            className="text-sm font-medium uppercase tracking-[0.18em] text-accent reveal"
            style={{ transitionDelay: "0ms" }}
          >
            Expertise
          </h2>
          <p
            className="mt-3 font-display text-2xl font-semibold tracking-tight reveal"
            style={{ transitionDelay: "120ms" }}
          >
            Capabilities
          </p>
          {data.length > 0 ? (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(
                data.reduce<Record<string, any[]>>((acc: any, s: any) => {
                  const cat = s.category ?? "Other";
                  (acc[cat] ??= []).push(s);
                  return acc;
                }, {})
              ).map(([cat, items], index) => (
                <div
                  key={cat}
                  className="reveal transition-all duration-200 hover:-translate-y-0.5"
                  style={{ transitionDelay: `${index * 120 + 200}ms` }}
                >
                  <h3 className="text-base font-semibold text-charcoal">{cat}</h3>
                  <ul className="mt-3 space-y-2">
                    {items.map((s: any) => (
                      <li key={s.id} className="flex items-center text-base font-display text-charcoal">
                        <span className="font-display">{s.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-muted reveal" style={{ transitionDelay: "200ms" }}>
              No expertise data available
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
