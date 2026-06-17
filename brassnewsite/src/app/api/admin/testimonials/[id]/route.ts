import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Testimonial from "@/models/Testimonial";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch testimonial",
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

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      testimonial,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update testimonial",
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

    await Testimonial.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete testimonial",
      },
      { status: 500 }
    );
  }
}