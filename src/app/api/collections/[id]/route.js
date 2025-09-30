import dbConnect from "@/lib/dbConnect";
import Collection from "@/models/Collection";
import { isAuthenticated } from "@/utility/auth";
import { NextResponse } from "next/server";
// delete a specific collection of a user
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params; //collectionId
    const res = isAuthenticated(req);
    if (!res.success) {
      return NextResponse.json(
        { success: false, message: res.message },
        { status: res.status }
      );
    }
    const deletedCollection = await Collection.findByIdAndDelete(id);
    if (!deletedCollection) {
      return NextResponse.json(
        { success: false, message: "Collection not found or already deleted" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Collection deleted successfully",
        deletedCollection,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting collection:", error.message);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
