const secret = new TextEncoder().encode(process.env.COOKIE_SECRET);

import { JWTPayload, jwtVerify, SignJWT } from "jose";

export async function signCookie(payload: JWTPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  return token;
}

export async function verifyCookie(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return false;
  }
}
