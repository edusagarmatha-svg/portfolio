import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { useLeadership } from "../../lib/useLeadership";
import { useReveal } from "../../lib/useReveal";
import { sampleLeadership } from "../../data/sampleContent";
import type { RefObject } from "react";

export function Leadership() {
  const { data } = useLeadership();
  const items = data.length ? data : sampleLeadership;
  const { ref, visible } = useReveal();

  return (
    <Section id="leadership" className="bg-cream">
      <Container>
        <div ref={ref as RefObject<HTMLDivElement | null>} className={visible ? "is-visible" : ""}>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2
                className="text-sm font-medium uppercase tracking-[0.18em] text-accent reveal"
                style={{ transitionDelay: "0ms" }}
              >
                Leadership
              </h2>
              <p
                className="mt-3 text-2xl font-semibold tracking-tight reveal"
                style={{ transitionDelay: "120ms" }}
              >
                Institutional leadership
              </p>
            </div>
            <div className="lg:col-span-8 space-y-8">
              {items.map((l: any, index: number) => (
                <article
                  key={l.id}
                  className="border-l-2 border-border pl-6 transition-colors duration-200 hover:border-gold reveal"
                  style={{ transitionDelay: `${index * 120 + 200}ms` }}
                >
                  <h3 className="text-lg font-semibold text-charcoal">{l.title}</h3>
                  <p className="mt-1 text-sm font-medium text-mutedgreen">{l.organization}</p>
                  <p className="mt-3 text-body leading-relaxed text-charcoal/90 max-w-3xl">
                    {l.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div className="my-6 gold-divider reveal" style={{ transitionDelay: "100ms" }} />
        </div>
      </Container>
    </Section>
  );
}
