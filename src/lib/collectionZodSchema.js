import { z } from "zod";

export const collectionZodSchema = z.object({
  title: z
    .string()
    .min(5, "Title is required")
    .max(100, "Title can not be more than 100 character")
    .trim(),

  description: z
    .string()
    .min(20, "Description is required")
    .max(600, "Description can not be more than 600 character")
    .trim(),
    
  user: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid User ObjectId"),
});
