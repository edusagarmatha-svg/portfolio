import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { sampleAbout } from "../../data/sampleContent";
import { usePortfolio } from "../../lib/usePortfolio";

export function About() {
  const { data } = usePortfolio();
  const biography = data?.biography ?? sampleAbout.biography;
  return (
    <Section id="about">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
              About
            </h2>
            <p className="mt-3 text-2xl font-semibold tracking-tight">A bit about me</p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-base leading-relaxed text-muted">{biography}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}