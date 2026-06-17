import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Message from "@/models/Message";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const message = await Message.findById(id);

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Message not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch message",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const message = await Message.findByIdAndUpdate(
      id,
      {
        read: body.read,
      },
      {
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update message",
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

    await Message.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete message",
      },
      {
        status: 500,
      }
    );
  }
}