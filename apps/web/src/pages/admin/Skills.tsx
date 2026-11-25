import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useToast } from "../../components/ui/Toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";

type Item = { id: string; name: string; category: string | null; proficiency: string | null };

const empty = { name: "", category: "", proficiency: "" };

export function SkillsAdmin() {
  const { show } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setItems(await api<Item[]>("/api/v1/admin/skills")); }
    catch (e) { show(e instanceof Error ? e.message : "Load failed", "error"); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function set<K extends keyof typeof empty>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function startEdit(item: Item) {
    setEditingId(item.id);
    setForm({ name: item.name, category: item.category ?? "", proficiency: item.proficiency ?? "" });
  }
  function resetForm() { setEditingId(null); setForm(empty); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { name: form.name, category: form.category || null, proficiency: form.proficiency || null };
    try {
      if (editingId) await api(`/api/v1/admin/skills/${editingId}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api("/api/v1/admin/skills", { method: "POST", body: JSON.stringify(payload) });
      show(editingId ? "Updated" : "Created");
      resetForm();
      await load();
    } catch (err) { show(err instanceof Error ? err.message : "Save failed", "error"); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this skill?")) return;
    try { await api(`/api/v1/admin/skills/${id}`, { method: "DELETE" }); show("Deleted"); await load(); }
    catch (err) { show(err instanceof Error ? err.message : "Delete failed", "error"); }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Skills</h1>
      <p className="mt-1 text-sm text-muted">Manage skills.</p>
      <Card className="mt-6">
        <h2 className="text-sm font-semibold">{editingId ? "Edit skill" : "New skill"}</h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input className="mt-1.5" value={form.name} onChange={(e) => set("name", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Input className="mt-1.5" value={form.category} onChange={(e) => set("category", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Proficiency</label>
              <select className="mt-1.5" value={form.proficiency} onChange={(e) => set("proficiency", e.target.value)}>
                <option value="">—</option>
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
                <option value="EXPERT">Expert</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit">{editingId ? "Update" : "Create"}</Button>
            {editingId && <Button type="button" variant="secondary" onClick={resetForm}>Cancel</Button>}
          </div>
        </form>
      </Card>

      <div className="mt-8 space-y-3">
        {loading ? <p className="text-muted">Loading…</p> : items.length === 0 ? <p className="text-muted">No skills yet.</p> : items.map((item) => (
          <Card key={item.id}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-muted">{item.category ?? "—"} · {item.proficiency ?? "—"}</p>
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