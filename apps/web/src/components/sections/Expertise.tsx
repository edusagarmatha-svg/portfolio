import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { sampleSkills } from "../../data/sampleContent";
import { useSkills } from "../../lib/useSkills";

export function Expertise() {
  const { data } = useSkills();
  const skills = data.length ? data : sampleSkills;

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s: any) => {
    const cat = s.category ?? "Other";
    (acc[cat] ??= []).push(s);
    return acc;
  }, {});

  return (
    <Section id="expertise" className="bg-surface">
      <Container>
        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Expertise</h2>
        <p className="mt-3 text-2xl font-semibold tracking-tight">Capabilities</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <h3 className="text-sm font-semibold text-text">{cat}</h3>
              <ul className="mt-3 space-y-2">
                {items.map((s: any) => (
                  <li key={s.id} className="flex items-center justify-between text-sm text-muted">
                    <span>{s.name}</span>
                    {s.proficiency && <span className="text-xs">{s.proficiency}</span>}
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