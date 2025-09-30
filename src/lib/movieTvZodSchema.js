import { z } from "zod";
export const movieTvZodSchema = z.object({
  title: z
    .string()
    .min(5, "minimum 5 characters are allowed")
    .max(100, "maximum 100 characters are allowed")
    .optional(),
  poster: z.string().max(150, "maximum 150 characters are allowed"),
  mediaType: z.enum(["movie", "tv"]).default("movie"),
});
