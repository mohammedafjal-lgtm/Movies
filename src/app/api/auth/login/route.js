import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { loginZodSchema } from "@/lib/userZodSchema";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const parsed = loginZodSchema.safeParse(body);
    if (!parsed.success) {
      const errorTree = z.treeifyError(parsed.error);

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: errorTree,
        },
        { status: 400 }
      );
    }
    const { email, password } = parsed.data;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password", success: false },
        { status: 400 }
      );
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid email or password", success: false },
        { status: 400 }
      );
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "7d" }
    );
    return NextResponse.json(
      { token, success: true, message: "logged In Successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
}
