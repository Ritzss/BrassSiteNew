import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    await connectDB();

    const testimonials = await Testimonial.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch testimonials",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const testimonial = await Testimonial.create(body);

    return NextResponse.json({
      success: true,
      testimonial,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create testimonial",
      },
      { status: 500 }
    );
  }
}