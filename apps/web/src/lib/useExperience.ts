import { useEffect, useState } from "react";
import { api } from "./api";

export type PublicExperience = {
  id: string;
  company: string;
  position: string;
  employmentType: string | null;
  description: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
};

export function useExperience() {
  const [data, setData] = useState<PublicExperience[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<PublicExperience[]>("/api/v1/public/experience")
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}