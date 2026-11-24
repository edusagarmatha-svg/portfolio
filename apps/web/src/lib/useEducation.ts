import { useEffect, useState } from "react";
import { api } from "./api";

export type PublicEducation = {
  id: string;
  institution: string;
  qualification: string;
  fieldOfStudy: string | null;
  description: string | null;
  startDate: string;
  endDate: string | null;
};

export function useEducation() {
  const [data, setData] = useState<PublicEducation[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<PublicEducation[]>("/api/v1/public/education")
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}