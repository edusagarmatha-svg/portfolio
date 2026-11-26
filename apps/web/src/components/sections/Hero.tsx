import { mediaUrl } from "../../lib/api";
import { usePortfolio } from "../../lib/usePortfolio";

export function Hero() {
  const { data } = usePortfolio();

  const fullName = data?.fullName;
  const professionalTitle = data?.professionalTitle;
  const introduction = data?.introduction;
  const resumeUrl = data?.resumeUrl;
  const profileImageUrl = data?.profileImageUrl;

  return (
    <section
      id="top"
      className="min-h-[100svh] bg-forest overflow-hidden flex items-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-16 mx-auto w-full max-w-6xl px-6 lg:px-16 py-20">
        {/* Text column (left on desktop) */}
        <div className="min-w-0 flex flex-col justify-center">
          <p
            className="text-sm font-medium uppercase tracking-[0.18em] text-gold animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            {professionalTitle}
          </p>
          <h1
            className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight text-cream animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            {fullName}
          </h1>
          <p
            className="mt-6 text-lg leading-relaxed text-cream/90 max-w-2xl animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            {introduction}
          </p>
          <div
            className="mt-8 flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href="#contact"
              className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Contact Me
            </a>
            {resumeUrl && (
              <a
                href={resumeUrl}
                className="inline-flex items-center rounded-md border border-gold px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-accent/10"
              >
                View CV
              </a>
            )}
          </div>
        </div>

        {/* Portrait column (right on desktop) */}
        <div className="relative flex items-center justify-center">
          {/* Decorative rings */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[440px] lg:h-[440px] rounded-full border border-gold/15 animate-spin-slow"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] h-[270px] sm:w-[330px] sm:h-[330px] lg:w-[410px] lg:h-[410px] rounded-full border border-gold/25"
            aria-hidden="true"
          />

          {/* Circular profile portrait */}
          <img
            className="relative z-10 aspect-square w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[380px] lg:h-[380px] rounded-full object-cover object-center border-4 border-gold animate-scale-in"
            style={{ animationDelay: "300ms" }}
            src={mediaUrl(profileImageUrl) ?? "/placeholder-portrait.jpg"}
            alt={`${fullName ?? ""} profile portrait`}
          />
        </div>
      </div>
    </section>
  );
}
