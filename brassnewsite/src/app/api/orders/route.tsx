import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Order from "@/models/Order";
// import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      userId,
      items,
      subtotal,
      shippingCharge,
      discount,
      totalAmount,
      paymentMethod,
      deliveryAddress,
      notes,
    } = body;

    if (!items?.length) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 }
      );
    }

    const orderNumber =
      "BRASS-" + Date.now().toString().slice(-8);

    const order = await Order.create({
      orderNumber,
      userId,
      items,
      subtotal,
      shippingCharge,
      discount,
      totalAmount,
      paymentMethod,
      deliveryAddress,
      notes,
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
      },
      { status: 500 }
    );
  }
}