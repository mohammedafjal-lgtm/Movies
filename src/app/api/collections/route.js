import { z } from "zod"; 
import dbConnect from "@/lib/dbConnect";
import Collection from "@/models/Collection";
import { isAuthenticated } from "@/utility/auth";
import { NextResponse } from "next/server";
import { collectionZodSchema } from "@/lib/collectionZodSchema";

// Get collections of a user
export async function GET(req) {
  try {
    await dbConnect();

    const res = isAuthenticated(req);
    if (!res.success) {
      return NextResponse.json(
        { success: false, message: res.message },
        { status: res.status }
      );
    }
    const collections = await Collection.find({ user: res.userId });

    return NextResponse.json(
      {
        success: true,
        message: "Collections fetched successfully",
        collections,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching collections:", error.message);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

// create a collection
export async function POST(req) {
  try {
    await dbConnect();

   
    const { title, description } = await req.json();

    const res = isAuthenticated(req);
    if (!res.success) {
      return NextResponse.json(
        { success: false, message: res.message },
        { status: res.status }
      );
    }

    const parsed = collectionZodSchema.safeParse({
      title,
      description,
      user: res.userId,
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

    const newCollection = await Collection.create(parsed.data);
    return NextResponse.json(
      {
        success: true,
        message: "Collection created successfully",
        collection: newCollection,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating collection:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal server error",error:error.message },
      { status: 500 }
    );
  }
}
