import { useRef, useState } from "react";
import { Button } from "./Button";

type Result = { url: string; publicId: string };

export function ImageUpload({
  value,
  onChange,
  label = "Image",
}: {
  value: string;
  onChange: (url: string, publicId?: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? ""}/api/v1/admin/media/upload`, {
        method: "POST",
        credentials: "include",
        body: form,
      });
      const json = await res.json();
      if (!res.ok || !json?.success) {
        throw new Error(json?.error?.message ?? "Upload failed");
      }
      const data = json.data as Result;
      onChange(data.url, data.publicId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-1.5 flex items-center gap-3">
        {value ? (
          <img src={value} alt="" className="h-16 w-16 rounded-md border border-border object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-md border border-border bg-bg text-xs text-muted">
            No image
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()} disabled={uploading}>
            {uploading ? "Uploading…" : "Upload"}
          </Button>
          {value && (
            <Button type="button" variant="ghost" onClick={() => onChange("")}>
              Remove
            </Button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}