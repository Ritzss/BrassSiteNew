/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const product = await Product.create({
      Productid: "TEST001",

      name: "Brass Bowl",

      description: "Test product",

      category: "Kitchen",

      subcategory: "Bowls",

      variants: [
        {
          images: [],

          capacity: 500,

          weight: 300,

          price: 499,

          mrp: 699,

          color: "Golden",
        },
      ],

      details: {
        features: ["Handcrafted"],

        material: "Brass",

        finish: "Polished",

        design: "Traditional",

        sustainability: "Eco Friendly",

        care: ["Clean with soft cloth"],
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}