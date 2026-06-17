import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const totalOrders = await Order.countDocuments();

    const deliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },

          sales: {
            $sum: "$totalAmount",
          },

          orders: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const topProducts = await Order.aggregate([
      { $unwind: "$products" },

      {
        $group: {
          _id: "$products.name",

          sold: {
            $sum: "$products.quantity",
          },

          revenue: {
            $sum: {
              $multiply: ["$products.quantity", "$products.price"],
            },
          },
        },
      },

      {
        $sort: {
          sold: -1,
        },
      },

      {
        $limit: 10,
      },
    ]);

    return NextResponse.json({
      totalOrders,
      deliveredOrders,
      totalRevenue: revenueResult[0]?.revenue || 0,
      monthlySales,
      topProducts,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Analytics failed",
      },
      {
        status: 500,
      },
    );
  }
}
