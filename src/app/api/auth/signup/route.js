import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { userZodSchema } from "@/lib/userZodSchema";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const parsed = userZodSchema.safeParse(body);
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
    const { name, email, password } = parsed.data;
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "7d" }
    );
    return NextResponse.json(
      { success: true, message: "User created successfully", token },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
