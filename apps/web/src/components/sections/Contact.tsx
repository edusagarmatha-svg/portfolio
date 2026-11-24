import { useState } from "react";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { Mail, Phone, MapPin } from "lucide-react";
import { sampleProfile } from "../../data/sampleContent";
import { usePortfolio } from "../../lib/usePortfolio";

export function Contact() {
  const { data } = usePortfolio();
  const email = data?.email ?? sampleProfile.email;
  const phone = data?.phone ?? sampleProfile.phone;
  const location = data?.location ?? sampleProfile.location;
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <Section id="contact">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Contact</h2>
            <p className="mt-3 text-2xl font-semibold tracking-tight">Let's work together</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Have a project in mind? Send a message and I'll get back within two business days.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent" /> {email}
              </li>
              {phone && (
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-accent" /> {phone}
                </li>
              )}
              {location && (
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-accent" /> {location}
                </li>
              )}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <form
              className="space-y-4 rounded-md border border-border bg-surface p-6"
              onSubmit={(e) => {
                e.preventDefault();
                setStatus("sent");
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" />
                <Field label="Email" name="email" type="email" />
              </div>
              <Field label="Subject" name="subject" />
              <div>
                <label className="text-sm font-medium text-text" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text focus:border-accent focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                {status === "sent" ? "Message sent" : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-text" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text focus:border-accent focus:outline-none"
      />
    </div>
  );
}