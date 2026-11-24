import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { sampleInsights } from "../../data/sampleContent";

export function Insights() {
  return (
    <Section id="insights" className="bg-cream">
      <Container>
        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Insights</h2>
        <p className="mt-3 text-2xl font-semibold tracking-tight">Thoughts and perspectives</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {sampleInsights.map((i: any) => (
            <article key={i.id} className="rounded-md border border-border bg-bg p-6">
              <h3 className="text-lg font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{i.excerpt}</p>
            </article>
          ))}
        </div>
      </Container>
        <div className="my-4 gold-divider" />
    </Section>
  );
}