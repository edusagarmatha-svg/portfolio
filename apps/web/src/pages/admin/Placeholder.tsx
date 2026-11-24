import { Card } from "../../components/ui/Card";

export function Placeholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-1 text-sm text-muted">This module is coming in a later milestone.</p>
      <div className="mt-6">
        <Card>
          <p className="text-sm text-muted">No content yet.</p>
        </Card>
      </div>
    </div>
  );
}