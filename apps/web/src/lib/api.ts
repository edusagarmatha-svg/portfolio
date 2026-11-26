const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "";

/**
 * Resolve a stored media reference to a loadable URL. Absolute URLs are
 * returned as-is, so media uploaded before the move to a mounted volume still
 * renders; upload paths such as "/uploads/<id>.webp" get the API origin.
 */
export function mediaUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  if (/^(https?:)?\/\//.test(value) || value.startsWith("data:")) return value;
  return `${API_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function api<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  let json: { success: boolean; data?: T; error?: { message: string } } | null = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  if (!res.ok || !json?.success) {
    throw new ApiError(res.status, json?.error?.message ?? "Request failed");
  }
  return json.data as T;
}