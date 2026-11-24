import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { sampleLeadership } from "../../data/sampleContent";

export function Leadership() {
  return (
    <Section id="leadership" className="bg-cream">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Leadership</h2>
            <p className="mt-3 text-2xl font-semibold tracking-tight">Institutional leadership</p>
          </div>
          <div className="lg:col-span-8 space-y-8">
            {sampleLeadership.map((l: any) => (
              <article key={l.id} className="border-l-2 border-border pl-6">
                <h3 className="text-lg font-semibold">{l.title}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{l.organization}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{l.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="my-6 gold-divider" />
      </Container>
    </Section>
  );
}