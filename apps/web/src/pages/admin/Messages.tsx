import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useToast } from "../../components/ui/Toast";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

type Item = { id: string; senderName: string; senderEmail: string; subject: string | null; message: string; readAt: string | null; createdAt: string };

export function MessagesAdmin() {
  const { show } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() { setLoading(true); try { setItems(await api<Item[]>("/api/v1/admin/messages")); } catch (e) { show(e instanceof Error ? e.message : "Load failed", "error"); } finally { setLoading(false); } }
  useEffect(() => { load(); }, []);

  async function toggleRead(item: Item) {
    try { await api(`/api/v1/admin/messages/${item.id}/read`, { method: "PATCH", body: JSON.stringify({ read: !item.readAt }) }); await load(); }
    catch (e) { show(e instanceof Error ? e.message : "Update failed", "error"); }
  }
  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    try { await api(`/api/v1/admin/messages/${id}`, { method: "DELETE" }); show("Deleted"); await load(); }
    catch (e) { show(e instanceof Error ? e.message : "Delete failed", "error"); }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Messages</h1>
      <p className="mt-1 text-sm text-muted">Contact form submissions.</p>
      <div className="mt-8 space-y-3">
        {loading ? <p className="text-muted">Loading…</p> : items.length === 0 ? <p className="text-muted">No messages.</p> : items.map((item) => (
          <Card key={item.id}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="font-semibold">{item.senderName} <span className="text-xs text-muted">({item.senderEmail})</span></p>
                {item.subject && <p className="text-sm text-accent">{item.subject}</p>}
                <p className="mt-2 text-sm text-muted">{item.message}</p>
                <p className="mt-2 text-xs text-muted">{new Date(item.createdAt).toLocaleString()} · {item.readAt ? "Read" : "Unread"}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => toggleRead(item)}>{item.readAt ? "Mark unread" : "Mark read"}</Button>
                <Button variant="ghost" onClick={() => handleDelete(item.id)}>Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}