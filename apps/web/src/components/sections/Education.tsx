import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { useEducation } from "../../lib/useEducation";

export function Education() {
  const { data } = useEducation();

  return (
    <Section id="education" className="bg-cream">
      <Container>
        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Education</h2>
        <p className="mt-3 font-display text-2xl font-semibold tracking-tight">Academic background</p>
        {data.length > 0 ? (
          <div className="mt-10 space-y-8">
            {data.map((e: any) => (
              <article key={e.id} className="border-l-2 border-border pl-6">
                <h3 className="text-lg font-semibold">
                  {e.institution}
                </h3>
                {e.qualification && (
                  <p className="mt-1 text-sm font-medium text-accent">
                    {e.qualification}
                  </p>
                )}
                {e.fieldOfStudy && (
                  <p className="mt-1 text-sm text-muted">
                    {e.fieldOfStudy}
                  </p>
                )}
                {e.startDate && (
                  <p className="mt-1 text-sm text-muted">
                    {String(e.startDate).slice(0, 4)}
                  </p>
                )}
                {e.endDate && (
                  <p className="mt-1 text-sm text-muted">
                    — {String(e.endDate).slice(0, 4)}
                  </p>
                )}
                {e.description && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {e.description}
                  </p>
                )}
              </article>
            ))}
          </div>
            <div className="my-6 gold-divider" />
        ) : (
          <p className="mt-10 text-muted">No education data available</p>
        )}
      </Container>
    </Section>
  );
}