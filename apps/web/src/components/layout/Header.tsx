import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-forest">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="text-sm font-semibold tracking-tight text-white">
            Subodh Rayamajhee
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-cream transition-colors hover:text-cream"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="md:hidden text-white"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-3 border-t border-border py-4 md:hidden" aria-label="Mobile">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-cream hover:text-cream"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </Container>
    </header>
  );
}
