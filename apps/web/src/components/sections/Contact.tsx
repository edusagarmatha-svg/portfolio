import { useState } from "react";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { Mail, Phone, MapPin } from "lucide-react";
import { sampleProfile } from "../../data/sampleContent";
import { usePortfolio } from "../../lib/usePortfolio";
import { api } from "../../lib/api";

export function Contact() {
  const { data } = usePortfolio();
  const email = data?.email ?? sampleProfile.email;
  const phone = data?.phone ?? sampleProfile.phone;
  const location = data?.location ?? sampleProfile.location;

  const [form, setForm] = useState({ senderName: "", senderEmail: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      await api("/api/v1/public/contact", { method: "POST", body: JSON.stringify(form) });
      setStatus("sent");
      setForm({ senderName: "", senderEmail: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send");
    }
  }

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
            <form className="space-y-4 rounded-md border border-border bg-cream p-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-text" htmlFor="senderName">Name</label>
                  <input id="senderName" required value={form.senderName} onChange={(e) => setForm({ ...form, senderName: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-text" htmlFor="senderEmail">Email</label>
                  <input id="senderEmail" type="email" required value={form.senderEmail} onChange={(e) => setForm({ ...form, senderEmail: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-text" htmlFor="subject">Subject</label>
                <input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-text" htmlFor="message">Message</label>
                <textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              {status === "sent" && <p className="text-sm text-accent">Message sent. Thank you!</p>}
              <button type="submit" disabled={status === "sending"} className="inline-flex items-center rounded-md bg-forest px-5 py-2.5 text-sm font-medium text-cream transition hover:opacity-90 disabled:opacity-50">
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}