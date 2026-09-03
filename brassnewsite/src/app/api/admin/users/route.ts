import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";

export async function GET() {
  try {
    /*
     * Make sure MongoDB is connected before querying.
     */
    await connectDB();

    /*
     * Fetch users from newest to oldest.
     *
     * lean() returns plain JavaScript objects instead of
     * full Mongoose documents, which is ideal for an API
     * response and avoids unnecessary document overhead.
     */
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        users,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "GET /api/admin/users ERROR:",
      error,
    );

    /*
     * During development, return the actual error message
     * so the terminal tells us what is broken.
     */
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 },
    );
  }
}