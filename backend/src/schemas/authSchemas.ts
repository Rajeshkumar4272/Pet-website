import { z } from "zod";

// Role enum
const roleEnum = z.enum(["customer", "admin", "vendor"]);

export const registerSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(20, { message: "Must be 20 or fewer characters long" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),

  profileUrl: z.string().url({ message: "Invalid URL" }),

  phone: z.string().length(10, { message: "Phone number must be exactly 10 digits" }),

  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
      country: z.string(),
    })
    .optional(),

  role: roleEnum.default("customer"), // Defaults to "customer"

  isVerified: z.boolean().default(false)
});
