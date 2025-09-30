import mongoose from "mongoose";
const moviesInCollectionSchema = new mongoose.Schema(
  {
    tmdbId: { type: Number, required: true },
    title: { type: String },
    poster: { type: String },
    mediaType: {
      type: String,
      required: true,
      enum: ["movie", "tv"],
      default: "movie",
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MoviesInCollection ||
  mongoose.model("MoviesInCollection", moviesInCollectionSchema);
