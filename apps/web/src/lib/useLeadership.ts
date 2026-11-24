import { useEffect, useState } from "react";
import { api } from "./api";

export type PublicLeadership = { id: string; title: string; organization: string | null; description: string | null };

export function useLeadership() {
  const [data, setData] = useState<PublicLeadership[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<PublicLeadership[]>("/api/v1/public/leadership")
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}
