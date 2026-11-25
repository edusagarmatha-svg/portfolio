import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useToast } from "../../components/ui/Toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { ImageUpload } from "../../components/ui/ImageUpload";

type Item = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  description: string | null;
  coverImageUrl: string | null;
  technologies: string[];
  liveUrl: string | null;
  sourceUrl: string | null;
  featured: boolean;
  status: string;
};

const empty = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  coverImageUrl: "",
  technologies: "",
  liveUrl: "",
  sourceUrl: "",
  featured: false,
  status: "DRAFT",
};

export function ProjectsAdmin() {
  const { show } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setItems(await api<Item[]>("/api/v1/admin/projects"));
    } catch (e) {
      show(e instanceof Error ? e.message : "Load failed", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function set<K extends keyof typeof empty>(key: K, value: (typeof empty)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function startEdit(item: Item) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      slug: item.slug,
      summary: item.summary ?? "",
      description: item.description ?? "",
      coverImageUrl: item.coverImageUrl ?? "",
      technologies: (item.technologies ?? []).join(", "),
      liveUrl: item.liveUrl ?? "",
      sourceUrl: item.sourceUrl ?? "",
      featured: item.featured,
      status: item.status,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(empty);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: form.title,
      slug: form.slug || undefined,
      summary: form.summary || null,
      description: form.description || null,
      coverImageUrl: form.coverImageUrl || null,
      technologies: form.technologies
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      liveUrl: form.liveUrl || null,
      sourceUrl: form.sourceUrl || null,
      featured: form.featured,
      status: form.status,
    };
    try {
      if (editingId) {
        await api(`/api/v1/admin/projects/${editingId}`, { method: "PUT", body: JSON.stringify(payload) });
        show("Updated");
      } else {
        await api("/api/v1/admin/projects", { method: "POST", body: JSON.stringify(payload) });
        show("Created");
      }
      resetForm();
      await load();
    } catch (err) {
      show(err instanceof Error ? err.message : "Save failed", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    try {
      await api(`/api/v1/admin/projects/${id}`, { method: "DELETE" });
      show("Deleted");
      await load();
    } catch (err) {
      show(err instanceof Error ? err.message : "Delete failed", "error");
    }
  }

  async function toggleStatus(item: Item) {
    const next = item.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      await api(`/api/v1/admin/projects/${item.id}`, { method: "PUT", body: JSON.stringify({ status: next }) });
      await load();
    } catch (err) {
      show(err instanceof Error ? err.message : "Update failed", "error");
    }
  }

  async function toggleFeatured(item: Item) {
    try {
      await api(`/api/v1/admin/projects/${item.id}`, { method: "PUT", body: JSON.stringify({ featured: !item.featured }) });
      await load();
    } catch (err) {
      show(err instanceof Error ? err.message : "Update failed", "error");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-1 text-sm text-muted">Manage projects.</p>

      <Card className="mt-6">
        <h2 className="text-sm font-semibold">{editingId ? "Edit project" : "New project"}</h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input className="mt-1.5" value={form.title} onChange={(e) => set("title", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium">Slug (optional)</label>
              <Input className="mt-1.5" value={form.slug} onChange={(e) => set("slug", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Summary</label>
              <Input className="mt-1.5" value={form.summary} onChange={(e) => set("summary", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="mt-1.5"
                rows={4}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Technologies (comma-separated)</label>
              <Input className="mt-1.5" value={form.technologies} onChange={(e) => set("technologies", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <ImageUpload label="Cover image" value={form.coverImageUrl} onChange={(url) => set("coverImageUrl", url)} />
            </div>
            <div>
              <label className="text-sm font-medium">Live URL</label>
              <Input className="mt-1.5" value={form.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Source URL</label>
              <Input className="mt-1.5" value={form.sourceUrl} onChange={(e) => set("sourceUrl", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                className="mt-1.5"
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
              <span className="text-sm">Featured</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit">{editingId ? "Update" : "Create"}</Button>
            {editingId && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      <div className="mt-8 space-y-3">
        {loading ? (
          <p className="text-muted">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-muted">No projects yet.</p>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs text-muted">{item.slug} · {item.status}{item.featured ? " · featured" : ""}</p>
                  {item.technologies?.length ? (
                    <p className="mt-1 text-xs text-muted">{item.technologies.join(", ")}</p>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => toggleStatus(item)}>
                    {item.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                  </Button>
                  <Button variant="secondary" onClick={() => toggleFeatured(item)}>
                    {item.featured ? "Unfeature" : "Feature"}
                  </Button>
                  <Button variant="secondary" onClick={() => startEdit(item)}>
                    Edit
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}