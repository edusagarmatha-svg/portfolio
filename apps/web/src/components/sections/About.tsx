import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { sampleAbout } from "../../data/sampleContent";
import { usePortfolio } from "../../lib/usePortfolio";

export function About() {
  const { data } = usePortfolio();
  const biography = data?.biography ?? sampleAbout.biography;

  return (
    <Section id="about" className="bg-cream">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-6 lg:gap-8">
          <div>
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-gold mb-3">
              About
            </h2>
            <h1 className="text-display font-display font-semibold tracking-tight text-charcoal mb-4">
              About Me
            </h1>
          </div>
          <div>
            <p className="text-body leading-relaxed text-charcoal/90">
              {biography}
            </p>
            <div className="mt-4 gold-divider" />
          </div>
        </div>
      </Container>
    </Section>
  );
}