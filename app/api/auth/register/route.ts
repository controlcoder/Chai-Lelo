import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/password";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { username, email, password, role } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({username, email, password: hashedPassword, role});

    return Response.json({ success: true, data: newUser }, { status: 201 });

  } catch (err: any) {
    console.log(err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
