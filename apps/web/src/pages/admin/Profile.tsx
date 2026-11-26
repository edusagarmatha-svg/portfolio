import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useToast } from "../../components/ui/Toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { ImageUpload } from "../../components/ui/ImageUpload";

type ProfileForm = {
  fullName: string;
  professionalTitle: string;
  introduction: string;
  biography: string;
  profileImageUrl: string;
  profileImagePublicId: string;
  resumeUrl: string;
  email: string;
  phone: string;
  location: string;
};

const empty: ProfileForm = {
  fullName: "",
  professionalTitle: "",
  introduction: "",
  biography: "",
  profileImageUrl: "",
  profileImagePublicId: "",
  resumeUrl: "",
  email: "",
  phone: "",
  location: "",
};

export function Profile() {
  const { show } = useToast();
  const [form, setForm] = useState<ProfileForm>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<Record<string, string | null>>("/api/v1/admin/profile")
      .then((data) => {
        setForm({
          fullName: data.fullName ?? "",
          professionalTitle: data.professionalTitle ?? "",
          introduction: data.introduction ?? "",
          biography: data.biography ?? "",
          profileImageUrl: data.profileImageUrl ?? "",
          profileImagePublicId: data.profileImagePublicId ?? "",
          resumeUrl: data.resumeUrl ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          location: data.location ?? "",
        });
      })
      .catch((e) => show(e.message, "error"))
      .finally(() => setLoading(false));
  }, [show]);

  function set<K extends keyof ProfileForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await api("/api/v1/admin/profile", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      show("Profile saved");
    } catch (err) {
      show(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-muted">Loading profile…</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
      <p className="mt-1 text-sm text-muted">Manage your public profile and about content.</p>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <Card>
          <h2 className="text-sm font-semibold">Basic information</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Full name</label>
              <Input className="mt-1.5" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium">Professional title</label>
              <Input className="mt-1.5" value={form.professionalTitle} onChange={(e) => set("professionalTitle", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Introduction</label>
              <textarea
                className="mt-1.5"
                rows={3}
                value={form.introduction}
                onChange={(e) => set("introduction", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Biography (About)</label>
              <textarea
                className="mt-1.5"
                rows={6}
                value={form.biography}
                onChange={(e) => set("biography", e.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold">Contact & media</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input className="mt-1.5" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input className="mt-1.5" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input className="mt-1.5" value={form.location} onChange={(e) => set("location", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <ImageUpload
                label="Profile image"
                value={form.profileImageUrl}
                onChange={(url, publicId) =>
                  setForm((f) => ({ ...f, profileImageUrl: url, profileImagePublicId: publicId ?? "" }))
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Résumé URL</label>
              <Input className="mt-1.5" value={form.resumeUrl} onChange={(e) => set("resumeUrl", e.target.value)} />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}