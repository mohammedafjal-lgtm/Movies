import { z } from "zod";

export const userZodSchema = z.object({
  name: z
    .string()
    .min(5, "Min 5 Character is required")
    .max(50, "Name Can be more than 50 Character")
    .trim(),
  email: z
    .string()
     .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
  
});

//extract Login schema for email and password
export const loginZodSchema = userZodSchema.pick({
  email: true,
  password: true,
});