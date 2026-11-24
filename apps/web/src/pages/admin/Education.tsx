import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useToast } from "../../components/ui/Toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";

type Item = { id: string; institution: string; qualification: string; fieldOfStudy: string | null; description: string | null; startDate: string; endDate: string | null };

const empty = { institution: "", qualification: "", fieldOfStudy: "", description: "", startDate: "", endDate: "" };

export function EducationAdmin() {
  const { show } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setItems(await api<Item[]>("/api/v1/admin/education")); }
    catch (e) { show(e instanceof Error ? e.message : "Load failed", "error"); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function set<K extends keyof typeof empty>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function startEdit(item: Item) {
    setEditingId(item.id);
    setForm({
      institution: item.institution,
      qualification: item.qualification,
      fieldOfStudy: item.fieldOfStudy ?? "",
      description: item.description ?? "",
      startDate: item.startDate.slice(0, 10),
      endDate: item.endDate ? item.endDate.slice(0, 10) : "",
    });
  }
  function resetForm() { setEditingId(null); setForm(empty); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      institution: form.institution,
      qualification: form.qualification,
      fieldOfStudy: form.fieldOfStudy || null,
      description: form.description || null,
      startDate: form.startDate,
      endDate: form.endDate || null,
    };
    try {
      if (editingId) await api(`/api/v1/admin/education/${editingId}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api("/api/v1/admin/education", { method: "POST", body: JSON.stringify(payload) });
      show(editingId ? "Updated" : "Created");
      resetForm();
      await load();
    } catch (err) { show(err instanceof Error ? err.message : "Save failed", "error"); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this education entry?")) return;
    try { await api(`/api/v1/admin/education/${id}`, { method: "DELETE" }); show("Deleted"); await load(); }
    catch (err) { show(err instanceof Error ? err.message : "Delete failed", "error"); }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Education</h1>
      <p className="mt-1 text-sm text-muted">Manage education records.</p>
      <Card className="mt-6">
        <h2 className="text-sm font-semibold">{editingId ? "Edit education" : "New education"}</h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Institution</label>
              <Input className="mt-1.5" value={form.institution} onChange={(e) => set("institution", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium">Qualification</label>
              <Input className="mt-1.5" value={form.qualification} onChange={(e) => set("qualification", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium">Field of study</label>
              <Input className="mt-1.5" value={form.fieldOfStudy} onChange={(e) => set("fieldOfStudy", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Start date</label>
              <Input className="mt-1.5" type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium">End date</label>
              <Input className="mt-1.5" type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit">{editingId ? "Update" : "Create"}</Button>
            {editingId && <Button type="button" variant="secondary" onClick={resetForm}>Cancel</Button>}
          </div>
        </form>
      </Card>

      <div className="mt-8 space-y-3">
        {loading ? <p className="text-muted">Loading…</p> : items.length === 0 ? <p className="text-muted">No education entries yet.</p> : items.map((item) => (
          <Card key={item.id}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{item.qualification} — {item.institution}</p>
                <p className="text-xs text-muted">{item.fieldOfStudy}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => startEdit(item)}>Edit</Button>
                <Button variant="ghost" onClick={() => handleDelete(item.id)}>Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}