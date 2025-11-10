import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    // const sid = cookieStore.get("sid");
    // console.log(sid);
    cookieStore.delete("sid");

    return Response.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.log(err);
    return Response.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}
