/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import connectDB from "@/lib/connectDB";

import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";
import Testimonial from "@/models/Testimonial";
import Video from "@/models/Video";
import Message from "@/models/Message";

export async function GET() {
  try {
    await connectDB();

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalTestimonials =
      await Testimonial.countDocuments();

    const totalVideos =
      await Video.countDocuments();

    const unreadMessages =
      await Message.countDocuments({
        read: false,
      });

    const recentOrders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .lean();

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult[0]?.totalRevenue || 0;

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalTestimonials,
      totalVideos,
      totalRevenue,
      unreadMessages,
      lowStockProducts: 0,

      recentOrders: recentOrders.map(
        (order: any) => ({
          _id: order._id,

          customerName:
            order.customerName ||
            "Customer",

          totalAmount:
            order.totalAmount || 0,

          status:
            order.status || "Pending",
        })
      ),
    });
  } catch (error: any) {
    console.error(
      "Dashboard Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: error?.message,
        stack: error?.stack,
      },
      {
        status: 500,
      }
    );
  }
}