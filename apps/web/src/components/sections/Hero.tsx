import { usePortfolio } from "../../lib/usePortfolio";

export function Hero() {
  const { data } = usePortfolio();

  // Use CMS data directly with optional chaining
  const fullName = data?.fullName;
  const professionalTitle = data?.professionalTitle;
  const introduction = data?.introduction;
  const resumeUrl = data?.resumeUrl;
  const profileImageUrl = data?.profileImageUrl;

  return (
    <section
      id="top"
      className="min-h-[100svh] bg-forest overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[52fr_48fr] gap-16 lg:gap-24 mx-auto w-full max-w-6xl px-6 lg:px-16 relative pt-20">
        {/* Text column (left on desktop) */}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-gold animate-fade-up">
            {professionalTitle}
          </p>
          <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight text-cream animate-fade-up-delay">
            {fullName}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream max-w-xl animate-fade-up-delay">
            {introduction}
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href="#contact"
              className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Contact Me
            </a>
            {resumeUrl && (
              <a
                href={resumeUrl}
                className="inline-flex items-center rounded-md border border-gold px-5 py-2.5 text-sm font-medium text-text transition hover:bg-accent/10"
              >
                View CV
              </a>
            )}
          </div>
        </div>

        {/* Portrait column (right on desktop) */}
        <div className="relative">
          {/* Gold decorative rings surrounding the portrait */}
          <div className="absolute inset-0 ring-2 ring-gold/20 ring-offset-2 ring-offset-forest">
            {/* Ring 1 */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-gold border-opacity-50 rounded-full opacity-80"
              aria-hidden="true"
            />
            {/* Ring 2 */}
            <div
              className="absolute top-1/3 left-1/4 -translate-x-1/4 -translate-y-1/3 w-16 h-16 border-2 border-gold border-opacity-40 rounded-full opacity-70"
              aria-hidden="true"
            />
            {/* Ring 3 */}
            <div
              className="absolute bottom-1/3 right-1/4 -translate-x-1/4 translate-y-1/3 w-14 h-14 border-2 border-gold border-opacity-30 rounded-full opacity-60"
              aria-hidden="true"
            />
            {/* Ring 4 */}
            <div
              className="absolute bottom-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-gold border-opacity-20 rounded-full opacity-50"
              aria-hidden="true"
            />
            {/* Ring 5 */}
            <div
              className="absolute top-1/4 right-1/3 -translate-x/3 -translate-y-1/4 w-10 h-10 border-2 border-gold border-opacity-10 rounded-full opacity-40"
              aria-hidden="true"
            />
          </div>

          {/* Circular profile portrait with subtle fade-in and scale animation */}
          <img
            className="relative z-10 aspect-square w-64 md:w-80 lg:w-96 md:h-80 lg:h-96 rounded-full object-cover object-center transition-opacity duration-500 ease-out hover:opacity-90 group-hover:opacity-80 animate-in-from-96 scale-105"
            src={profileImageUrl ?? "/placeholder-portrait.jpg"}
            alt={`${fullName} profile portrait`}
          />
        </div>
      </div>
    </section>
  );
}