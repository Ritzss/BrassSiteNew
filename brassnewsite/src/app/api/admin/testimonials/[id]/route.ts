import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Testimonial from "@/models/Testimonial";
import mongoose from "mongoose";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * GET /api/admin/testimonials/:id
 *
 * Fetches one testimonial.
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
          message: "Invalid testimonial ID",
        },
        { status: 400 },
      );
    }

    const testimonial =
      await Testimonial.findById(id).lean();

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        testimonial,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "GET /api/admin/testimonials/:id ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch testimonial",
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
 * PATCH /api/admin/testimonials/:id
 *
 * Updates testimonial information.
 *
 * This also handles active/inactive toggling.
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
          message: "Invalid testimonial ID",
        },
        { status: 400 },
      );
    }

    const body = await req.json();

    const updateData: Record<string, unknown> = {};

    if (typeof body.name === "string") {
      const name = body.name.trim();

      if (!name) {
        return NextResponse.json(
          {
            success: false,
            message: "Name cannot be empty",
          },
          { status: 400 },
        );
      }

      updateData.name = name;
    }

    if (typeof body.designation === "string") {
      updateData.designation =
        body.designation.trim();
    }

    if (typeof body.review === "string") {
      const review = body.review.trim();

      if (!review) {
        return NextResponse.json(
          {
            success: false,
            message: "Review cannot be empty",
          },
          { status: 400 },
        );
      }

      updateData.review = review;
    }

    if (body.image !== undefined) {
      updateData.image =
        typeof body.image === "string"
          ? body.image.trim()
          : body.image;
    }

    if (body.rating !== undefined) {
      const rating = Number(body.rating);

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

      updateData.rating = rating;
    }

    if (typeof body.active === "boolean") {
      updateData.active = body.active;
    }

    const testimonial =
      await Testimonial.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        },
      );

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        testimonial,
        message: "Testimonial updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "PATCH /api/admin/testimonials/:id ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update testimonial",
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
 * DELETE /api/admin/testimonials/:id
 *
 * Permanently removes a testimonial.
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
          message: "Invalid testimonial ID",
        },
        { status: 400 },
      );
    }

    const testimonial =
      await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "DELETE /api/admin/testimonials/:id ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete testimonial",
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 },
    );
  }
}