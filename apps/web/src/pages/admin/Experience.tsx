import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useToast } from "../../components/ui/Toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";

type Item = {
  id: string;
  company: string;
  position: string;
  employmentType: string | null;
  description: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  status: string;
};

const empty = {
  company: "",
  position: "",
  employmentType: "",
  description: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  status: "DRAFT",
};

export function ExperienceAdmin() {
  const { show } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setItems(await api<Item[]>("/api/v1/admin/experience"));
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
      company: item.company,
      position: item.position,
      employmentType: item.employmentType ?? "",
      description: item.description ?? "",
      startDate: item.startDate.slice(0, 10),
      endDate: item.endDate ? item.endDate.slice(0, 10) : "",
      isCurrent: item.isCurrent,
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
      company: form.company,
      position: form.position,
      employmentType: form.employmentType || null,
      description: form.description || null,
      startDate: form.startDate,
      endDate: form.endDate || null,
      isCurrent: form.isCurrent,
      status: form.status,
    };
    try {
      if (editingId) {
        await api(`/api/v1/admin/experience/${editingId}`, { method: "PUT", body: JSON.stringify(payload) });
        show("Updated");
      } else {
        await api("/api/v1/admin/experience", { method: "POST", body: JSON.stringify(payload) });
        show("Created");
      }
      resetForm();
      await load();
    } catch (err) {
      show(err instanceof Error ? err.message : "Save failed", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this experience?")) return;
    try {
      await api(`/api/v1/admin/experience/${id}`, { method: "DELETE" });
      show("Deleted");
      await load();
    } catch (err) {
      show(err instanceof Error ? err.message : "Delete failed", "error");
    }
  }

  async function toggleStatus(item: Item) {
    const next = item.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      await api(`/api/v1/admin/experience/${item.id}`, { method: "PUT", body: JSON.stringify({ status: next }) });
      await load();
    } catch (err) {
      show(err instanceof Error ? err.message : "Update failed", "error");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Experience</h1>
      <p className="mt-1 text-sm text-muted">Manage experience entries.</p>

      <Card className="mt-6">
        <h2 className="text-sm font-semibold">{editingId ? "Edit experience" : "New experience"}</h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Company</label>
              <Input className="mt-1.5" value={form.company} onChange={(e) => set("company", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium">Position</label>
              <Input className="mt-1.5" value={form.position} onChange={(e) => set("position", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium">Employment type</label>
              <select
                className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm"
                value={form.employmentType}
                onChange={(e) => set("employmentType", e.target.value)}
              >
                <option value="">—</option>
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="CONTRACT">Contract</option>
                <option value="FREELANCE">Freelance</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm"
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Start date</label>
              <Input className="mt-1.5" type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium">End date</label>
              <Input className="mt-1.5" type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} disabled={form.isCurrent} />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.isCurrent} onChange={(e) => set("isCurrent", e.target.checked)} />
                Current role
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm"
                rows={4}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
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
          <p className="text-muted">No experience entries yet.</p>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-semibold">{item.position}</p>
                  <p className="text-sm text-accent">{item.company}</p>
                  <p className="text-xs text-muted">{item.status}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => toggleStatus(item)}>
                    {item.status === "PUBLISHED" ? "Unpublish" : "Publish"}
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