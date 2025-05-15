import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController";
import { validateRequest } from "../middlewares/validateRequest";
import { registerSchema } from "../schemas/authSchemas";
import { createUploadMiddleware } from "../middlewares/upload";

const router = Router();

const imageUpload = createUploadMiddleware(
  ["image/jpeg", "image/png"],
  "Only JPEG and PNG images are allowed"
);

router.post(
  "/register",
  imageUpload.single("profile"),
  validateRequest(registerSchema),
  registerUser
);

// router.post("/login", validateRequest(loginSchema), loginUser);
router.get("/logout", logoutUser);

export default router;
