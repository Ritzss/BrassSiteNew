import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
      },
      {
        status: 500,
      }
    );
  }
}