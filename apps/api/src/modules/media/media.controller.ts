import type { Request, Response, NextFunction } from "express";
import multer from "multer";
import { cloudinary } from "../../lib/cloudinary.js";
import { env } from "../../config/env.js";
import { AppError } from "../../middleware/error-handler.js";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      cb(new AppError(400, "Unsupported file type", "INVALID_FILE_TYPE"));
      return;
    }
    cb(null, true);
  },
});

export const uploadMiddleware = upload.single("file");

export async function uploadHandler(req: Request, res: Response, next: NextFunction) {
  try {
    if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
      throw new AppError(503, "Cloudinary is not configured", "CLOUDINARY_NOT_CONFIGURED");
    }
    const file = (req as Request & { file?: Express.Multer.File }).file;
    if (!file) throw new AppError(400, "No file provided", "NO_FILE");

    const result = await new Promise<{ secure_url: string; public_id: string; width?: number; height?: number; format?: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "portfolio-cms", resource_type: "auto" },
        (err, res) => {
          if (err || !res) reject(err ?? new Error("Upload failed"));
          else resolve(res as any);
        },
      );
      stream.end(file.buffer);
    });

    res.status(201).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteHandler(req: Request, res: Response, next: NextFunction) {
  try {
    if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
      throw new AppError(503, "Cloudinary is not configured", "CLOUDINARY_NOT_CONFIGURED");
    }
    const publicId = decodeURIComponent(req.params.publicId as string);
    await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
    res.json({ success: true, data: null });
  } catch (err) {
    next(err);
  }
}