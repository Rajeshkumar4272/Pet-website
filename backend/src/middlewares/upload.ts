import multer from "multer";
import path from "path";

export const createUploadMiddleware = (
  allowedTypes: string[],
  errorMessage = "Invalid file type"
) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(errorMessage));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Optional: 5MB max
  });
};
