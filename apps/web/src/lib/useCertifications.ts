import { useEffect, useState } from "react";
import { api } from "./api";

export type PublicCertification = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string | null;
};

export function useCertifications() {
  const [data, setData] = useState<PublicCertification[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<PublicCertification[]>("/api/v1/public/certifications")
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}