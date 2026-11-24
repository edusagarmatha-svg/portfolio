import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Card } from "../../components/ui/Card";

type Stats = { projects: number; experiences: number; certifications: number; unreadMessages: number };

export function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<Stats>("/api/v1/admin/dashboard")
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  const items = stats
    ? [
        { label: "Projects", value: stats.projects },
        { label: "Experience entries", value: stats.experiences },
        { label: "Certifications", value: stats.certifications },
        { label: "Unread messages", value: stats.unreadMessages },
      ]
    : [];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Overview of your portfolio content.</p>

      {error && (
        <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats
          ? items.map((i) => (
              <Card key={i.label}>
                <p className="text-xs uppercase tracking-wide text-muted">{i.label}</p>
                <p className="mt-2 text-3xl font-semibold">{i.value}</p>
              </Card>
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <div className="h-4 w-24 animate-pulse rounded bg-border" />
                <div className="mt-3 h-8 w-12 animate-pulse rounded bg-border" />
              </Card>
            ))}
      </div>

      <div className="mt-10">
        <Card>
          <h2 className="text-sm font-semibold">Quick actions</h2>
          <p className="mt-2 text-sm text-muted">
            Content management modules will be available in upcoming milestones.
          </p>
        </Card>
      </div>
    </div>
  );
}