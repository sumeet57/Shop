import multer from "multer";
import path from "path";
import fs from "fs";

// Define the upload directory
const uploadDir = "uploads/";

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure how files are stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedMimes = /jpeg|jpg|png|gif/;
  const isMimeTypeAllowed = allowedMimes.test(file.mimetype);
  const isExtensionAllowed = allowedMimes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (isMimeTypeAllowed && isExtensionAllowed) {
    cb(null, true);
  } else {
    cb(
      new Error("Error: Only image files (jpeg, jpg, png, gif) are allowed!"),
      false
    );
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    // Set a file size limit (e.g., 5MB)
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
