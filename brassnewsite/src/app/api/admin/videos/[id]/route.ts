import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Video from "@/models/Video";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const video = await Video.findById(id);

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: "Video not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch video",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const video = await Video.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      video,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update video",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    await Video.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete video",
      },
      { status: 500 }
    );
  }
}