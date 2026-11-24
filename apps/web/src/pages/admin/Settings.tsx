import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useToast } from "../../components/ui/Toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import type { SocialLink, SectionVisibility, Seo } from "../../lib/useSettings";

const SECTION_KEYS = ["hero", "about", "experience", "leadership", "expertise", "education", "insights", "contact"];

export function SettingsAdmin() {
  const { show } = useToast();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [visibility, setVisibility] = useState<SectionVisibility>({});
  const [seo, setSeo] = useState<Seo>({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<any>("/api/v1/admin/settings")
      .then((data) => {
        setSocialLinks(Array.isArray(data.socialLinks) ? data.socialLinks : []);
        setVisibility(data.sectionVisibility ?? {});
        setSeo(data.seo ?? { title: "", description: "" });
      })
      .catch((e) => show(e instanceof Error ? e.message : "Load failed", "error"))
      .finally(() => setLoading(false));
  }, [show]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await api("/api/v1/admin/settings", {
        method: "PUT",
        body: JSON.stringify({ socialLinks, sectionVisibility: visibility, seo }),
      });
      show("Settings saved");
    } catch (err) {
      show(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  function addSocial() { setSocialLinks([...socialLinks, { label: "", url: "" }]); }
  function updateSocial(i: number, field: "label" | "url", value: string) {
    const next = [...socialLinks];
    next[i] = { ...next[i], [field]: value };
    setSocialLinks(next);
  }
  function removeSocial(i: number) { setSocialLinks(socialLinks.filter((_, idx) => idx !== i)); }

  if (loading) return <div className="text-muted">Loading…</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted">Social links, section visibility, and SEO.</p>

      <form className="mt-6 space-y-6" onSubmit={handleSave}>
        <Card>
          <h2 className="text-sm font-semibold">Social links</h2>
          <div className="mt-4 space-y-3">
            {socialLinks.map((s, i) => (
              <div key={i} className="flex gap-2">
                <Input placeholder="Label" value={s.label} onChange={(e) => updateSocial(i, "label", e.target.value)} />
                <Input placeholder="URL" value={s.url} onChange={(e) => updateSocial(i, "url", e.target.value)} />
                <Button type="button" variant="ghost" onClick={() => removeSocial(i)}>Remove</Button>
              </div>
            ))}
            <Button type="button" variant="secondary" onClick={addSocial}>Add link</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold">Section visibility</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {SECTION_KEYS.map((key) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={visibility[key] !== false}
                  onChange={(e) => setVisibility({ ...visibility, [key]: e.target.checked })}
                />
                {key}
              </label>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold">SEO</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Page title</label>
              <Input className="mt-1.5" value={seo.title ?? ""} onChange={(e) => setSeo({ ...seo, title: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Meta description</label>
              <textarea className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" rows={3} value={seo.description ?? ""} onChange={(e) => setSeo({ ...seo, description: e.target.value })} />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save settings"}</Button>
        </div>
      </form>
    </div>
  );
}