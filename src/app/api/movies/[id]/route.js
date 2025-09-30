import dbConnect from "@/lib/dbConnect";
import { moviesInCollectionZodSchema } from "@/lib/moviesInCollectionZodSchema";
import MoviesInCollection from "@/models/moviesInCollection";
import { isAuthenticated } from "@/utility/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

// Get movies of a collection
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;// supposed to pass the collectionId as a param

    const res = isAuthenticated(req);
    if (!res.success) {
      return NextResponse.json(
        { success: false, message: res.message },
        { status: res.status }
      );
    }
    const movies = await MoviesInCollection.find({ collectionId: id });
    return NextResponse.json(
      {
        success: true,
        message: "Movies fetched successfully",
        movies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching movies in collection:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}


// Add a movie to a collection
export async function POST(req, { params }) {
  try {
    const { id } = await params;// supposed to pass the collectionId as a param
    await dbConnect();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "id is not provided" },
        { status: 404 }
      );
    }
    const res = isAuthenticated(req);
    if (!res.success) {
      return NextResponse.json(
        { success: false, message: res.message },
        { status: res.status }
      );
    }

    const body = await req.json();

    const parsed = moviesInCollectionZodSchema.safeParse({
      ...body,
      collectionId:id
    });

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

    const newMovie = await MoviesInCollection.create(parsed.data);

    return NextResponse.json(
      {
        success: true,
        message: "Movie added to collection successfully",
        movie: newMovie,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding movie to collection:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}


// Delete a movie from collection
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;// supposed to pass the movieInCollection Id as a param


    const res = isAuthenticated(req);
    if (!res.success) {
      return NextResponse.json(
        { success: false, message: res.message },
        { status: res.status }
      );
    }
    const deletedMovie = await MoviesInCollection.findByIdAndDelete(id);

    if (!deletedMovie) {
      return NextResponse.json(
        { success: false, message: "Movie not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Movie deleted successfully",
        deletedMovie,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting movie:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

