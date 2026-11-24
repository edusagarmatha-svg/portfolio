import { useEffect, useState } from "react";
import { api } from "./api";

export type PublicTestimonial = { id: string; clientName: string; clientRole: string | null; organization: string | null; feedback: string; photoUrl: string | null };

export function useTestimonials() {
  const [data, setData] = useState<PublicTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<PublicTestimonial[]>("/api/v1/public/testimonials")
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}