import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Banner from "@/models/Banner";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return NextResponse.json(
        {
          success: false,
          message: "Banner not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(banner);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch banner",
      },
      {
        status: 500,
      }
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

    const banner = await Banner.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
      banner,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update banner",
      },
      {
        status: 500,
      }
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

    await Banner.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete banner",
      },
      {
        status: 500,
      }
    );
  }
}