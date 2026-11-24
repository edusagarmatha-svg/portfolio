import { sampleProfile } from "../../data/sampleContent";
import { usePortfolio } from "../../lib/usePortfolio";
import { useSettings } from "../../lib/useSettings";

export function Hero() {
  const { data } = usePortfolio();
  const { data: settings } = useSettings();
  const profile = data ?? sampleProfile;
  const socialLinks = settings.socialLinks?.length ? settings.socialLinks : sampleProfile.social;
  const fullName = profile.fullName ?? sampleProfile.fullName;
  const title = (profile as { professionalTitle?: string | null }).professionalTitle ?? sampleProfile.professionalTitle;
  const intro = (profile as { introduction?: string | null }).introduction ?? sampleProfile.introduction;

  return (
    <section id="top" className="pt-20 sm:pt-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
              {title}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {fullName}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                Get in touch
              </a>
              {sampleProfile.resumeUrl && (
                <a
                  href={sampleProfile.resumeUrl}
                  className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text transition hover:bg-surface"
                >
                  Download CV
                </a>
              )}
            </div>
            <div className="mt-8 flex gap-5 text-sm text-muted">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.url} className="hover:text-text">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] w-full max-w-sm rounded-md border border-border bg-surface shadow-sm">
              <div className="flex h-full items-center justify-center text-sm text-muted">
                Profile image
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}