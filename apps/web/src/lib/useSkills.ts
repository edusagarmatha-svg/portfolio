import { useEffect, useState } from "react";
import { api } from "./api";

export type PublicSkill = { id: string; name: string; category: string | null; proficiency: string | null };

export function useSkills() {
  const [data, setData] = useState<PublicSkill[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<PublicSkill[]>("/api/v1/public/skills")
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}