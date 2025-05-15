import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import { AppError } from "../utils/apiError";
import { ApiResponse, sendSuccess } from "../utils/apiResponse";

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  const response = new ApiResponse({message:"Product created", data:product})
  res.status(201).json(response)
};

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await Product.find().populate("bundles");
  sendSuccess(res, "Products fetched", products);
  const response = new ApiResponse({message:, data:})
  res.status().json(response)
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).populate("bundles");
  if (!product) throw throw new AppError("Product not found", 404);
  sendSuccess(res, "Product fetched", product);
  const response = new ApiResponse({message:, data:})
  res.status().json(response)
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) throw throw new AppError("Product not found", 404);
  sendSuccess(res, "Product updated", product);
  const response = new ApiResponse({message:, data:})
  res.status().json(response)
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw throw new AppError("Product not found", 404);
  sendSuccess(res, "Product deleted");
  const response = new ApiResponse({message:, data:})
  res.status().json(response)
};
