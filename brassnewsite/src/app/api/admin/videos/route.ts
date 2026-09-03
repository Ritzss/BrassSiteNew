import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Video from "@/models/Video";

/**
 * GET /api/admin/videos
 *
 * Fetch all videos for the admin dashboard.
 * Newest videos are returned first.
 */
export async function GET() {
  try {
    await connectDB();

    const videos = await Video.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        videos,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "GET /api/admin/videos ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch videos",
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/admin/videos
 *
 * Create a new video.
 */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const title = body.title?.trim();
    const videoUrl = body.videoUrl?.trim();
    const thumbnail = body.thumbnail?.trim();

    if (!title || !videoUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and video URL are required",
        },
        { status: 400 },
      );
    }

    const video = await Video.create({
      title,
      videoUrl,
      thumbnail: thumbnail || undefined,
      active:
        typeof body.active === "boolean"
          ? body.active
          : true,
    });

    return NextResponse.json(
      {
        success: true,
        video,
        message: "Video created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "POST /api/admin/videos ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create video",
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 },
    );
  }
}