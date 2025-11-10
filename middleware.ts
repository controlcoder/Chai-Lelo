import { NextRequest, NextResponse } from "next/server";
import { verifyCookie } from "./lib/cookies";

export async function middleware(req: NextRequest) {
  // console.log(req.nextUrl.origin);
  // console.log("cookie:", req.cookies.get("sid"));
  // console.log(req.nextUrl.pathname);

  const sid_key = req.cookies.get("sid");
  if (!sid_key) {
    if (
      req.nextUrl.pathname === "/accounts/login" ||
      req.nextUrl.pathname === "/accounts/register"
    )
      return NextResponse.next();
    else return Response.redirect(new URL("/", req.nextUrl.origin));
  } else {
    const token = sid_key.value || "";
    const payload = await verifyCookie(token);
    if (!payload) {
      return NextResponse.next();
    }
    if (
      req.nextUrl.pathname === "/accounts/login" ||
      req.nextUrl.pathname === "/accounts/register"
    )
      return Response.redirect(new URL("/home", req.nextUrl.origin));
  }
}

export const config = {
  matcher: ["/home/:path*", "/admin/:path*", "/accounts/:path*"],
};
