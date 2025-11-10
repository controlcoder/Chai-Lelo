import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { verifyCookie } from "@/lib/cookies";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("sid")?.value || "";
    const payload: any = await verifyCookie(token);
    const user = await User.findOne({ email: payload.email });
    await connectDB();
    const { order } = await req.json();
    await Order.create({ food: order, orderedBy: user?._id });
    return Response.json({ success: true }, { status: 201 });
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const orders = await Order.find()
      .populate("orderedBy", "email -_id")
      .select("food createdAt status")
      .sort({ createdAt: -1 });
    const grouped: Record<string, any[]> = {};
    orders.forEach((order: any) => {
      const date = order.createdAt.toLocaleString("en-IN").split(",")[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(order);
    });
    return Response.json({ success: true, grouped }, { status: 200 });
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { orderId } = await req.json();
    await Order.findByIdAndDelete(orderId);
    return Response.json(
      { success: true, message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
