import { useEffect, useState } from "react";
import { api } from "./api";

export type PublicPortfolio = {
  fullName: string;
  professionalTitle: string | null;
  introduction: string | null;
  biography: string | null;
  profileImageUrl: string | null;
  resumeUrl: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  slug: string | null;
};

export function usePortfolio() {
  const [data, setData] = useState<PublicPortfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<PublicPortfolio>("/api/v1/public/portfolio")
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}