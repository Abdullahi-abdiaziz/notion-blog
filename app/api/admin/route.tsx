import { NextRequest, NextResponse } from "next/server";
import Admin from "@/app/models/admin";
import connect from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Validate input data
    if (!body.username || !body.password) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Connect to the database
    await connect();

    // Check if the admin user exists
    const isAdmin = await Admin.findOne({
      username: body.username,
    });

    if (!isAdmin || isAdmin.password !== body.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { username: body.username, role: "admin" }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: "30d" } // Token expiration time
    );

    // Create a response with the token as a cookie
    const response = NextResponse.json(
      { message: "Logged in successfully", token },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
      path: "/",
      httpOnly: false, // Prevent client-side access
      sameSite: "strict", // Protect against CSRF
    });

    return response;
  } catch (error) {
    console.error("Error during admin login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// Function to save an admin user to the database
// export const Post = async (req: NextRequest) => {
//   try {
//     const body = await req.json();

//     // Validate input data
//     if (!body.username || !body.password) {
//       return NextResponse.json({ error: "Invalid data" }, { status: 400 });
//     }

//     // Connect to the database
//     await connect();

//     // Save admin to the database
//     const admin = new Admin({
//       username: body.username,
//       password: body.password,
//     });
//     await admin.save();

//     return NextResponse.json(
//       { message: "Admin user saved successfully" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error saving admin user:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// };
