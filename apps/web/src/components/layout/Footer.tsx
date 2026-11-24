import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-forest py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Subodh Rayamajhee. All rights reserved.
          </p>
          <p className="text-xs text-muted">Built with care.</p>
        </div>
      </Container>
    </footer>
  );
}