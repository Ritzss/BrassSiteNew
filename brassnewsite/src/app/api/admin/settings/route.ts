import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Setting from "@/models/Setting";

/**
 * GET /api/admin/settings
 *
 * Returns the store's current settings.
 *
 * The application uses a single settings document,
 * so we create one with schema defaults if none exists.
 */
export async function GET() {
  try {
    await connectDB();

    let settings = await Setting.findOne().lean();

    if (!settings) {
      settings = await Setting.create({});
    }

    return NextResponse.json(
      {
        success: true,
        settings,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "GET /api/admin/settings ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch settings",
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
 * PATCH /api/admin/settings
 *
 * Updates the store settings.
 */
export async function PATCH(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const updateData: Record<string, unknown> = {};

    /**
     * Text settings.
     *
     * Trim values so accidental whitespace does not
     * get stored in the database.
     */
    const textFields = [
      "siteName",
      "email",
      "phone",
      "whatsapp",
      "address",
      "instagram",
      "facebook",
      "youtube",
    ];

    for (const field of textFields) {
      if (typeof body[field] === "string") {
        updateData[field] =
          body[field].trim();
      }
    }

    /**
     * Shipping settings must be valid numbers.
     */
    if (body.shippingFee !== undefined) {
      const shippingFee = Number(
        body.shippingFee,
      );

      if (
        !Number.isFinite(shippingFee) ||
        shippingFee < 0
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Shipping fee must be a valid positive number",
          },
          { status: 400 },
        );
      }

      updateData.shippingFee =
        shippingFee;
    }

    if (
      body.freeShippingAbove !==
      undefined
    ) {
      const freeShippingAbove = Number(
        body.freeShippingAbove,
      );

      if (
        !Number.isFinite(
          freeShippingAbove,
        ) ||
        freeShippingAbove < 0
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Free shipping threshold must be a valid positive number",
          },
          { status: 400 },
        );
      }

      updateData.freeShippingAbove =
        freeShippingAbove;
    }

    /**
     * Upsert guarantees there is always one
     * settings document.
     */
    const settings =
      await Setting.findOneAndUpdate(
        {},
        updateData,
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
          runValidators: true,
        },
      ).lean();

    return NextResponse.json(
      {
        success: true,
        settings,
        message: "Settings saved successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "PATCH /api/admin/settings ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save settings",
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 },
    );
  }
}