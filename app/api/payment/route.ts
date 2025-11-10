import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import Payment from "@/models/Payment";
import User from "@/models/User";
import { verifyCookie } from "@/lib/cookies";
import { fileUpload } from "@/lib/fileUpload";
import Order from "@/models/Order";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data: FormData = await req.formData();
    const file = data.get("file") as File;
    const orderId = data.get("orderId") as File;
    if (!file) return Response.json({ success: false, message: "No File" });

    const token = req.cookies.get("sid")?.value || "";
    const payload: any = await verifyCookie(token);
    const user = await User.findOne({ email: payload.email }).select("_id");

    const { url }: any = await fileUpload(file);
    await Payment.create({ imageUrl: url, userId: user?.id, orderId });
    await Order.findByIdAndUpdate(orderId, { status: "uploaded" });
    return Response.json({ success: true }, { status: 201 });
    
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
