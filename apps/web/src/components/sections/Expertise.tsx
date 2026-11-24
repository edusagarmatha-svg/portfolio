import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { useSkills } from "../../lib/useSkills";

export function Expertise() {
  const { data } = useSkills();

  return (
    <Section id="expertise" className="bg-cream">
      <Container>
        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Expertise</h2>
        <p className="mt-3 font-display text-2xl font-semibold tracking-tight">Capabilities</p>
        {data.length > 0 ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(data.reduce<Record<string, any[]>>((acc: any, s: any) => {
              const cat = s.category ?? "Other";
              (acc[cat] ??= []).push(s);
              return acc;
            }, {})).map(([cat, items]) => (
              <div key={cat}>
                <h3 className="text-base font-semibold text-charcoal">{cat}</h3>
                <ul className="mt-3 space-y-2">
                  {items.map((s: any) => (
                    <li key={s.id} className="flex items-center text-base font-display text-charcoal">
                      <span className="font-display">{s.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
            <div className="my-6 gold-divider" />
        ) : (
          <p className="mt-10 text-muted">No expertise data available</p>
        )}
      </Container>
    </Section>
  );
}