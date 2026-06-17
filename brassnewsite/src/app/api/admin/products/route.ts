import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/lib/connectDB";
import Product from "@/models/Product";
import connectDB from "@/lib/connectDB";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
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

    const product = await Product.create(body);

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
      },
      {
        status: 500,
      }
    );
  }
}