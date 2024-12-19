// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   console.log(pathname);

//   const token = req.cookies.get("token")?.value;

//   // Handle protected paths
//   if (pathname.startsWith("/dashboard")) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/admin", req.url));
//     }

//     try {
//       await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
//       return NextResponse.next();
//     } catch (err) {
//       console.error("Invalid token:", err);
//       return NextResponse.redirect(new URL("/admin", req.url));
//     }
//   }

//   // Handle /admin path specifically
//   if (pathname.startsWith("/admin")) {
//     if (token) {
//       try {
//         await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//       } catch (err) {
//         console.error("Invalid token:", err);
//         return NextResponse.redirect(new URL("/admin", req.url));
//       }
//     }
//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log(pathname);

  // const protectedPaths = ["/dashboard"];

  // 1. Handle protected paths
  if (pathname.startsWith("dashboard")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      console.error("Invalid token:", err);
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // 2. Handle /admin path specifically
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    // Crucial fix: Check if token is defined BEFORE trying to verify
    if (token) {
      // If token exists
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect if valid
      } catch (err) {
        console.error("Invalid token:", err);
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }
    // If token is undefined, allow access to the login page
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/admin"],
};
