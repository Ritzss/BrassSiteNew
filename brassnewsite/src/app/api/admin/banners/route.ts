import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Banner from "@/models/Banner";

export async function GET() {
  try {
    await connectDB();

    const banners = await Banner.find().sort({
      order: 1,
    });

    return NextResponse.json(banners);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch banners",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const banner = await Banner.create(body);

    return NextResponse.json({
      success: true,
      banner,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create banner",
      },
      {
        status: 500,
      }
    );
  }
}