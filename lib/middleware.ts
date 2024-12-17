import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get("token"); // Get token from cookies

  // Extract the value of the cookie as a string
  const token = tokenCookie?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify JWT token
    jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Protect specific routes
export const config = {
  matcher: ["/dashboard/:path*"], // Protect `/dashboard` and its subroutes
};
