import multer from "multer";
import { imagekit } from "../services/image.service.js";

const multerUpload = multer({
  storage: multer.memoryStorage(),
}).single("file");

export const imagekitUploadMiddleware = (req, res, next) => {
  multerUpload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file) {
      return next();
    }
    try {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "project-uploads",
      });

      req.body.imageUrl = result.url;
      req.body.imageFileId = result.fileId;

      next();
    } catch (uploadError) {
      console.error(uploadError);
      return res.status(500).json({ message: "Failed to upload image." });
    }
  });
};
