import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { sampleServices } from "../../data/sampleContent";

export function Services() {
  return (
    <Section id="services">
      <Container>
        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Services</h2>
        <p className="mt-3 text-2xl font-semibold tracking-tight">What I offer</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {sampleServices.map((s) => (
            <div key={s.id} className="rounded-md border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}