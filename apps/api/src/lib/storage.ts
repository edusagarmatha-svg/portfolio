import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { env } from "../config/env.js";

/** Mimetypes accepted by the media upload endpoint, mapped to their extension. */
export const ALLOWED_UPLOAD_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "application/pdf": ".pdf",
};

export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

/** Path prefix the uploads directory is served under. */
export const UPLOADS_ROUTE = "/uploads";

/**
 * Absolute path to the directory uploads live in. On Railway this is a mounted
 * volume (UPLOAD_DIR=/data/uploads) so the files survive redeploys.
 */
export const uploadDir = path.resolve(env.UPLOAD_DIR);

export function ensureUploadDir() {
  mkdirSync(uploadDir, { recursive: true });
}

/** A collision-free filename that never derives from the client's filename. */
export function buildStoredName(mimetype: string) {
  return `${randomUUID()}${ALLOWED_UPLOAD_TYPES[mimetype] ?? ""}`;
}

/** The URL a stored file is publicly reachable at, relative to the app origin. */
export function buildPublicUrl(storedName: string) {
  return `${UPLOADS_ROUTE}/${storedName}`;
}

/**
 * Resolve a caller-supplied publicId to a path inside the upload directory.
 * Returns null for anything that is not a bare filename we issued, so a
 * traversal attempt is reported rather than silently reinterpreted.
 */
export function resolveStoredPath(publicId: string): string | null {
  const name = publicId.trim();
  if (!name || name !== path.basename(name) || name === "." || name === "..") return null;
  if (name.includes("/") || name.includes("\\") || name.includes("\0")) return null;

  const resolved = path.resolve(uploadDir, name);
  if (path.dirname(resolved) !== uploadDir) return null;

  return resolved;
}
