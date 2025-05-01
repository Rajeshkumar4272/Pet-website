import { Router } from "express";
import { createPetType, getAllPetTypes, deletePetType } from "../controllers/petTypeController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getAllPetTypes));
router.post("/", asyncHandler(createPetType));
router.delete("/:id", asyncHandler(deletePetType));

export default router;
