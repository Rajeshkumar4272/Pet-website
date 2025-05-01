import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(10),
  price: z.number().nonnegative(),
  category: z.enum(["food", "toy", "accessory", "medicine"]),
  petType: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)), // MongoDB ObjectId
  breedSize: z.enum(["Small", "Medium", "Large"]).optional(),
  ageRange: z.enum(["Puppy/Kitten", "Adult", "Senior"]).optional(),
  nutritionalInfo: z.string().optional(),
  brand: z.string().optional(),
  countInStock: z.number().int().nonnegative(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  variants: z
    .array(
      z.object({
        label: z.string(),
        stock: z.number().int().nonnegative(),
        price: z.number().nonnegative().optional(),
      })
    )
    .optional(),
  bundles: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
});
