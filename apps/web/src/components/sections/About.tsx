import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { sampleAbout } from "../../data/sampleContent";
import { usePortfolio } from "../../lib/usePortfolio";
import { useReveal } from "../../lib/useReveal";
import type { RefObject } from "react";

export function About() {
  const { data } = usePortfolio();
  const biography = data?.biography ?? sampleAbout.biography;
  const { ref, visible } = useReveal();

  return (
    <Section id="about" className="bg-cream">
      <Container>
        <div
          ref={ref as RefObject<HTMLDivElement | null>}
          className={`grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-6 lg:gap-8 ${
            visible ? "is-visible" : ""
          }`}
        >
          <div>
            <h2
              className="text-sm font-medium uppercase tracking-[0.18em] text-gold mb-3 reveal"
              style={{ transitionDelay: "0ms" }}
            >
              About
            </h2>
            <h1
              className="text-display font-display font-semibold tracking-tight text-charcoal mb-4 reveal"
              style={{ transitionDelay: "120ms" }}
            >
              About Me
            </h1>
          </div>
          <div>
            <p
              className="text-body leading-relaxed text-charcoal/90 reveal-right"
              style={{ transitionDelay: "200ms" }}
            >
              {biography}
            </p>
            <div
              className="mt-4 my-6 gold-divider reveal"
              style={{ transitionDelay: "320ms" }}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
