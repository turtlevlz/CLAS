import multer, { FileFilterCallback } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads", "logos");

try {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log("Carpeta creada:", uploadDir);
    }
} catch (error) {
    console.error("Error creando carpeta de uploads:", error);
}

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `logo-${uuidv4()}${ext}`);
    }
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedMimeTypes.includes(file.mimetype) || !allowedExtensions.includes(ext)) {
        const err: any = new Error("Formato de imagen no permitido");
        err.statusCode = 400;
        return cb(err);
    }

    cb(null, true);
};

export const uploadLogo = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});