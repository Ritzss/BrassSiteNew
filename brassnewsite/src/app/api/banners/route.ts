import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Banner from "@/models/Banner";

export async function GET() {
  try {
    await connectDB();

    const banners = await Banner.find({
      active: true,
    }).sort({
      order: 1,
    });

    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}