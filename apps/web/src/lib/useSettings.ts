import { useEffect, useState } from "react";
import { api } from "./api";

export type SocialLink = { label: string; url: string };
export type SectionVisibility = Record<string, boolean>;
export type Seo = { title?: string | null; description?: string | null };

export type PublicSettings = {
  socialLinks?: SocialLink[];
  sectionVisibility?: SectionVisibility;
  seo?: Seo;
};

export function useSettings() {
  const [data, setData] = useState<PublicSettings>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<PublicSettings>("/api/v1/public/settings")
      .then(setData)
      .catch(() => setData({}))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}