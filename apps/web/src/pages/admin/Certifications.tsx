import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useToast } from "../../components/ui/Toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";

type Item = { id: string; title: string; issuer: string; issueDate: string; credentialUrl: string | null; certificateUrl: string | null; status: string };

const empty = { title: "", issuer: "", issueDate: "", credentialUrl: "", certificateUrl: "", status: "DRAFT" };

export function CertificationsAdmin() {
  const { show } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setItems(await api<Item[]>("/api/v1/admin/certifications")); }
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
      title: item.title,
      issuer: item.issuer,
      issueDate: item.issueDate.slice(0, 10),
      credentialUrl: item.credentialUrl ?? "",
      certificateUrl: item.certificateUrl ?? "",
      status: item.status,
    });
  }
  function resetForm() { setEditingId(null); setForm(empty); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: form.title,
      issuer: form.issuer,
      issueDate: form.issueDate,
      credentialUrl: form.credentialUrl || null,
      certificateUrl: form.certificateUrl || null,
      status: form.status,
    };
    try {
      if (editingId) await api(`/api/v1/admin/certifications/${editingId}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api("/api/v1/admin/certifications", { method: "POST", body: JSON.stringify(payload) });
      show(editingId ? "Updated" : "Created");
      resetForm();
      await load();
    } catch (err) { show(err instanceof Error ? err.message : "Save failed", "error"); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this certification?")) return;
    try { await api(`/api/v1/admin/certifications/${id}`, { method: "DELETE" }); show("Deleted"); await load(); }
    catch (err) { show(err instanceof Error ? err.message : "Delete failed", "error"); }
  }

  async function toggleStatus(item: Item) {
    const next = item.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try { await api(`/api/v1/admin/certifications/${item.id}`, { method: "PUT", body: JSON.stringify({ status: next }) }); await load(); }
    catch (err) { show(err instanceof Error ? err.message : "Update failed", "error"); }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Certifications</h1>
      <p className="mt-1 text-sm text-muted">Manage certifications.</p>
      <Card className="mt-6">
        <h2 className="text-sm font-semibold">{editingId ? "Edit certification" : "New certification"}</h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input className="mt-1.5" value={form.title} onChange={(e) => set("title", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium">Issuer</label>
              <Input className="mt-1.5" value={form.issuer} onChange={(e) => set("issuer", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium">Issue date</label>
              <Input className="mt-1.5" type="date" value={form.issueDate} onChange={(e) => set("issueDate", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <select className="mt-1.5" value={form.status} onChange={(e) => set("status", e.target.value)}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Credential URL</label>
              <Input className="mt-1.5" value={form.credentialUrl} onChange={(e) => set("credentialUrl", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Certificate URL</label>
              <Input className="mt-1.5" value={form.certificateUrl} onChange={(e) => set("certificateUrl", e.target.value)} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit">{editingId ? "Update" : "Create"}</Button>
            {editingId && <Button type="button" variant="secondary" onClick={resetForm}>Cancel</Button>}
          </div>
        </form>
      </Card>

      <div className="mt-8 space-y-3">
        {loading ? <p className="text-muted">Loading…</p> : items.length === 0 ? <p className="text-muted">No certifications yet.</p> : items.map((item) => (
          <Card key={item.id}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs text-muted">{item.issuer} · {item.status}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => toggleStatus(item)}>{item.status === "PUBLISHED" ? "Unpublish" : "Publish"}</Button>
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