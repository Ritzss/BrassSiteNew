import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Order from "@/models/Order";

/**
 * GET /api/admin/analytics
 *
 * Returns real sales analytics calculated from MongoDB orders.
 *
 * Supported periods:
 * - 7 days
 * - 30 days
 * - 90 days
 */
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const requestedDays = Number(
      searchParams.get("days") || 30,
    );

    const days = [7, 30, 90].includes(requestedDays)
      ? requestedDays
      : 30;

    const now = new Date();

    const startDate = new Date(now);
    startDate.setDate(
      startDate.getDate() - (days - 1),
    );
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(now);
    endDate.setHours(23, 59, 59, 999);

    /**
     * Cancelled orders should not contribute to
     * sales revenue.
     */
    const salesFilter = {
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
      status: {
        $ne: "Cancelled",
      },
    };

    const allOrders = await Order.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).lean();

    const salesOrders = allOrders.filter(
      (order) => order.status !== "Cancelled",
    );

    // -----------------------------------------------------------------------
    // Basic metrics
    // -----------------------------------------------------------------------

    const totalRevenue = salesOrders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0,
    );

    const totalOrders = allOrders.length;

    const completedOrders = allOrders.filter(
      (order) => order.status === "Delivered",
    ).length;

    const cancelledOrders = allOrders.filter(
      (order) => order.status === "Cancelled",
    ).length;

    const averageOrderValue =
      salesOrders.length > 0
        ? totalRevenue / salesOrders.length
        : 0;

    // -----------------------------------------------------------------------
    // Daily revenue
    // -----------------------------------------------------------------------

    const revenueByDay = new Map<
      string,
      {
        date: string;
        revenue: number;
        orders: number;
      }
    >();

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const key = date.toISOString().split("T")[0];

      revenueByDay.set(key, {
        date: key,
        revenue: 0,
        orders: 0,
      });
    }

    for (const order of salesOrders) {
      const date = new Date(order.createdAt)
        .toISOString()
        .split("T")[0];

      const existing = revenueByDay.get(date);

      if (existing) {
        existing.revenue +=
          order.totalAmount || 0;

        existing.orders += 1;
      }
    }

    const revenueTimeline = Array.from(
      revenueByDay.values(),
    );

    // -----------------------------------------------------------------------
    // Top-selling products
    // -----------------------------------------------------------------------

    const productMap = new Map<
      string,
      {
        productId: string;
        name: string;
        quantity: number;
        revenue: number;
      }
    >();

    for (const order of salesOrders) {
      for (const item of order.items || []) {
        const productId = String(
          item.productId,
        );

        const existing =
          productMap.get(productId);

        const quantity = item.qty || 0;
        const revenue =
          (item.price || 0) * quantity;

        if (existing) {
          existing.quantity += quantity;
          existing.revenue += revenue;
        } else {
          productMap.set(productId, {
            productId,
            name:
              item.title ||
              item.name ||
              "Unnamed Product",
            quantity,
            revenue,
          });
        }
      }
    }

    const topProducts = Array.from(
      productMap.values(),
    )
      .sort(
        (a, b) => b.quantity - a.quantity,
      )
      .slice(0, 10);

    // -----------------------------------------------------------------------
    // Order status breakdown
    // -----------------------------------------------------------------------

    const statusBreakdown = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ].map((status) => ({
      status,
      count: allOrders.filter(
        (order) => order.status === status,
      ).length,
    }));

    // -----------------------------------------------------------------------
    // Payment breakdown
    // -----------------------------------------------------------------------

    const paymentBreakdown = [
      "COD",
      "ONLINE",
    ].map((method) => ({
      method,
      count: allOrders.filter(
        (order) =>
          order.paymentMethod === method,
      ).length,
      revenue: salesOrders
        .filter(
          (order) =>
            order.paymentMethod === method,
        )
        .reduce(
          (sum, order) =>
            sum + (order.totalAmount || 0),
          0,
        ),
    }));

    return NextResponse.json(
      {
        success: true,

        period: {
          days,
          startDate,
          endDate,
        },

        metrics: {
          totalRevenue,
          totalOrders,
          completedOrders,
          cancelledOrders,
          averageOrderValue,
        },

        revenueTimeline,

        topProducts,

        statusBreakdown,

        paymentBreakdown,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "GET /api/admin/analytics ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch analytics",
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 },
    );
  }
}