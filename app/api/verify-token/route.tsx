import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface DecodedToken {
  id: string; // Adjust based on your token payload structure
  username: string;
  role: string; // Adjust based on your token payload structure
  iat?: number;
  exp?: number;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json(
      { message: "Your Token is valid", user: decoded },
      { status: 200 }
    );
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
