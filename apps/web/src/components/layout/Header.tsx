import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";

const navLinks = [
  { href: "#top", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#leadership", label: "LEADERSHIP" },
  { href: "#expertise", label: "EXPERTISE" },
  { href: "#education", label: "EDUCATION" },
  { href: "#insights", label: "INSIGHTS" },
  { href: "#contact", label: "CONTACT" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const updateIndicator = () => {
    const el = linkRefs.current[active];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    }
  };

  useEffect(() => {
    updateIndicator();
    const onResize = () => updateIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.intersectionRatio >= b.intersectionRatio ? a : b
        );
        const id = topMost.target.id;
        if (id) setActive(`#${id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Initial indicator after mount
  useEffect(() => {
    const t = window.setTimeout(updateIndicator, 50);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-forest animate-fade-down">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a
            href="#top"
            className="text-sm font-semibold tracking-tight text-cream transition-colors hover:text-sage"
          >
            Subodh Rayamajhee
          </a>
          <nav
            className="relative hidden items-center gap-7 md:flex"
            aria-label="Primary"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                ref={(el) => {
                  linkRefs.current[l.href] = el;
                }}
                onClick={() => setActive(l.href)}
                className={`relative text-sm transition-colors duration-200 ${
                  active === l.href ? "text-cream" : "text-cream/80 hover:text-sage"
                }`}
              >
                {l.label}
              </a>
            ))}
            <span
              className="absolute bottom-[-6px] h-0.5 bg-gold transition-all duration-300 ease-premium"
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
              }}
              aria-hidden="true"
            />
          </nav>
          <button
            type="button"
            className="md:hidden text-cream transition-colors hover:text-sage"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav
          className={`md:hidden overflow-hidden transition-all duration-300 ease-premium ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-2 border-t border-sage/30 py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => {
                  setActive(l.href);
                  setOpen(false);
                }}
                className={`text-sm transition-colors duration-200 ${
                  active === l.href
                    ? "text-gold pl-1"
                    : "text-cream hover:text-sage hover:pl-1"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  );
}
