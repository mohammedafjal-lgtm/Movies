import dbConnect from "@/lib/dbConnect";
import { movieTvZodSchema } from "@/lib/movieTvZodSchema";
import MovieTv from "@/models/MovieTv";
import { isAuthenticated } from "@/utility/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json(); //in title,poster,mediaType

    const res = isAuthenticated(req);
    if (!res.success) {
      return NextResponse.json(
        { success: false, message: res.message },
        { status: res.status }
      );
    }
    const parsed = movieTvZodSchema.safeParse(body);
    const lastMovie = await MovieTv.findOne().sort({ tmdbId: -1 }).exec();
    const newTmdbId = lastMovie ? lastMovie.tmdbId + 1 : 1;

    if (!parsed.success) {
      const tree = z.treeifyError(parsed.error);
      return NextResponse.json(
        {
          success: false,
          errorTree: tree,
        },
        { status: 400 }
      );
    }
    console.log("parsed data", parsed.data);
    const movie = new MovieTv({
      ...parsed.data,
      tmdbId: newTmdbId,
    });

    await movie.save();

    return NextResponse.json({ success: true, data: movie }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
// Get the movie/Tv

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 6;
    const skip = (page - 1) * limit;

    const movies = await MovieTv.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await MovieTv.countDocuments();

    return NextResponse.json(
      {
        success: true,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
        data: movies,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
