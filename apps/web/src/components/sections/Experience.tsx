import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { useExperience } from "../../lib/useExperience";
import { sampleExperience } from "../../data/sampleContent";

function formatRange(startDate: string, endDate: string | null, isCurrent: boolean) {
  const start = String(startDate).slice(0, 4);
  const end = isCurrent ? "Present" : endDate ? String(endDate).slice(0, 4) : "";
  return end ? `${start} — ${end}` : start;
}

export function Experience() {
  const { data } = useExperience();
  const items = data.length ? data : sampleExperience;

  return (
    <Section id="experience" className="bg-cream">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Experience"
              title="Professional experience"
              description="Roles, responsibilities, and professional progression across organizations."
            />
          </div>

          <div className="lg:col-span-8">
            <ol className="relative space-y-12 border-l border-gold/40 pl-8">
              {items.map((experience: any) => (
                <li key={experience.id} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1rem] top-2 h-3 w-3 rounded-full border-2 border-gold bg-surface"
                  />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-charcoal">
                      {experience.position}
                    </h3>
                    <span className="text-sm font-medium text-mutedgreen">
                      {formatRange(
                        experience.startDate,
                        experience.endDate,
                        experience.isCurrent,
                      )}
                    </span>
                  </div>

                  <p className="mt-1 text-base font-medium text-charcoal/80">
                    {experience.company}
                  </p>

                  {experience.employmentType && (
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-mutedgreen/80">
                      {experience.employmentType}
                    </p>
                  )}

                  {experience.description && (
                    <p className="mt-4 max-w-2xl text-body leading-relaxed text-mutedgreen">
                      {experience.description}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="my-6 gold-divider" />
      </Container>
    </Section>
  );
}