import { Request, Response } from "express";
import PetType from "../models/PetType";
import { ApiResponse } from "../utils/apiResponse";
import { AppError } from "../utils/AppError";

export const createPetType = async (req: Request, res: Response) => {
  const petType = await PetType.create(req.body);
  res.status(201).json(ApiResponse("Pet type created", petType));
};

export const getAllPetTypes = async (_req: Request, res: Response) => {
  const petTypes = await PetType.find();
  res.status(200).json(ApiResponse("Pet types fetched", petType));
};

export const deletePetType = async (req: Request, res: Response) => {
  const petType = await PetType.findByIdAndDelete(req.params.id);
  if (!petType) return next(new AppError("Pet type not found", 404));
  res.status().json(ApiResponse("Pet type deleted"));
};

// export const updatePetType = async (req: Request, res: Response) => {
//   const petType = await PetType.findByIdAndUpdate(req.params.id);
//   if (!petType) return next(new AppError("Pet type not found", 404));
//   res.status().json(ApiResponse("Pet type deleted"));
// };
