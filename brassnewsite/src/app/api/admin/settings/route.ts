import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Setting from "@/models/Setting";

export async function GET() {
  try {
    await connectDB();

    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({});
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch settings",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(body);
    } else {
      settings = await Setting.findByIdAndUpdate(
        settings._id,
        body,
        {
          new: true,
        }
      );
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update settings",
      },
      {
        status: 500,
      }
    );
  }
}