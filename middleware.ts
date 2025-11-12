// export { auth as middleware } from "@/auth";

import { NextRequest } from "next/server";

export default function (req: NextRequest) {
  console.log(1 ,req.cookies.get("authjs.session-token"));
  if (!req.cookies.get("authjs.session-token")) {
    if (req.nextUrl.pathname !== "/accounts/login")
      return Response.redirect(new URL("/", req.nextUrl.origin));
  }
}

export const config = {
  matcher: ["/accounts/login", "/home/:path*"],
};
