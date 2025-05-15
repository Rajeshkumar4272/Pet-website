import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ApiError } from "../utils/apiError";
import { formatZodErrors } from "../utils/formatZodErrors";

export const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = req.body;

      if (req.is("multipart/form-data")) {
        data = {
          ...req.body,
          address: {
            street: req.body["address.street"],
            city: req.body["address.city"],
            state: req.body["address.state"],
            postalCode: req.body["address.postalCode"],
            country: req.body["address.country"],
          },
          isVerified: req.body.isVerified === "true",
        };
      }
      schema.parse(data);
      next();
    } catch (error: any) {
      const errors = formatZodErrors(error.errors) as any;
      throw new ApiError({ message: "All input fields are required", errors, statusCode: 400 });
    }
  };
