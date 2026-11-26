import type { Request, Response, NextFunction } from "express";
import { unlink } from "node:fs/promises";
import multer from "multer";
import {
  ALLOWED_UPLOAD_TYPES,
  MAX_UPLOAD_SIZE,
  buildPublicUrl,
  buildStoredName,
  resolveStoredPath,
  uploadDir,
} from "../../lib/storage.js";
import { AppError } from "../../middleware/error-handler.js";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, buildStoredName(file.mimetype));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_UPLOAD_SIZE },
  fileFilter: (_req, file, cb) => {
    if (!(file.mimetype in ALLOWED_UPLOAD_TYPES)) {
      cb(new AppError(400, "Unsupported file type", "INVALID_FILE_TYPE"));
      return;
    }
    cb(null, true);
  },
});

export const uploadMiddleware = upload.single("file");

export async function uploadHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const file = (req as Request & { file?: Express.Multer.File }).file;
    if (!file) throw new AppError(400, "No file provided", "NO_FILE");

    res.status(201).json({
      success: true,
      data: {
        url: buildPublicUrl(file.filename),
        publicId: file.filename,
        size: file.size,
        mimetype: file.mimetype,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const publicId = decodeURIComponent(req.params.publicId as string);
    const target = resolveStoredPath(publicId);
    if (!target) throw new AppError(400, "Invalid file id", "INVALID_FILE_ID");

    try {
      await unlink(target);
    } catch (err) {
      // Already gone: deleting is idempotent, so this is still a success.
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    }

    res.json({ success: true, data: null });
  } catch (err) {
    next(err);
  }
}
