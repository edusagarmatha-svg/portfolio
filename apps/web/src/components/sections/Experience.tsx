import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { sampleExperience } from "../../data/sampleContent";
import { useExperience } from "../../lib/useExperience";

export function Experience() {
  const { data } = useExperience();
  const items = data.length ? data : sampleExperience;

  return (
    <Section id="experience" className="bg-surface">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
              Experience
            </h2>
            <p className="mt-3 text-2xl font-semibold tracking-tight">Where I've worked</p>
          </div>
          <div className="lg:col-span-8 space-y-10">
            {items.map((e: any) => (
              <article key={e.id} className="border-l-2 border-border pl-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{e.position}</h3>
                  <span className="text-sm text-muted">
                    {String(e.startDate).slice(0, 4)} — {e.isCurrent ? "Present" : e.endDate ? String(e.endDate).slice(0, 4) : ""}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-accent">{e.company}</p>
                {e.employmentType && (
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted">{e.employmentType}</p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-muted">{e.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}