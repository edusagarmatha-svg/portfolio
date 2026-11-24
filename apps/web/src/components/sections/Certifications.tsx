import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { Award } from "lucide-react";
import { sampleCertifications } from "../../data/sampleContent";

export function Certifications() {
  return (
    <Section id="certifications" className="bg-surface">
      <Container>
        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Certifications</h2>
        <p className="mt-3 text-2xl font-semibold tracking-tight">Credentials</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {sampleCertifications.map((c) => (
            <div key={c.id} className="flex gap-4 rounded-md border border-border bg-bg p-5">
              <Award className="mt-0.5 shrink-0 text-accent" size={20} />
              <div>
                <h3 className="text-sm font-semibold">{c.title}</h3>
                <p className="mt-1 text-xs text-muted">{c.issuer} · {c.issueDate}</p>
                <a href={c.credentialUrl} className="mt-2 inline-block text-xs text-accent hover:underline">
                  View credential
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}