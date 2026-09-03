import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Video from "@/models/Video";
import mongoose from "mongoose";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * GET /api/admin/videos/:id
 *
 * Fetch a single video.
 */
export async function GET(
  req: Request,
  { params }: RouteContext,
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid video ID",
        },
        { status: 400 },
      );
    }

    const video = await Video.findById(id).lean();

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: "Video not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        video,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "GET /api/admin/videos/:id ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch video",
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
 * PATCH /api/admin/videos/:id
 *
 * Update video information or active status.
 */
export async function PATCH(
  req: Request,
  { params }: RouteContext,
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid video ID",
        },
        { status: 400 },
      );
    }

    const body = await req.json();

    const updateData: Record<string, unknown> = {};

    if (typeof body.title === "string") {
      const title = body.title.trim();

      if (!title) {
        return NextResponse.json(
          {
            success: false,
            message: "Title cannot be empty",
          },
          { status: 400 },
        );
      }

      updateData.title = title;
    }

    if (typeof body.videoUrl === "string") {
      const videoUrl = body.videoUrl.trim();

      if (!videoUrl) {
        return NextResponse.json(
          {
            success: false,
            message: "Video URL cannot be empty",
          },
          { status: 400 },
        );
      }

      updateData.videoUrl = videoUrl;
    }

    if (body.thumbnail !== undefined) {
      updateData.thumbnail =
        typeof body.thumbnail === "string"
          ? body.thumbnail.trim()
          : body.thumbnail;
    }

    if (typeof body.active === "boolean") {
      updateData.active = body.active;
    }

    const video = await Video.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: "Video not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        video,
        message: "Video updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "PATCH /api/admin/videos/:id ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update video",
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
 * DELETE /api/admin/videos/:id
 *
 * Permanently delete a video.
 */
export async function DELETE(
  req: Request,
  { params }: RouteContext,
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid video ID",
        },
        { status: 400 },
      );
    }

    const video = await Video.findByIdAndDelete(id);

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: "Video not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Video deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "DELETE /api/admin/videos/:id ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete video",
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 },
    );
  }
}