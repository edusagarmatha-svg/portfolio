import { useEffect, useState } from "react";
import { api } from "./api";

export type PublicProject = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  description: string | null;
  coverImageUrl: string | null;
  technologies: string[];
  liveUrl: string | null;
  sourceUrl: string | null;
  featured: boolean;
};

export function useProjects() {
  const [data, setData] = useState<PublicProject[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<PublicProject[]>("/api/v1/public/projects")
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}