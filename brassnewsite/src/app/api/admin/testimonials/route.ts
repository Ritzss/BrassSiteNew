import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Testimonial from "@/models/Testimonial";

/**
 * GET /api/admin/testimonials
 *
 * Fetches all testimonials for the admin dashboard.
 * Newest testimonials are returned first.
 */
export async function GET() {
  try {
    await connectDB();

    const testimonials = await Testimonial.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        testimonials,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "GET /api/admin/testimonials ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch testimonials",
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
 * POST /api/admin/testimonials
 *
 * Creates a new testimonial.
 */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const name = body.name?.trim();
    const designation = body.designation?.trim();
    const review = body.review?.trim();
    const image = body.image?.trim();

    // Basic validation before touching the database.
    if (!name || !review) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and review are required",
        },
        { status: 400 },
      );
    }

    const rating = Number(body.rating ?? 5);

    if (
      !Number.isFinite(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating must be between 1 and 5",
        },
        { status: 400 },
      );
    }

    const testimonial = await Testimonial.create({
      name,
      designation: designation || undefined,
      review,
      rating,
      image: image || undefined,
      active:
        typeof body.active === "boolean"
          ? body.active
          : true,
    });

    return NextResponse.json(
      {
        success: true,
        testimonial,
        message: "Testimonial created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "POST /api/admin/testimonials ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create testimonial",
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 },
    );
  }
}