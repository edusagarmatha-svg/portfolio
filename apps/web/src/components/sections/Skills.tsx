import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { sampleSkills } from "../../data/sampleContent";

export function Skills() {
  const grouped = sampleSkills.reduce<Record<string, typeof sampleSkills>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <Section id="skills" className="bg-surface">
      <Container>
        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Skills</h2>
        <p className="mt-3 text-2xl font-semibold tracking-tight">Capabilities</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <h3 className="text-sm font-semibold text-text">{cat}</h3>
              <ul className="mt-3 space-y-2">
                {items.map((s) => (
                  <li key={s.id} className="flex items-center justify-between text-sm text-muted">
                    <span>{s.name}</span>
                    <span className="text-xs">{s.proficiency}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}