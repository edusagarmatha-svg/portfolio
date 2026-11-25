import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { sampleInsights } from "../../data/sampleContent";
import { useReveal } from "../../lib/useReveal";
import type { RefObject } from "react";

export function Insights() {
  const { ref, visible } = useReveal();

  return (
    <Section id="insights" className="bg-cream">
      <Container>
        <div ref={ref as RefObject<HTMLDivElement | null>} className={visible ? "is-visible" : ""}>
          <h2
            className="text-sm font-medium uppercase tracking-[0.18em] text-accent reveal"
            style={{ transitionDelay: "0ms" }}
          >
            Insights
          </h2>
          <p
            className="mt-3 text-2xl font-semibold tracking-tight reveal"
            style={{ transitionDelay: "120ms" }}
          >
            Thoughts and perspectives
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {sampleInsights.map((i: any, index: number) => (
              <article
                key={i.id}
                className="rounded-md border border-border bg-bg p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card reveal"
                style={{ transitionDelay: `${index * 120 + 200}ms` }}
              >
                <h3 className="text-lg font-semibold">{i.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{i.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
      <div className="my-6 gold-divider" />
    </Section>
  );
}
