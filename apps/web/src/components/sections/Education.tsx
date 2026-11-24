import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { sampleEducation } from "../../data/sampleContent";

export function Education() {
  return (
    <Section id="education">
      <Container>
        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Education</h2>
        <p className="mt-3 text-2xl font-semibold tracking-tight">Academic background</p>
        <div className="mt-10 space-y-8">
          {sampleEducation.map((e) => (
            <article key={e.id} className="border-l-2 border-border pl-6">
              <h3 className="text-lg font-semibold">{e.qualification} in {e.fieldOfStudy}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{e.institution}</p>
              <p className="mt-1 text-sm text-muted">
                {e.startDate} — {e.endDate ?? "Present"}
              </p>
              {e.description && <p className="mt-3 text-sm leading-relaxed text-muted">{e.description}</p>}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}