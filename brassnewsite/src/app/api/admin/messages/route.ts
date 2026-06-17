import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Message from "@/models/Message";

export async function GET() {
  try {
    await connectDB();

    const messages = await Message.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch messages",
      },
      {
        status: 500,
      }
    );
  }
}