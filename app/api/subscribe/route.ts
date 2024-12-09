import Subscriber from "@/app/models/subscriber";
import connect from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const users = await Subscriber.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Error in Fetching users: " + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    if (!body.email) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    // Ensure the database connection is established
    await connect();

    // Check if user exists
    const userExists = await Subscriber.exists({ email: body.email });

    if (userExists) {
      return NextResponse.json(
        { message: "User already subscribed", email: body.email },
        { status: 401 }
      );
    }

    // Create and save a new subscriber
    const newUser = new Subscriber(body);
    await newUser.save();

    return NextResponse.json(
      { message: "User subscribed successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in POST /subscribe:", error.message);
    return NextResponse.json(
      { message: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
};
