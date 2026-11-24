import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { sampleProjects } from "../../data/sampleContent";
import { useProjects } from "../../lib/useProjects";

export function Projects() {
  const { data } = useProjects();
  const projects = data.length ? data : sampleProjects;

  return (
    <Section id="projects">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
              Projects
            </h2>
            <p className="mt-3 text-2xl font-semibold tracking-tight">Selected work</p>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p: any) => (
            <article key={p.id} className="group rounded-md border border-border bg-surface p-6 transition hover:shadow-sm">
              <div className="aspect-[16/9] w-full rounded-sm bg-bg" />
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(p.technologies ?? []).map((t: string) => (
                  <span key={t} className="rounded-sm bg-accent-soft px-2 py-0.5 text-xs text-accent">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-4 text-sm">
                {p.liveUrl && p.liveUrl !== "#" && (
                  <a href={p.liveUrl} className="text-accent hover:underline">
                    Live
                  </a>
                )}
                {p.sourceUrl && p.sourceUrl !== "#" && (
                  <a href={p.sourceUrl} className="text-muted hover:text-text">
                    Source
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}