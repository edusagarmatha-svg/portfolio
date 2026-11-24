import { useEffect, useState } from "react";
import { api } from "./api";

export type PublicService = { id: string; title: string; description: string | null; imageUrl: string | null };

export function useServices() {
  const [data, setData] = useState<PublicService[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<PublicService[]>("/api/v1/public/services")
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}