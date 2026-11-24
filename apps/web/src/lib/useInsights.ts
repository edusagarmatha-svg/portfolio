import { useEffect, useState } from "react";
import { api } from "./api";

export type PublicInsight = { id: string; title: string; excerpt: string | null; content: string | null };

export function useInsights() {
  const [data, setData] = useState<PublicInsight[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<PublicInsight[]>("/api/v1/public/insights")
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}
