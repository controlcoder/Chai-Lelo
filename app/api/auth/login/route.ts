import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { comparePassword } from "@/lib/password";
import { cookies } from "next/headers";
import { signCookie } from "@/lib/cookies";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 403 }
      );
    }
    const isPasswordMatched = await comparePassword(
      password,
      user.password
    );
    if (!isPasswordMatched) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 403 }
      );
    }
    const token = await signCookie({ id: user.id, email, role: user.role});
    const cookieStore = await cookies();
    cookieStore.set("sid", token, {
      httpOnly: true,
      maxAge: 60 * 60,
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.log(err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
