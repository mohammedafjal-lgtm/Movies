import mongoose from "mongoose";
const MovieTvSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

export default mongoose.models.MovieTv ||
  mongoose.model("MovieTv", MovieTvSchema);
