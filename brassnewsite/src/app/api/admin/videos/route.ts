import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Video from "@/models/Video";

export async function GET() {
  try {
    await connectDB();

    const videos = await Video.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch videos",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const video = await Video.create(body);

    return NextResponse.json({
      success: true,
      video,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create video",
      },
      { status: 500 }
    );
  }
}