// moviesInCollection.schema.ts
import { z } from "zod";
export const moviesInCollectionZodSchema = z.object({
  tmdbId: z.coerce.number().int().positive(),
  title: z
    .string()
    .min(5, "minimum 5 characters are allowed")
    .max(100, "maximum 100 characters are allowed")
    .optional(),
  poster: z.string().max(500, "maximum 40 characters are allowed").optional(),
  mediaType: z.enum(["movie", "tv"]).default("movie"),
  collectionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid collectionId"),
});
