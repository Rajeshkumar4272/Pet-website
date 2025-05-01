import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController";
import { validateRequest } from "../middlewares/validateRequest";
import { registerSchema, loginSchema } from "../schemas/authSchemas";

const router = Router();

router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);
router.get("/logout", logoutUser);

export default router;
