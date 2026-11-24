import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { Quote } from "lucide-react";
import { sampleTestimonials } from "../../data/sampleContent";
import { useTestimonials } from "../../lib/useTestimonials";

export function Testimonials() {
  const { data } = useTestimonials();
  const items = data.length ? data : sampleTestimonials;

  return (
    <Section id="testimonials" className="bg-surface">
      <Container>
        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Testimonials</h2>
        <p className="mt-3 text-2xl font-semibold tracking-tight">Kind words</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((t: any) => (
            <blockquote key={t.id} className="rounded-md border border-border bg-bg p-6">
              <Quote className="text-accent" size={20} />
              <p className="mt-3 text-sm leading-relaxed text-text">“{t.feedback}”</p>
              <footer className="mt-4 text-xs text-muted">
                {t.clientName} · {t.clientRole ?? ""}{t.organization ? `, ${t.organization}` : ""}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </Section>
  );
}