import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import petTypeRoutes from "./petTypeRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/pet-types", petTypeRoutes);

export default router;
