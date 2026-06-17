"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  MessageCircle,
  AlertTriangle,
} from "lucide-react";

interface DashboardData {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  totalTestimonials: number;
  totalVideos: number;

  unreadMessages: number;
  lowStockProducts: number;

  monthlySales: {
    month: string;
    sales: number;
  }[];

  recentOrders: {
    _id: string;
    customerName: string;
    totalAmount: number;
    status: string;
  }[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalTestimonials: 0,
    totalVideos: 0,

    unreadMessages: 0,
    lowStockProducts: 0,

    monthlySales: [],

    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/api/admin/dashboard");

      setData({
        totalProducts: res.data.totalProducts || 0,
        totalOrders: res.data.totalOrders || 0,
        totalUsers: res.data.totalUsers || 0,
        totalRevenue: res.data.totalRevenue || 0,
        totalTestimonials: res.data.totalTestimonials || 0,
        totalVideos: res.data.totalVideos || 0,

        unreadMessages: res.data.unreadMessages || 0,
        lowStockProducts: res.data.lowStockProducts || 0,
        monthlySales: res.data.monthlySales || [],

        recentOrders: res.data.recentOrders || [],
      });
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Products",
      value: data.totalProducts,
      icon: Package,
    },
    {
      title: "Orders",
      value: data.totalOrders,
      icon: ShoppingCart,
    },
    {
      title: "Users",
      value: data.totalUsers,
      icon: Users,
    },
    {
      title: "Revenue",
      value: `₹${data.totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
    },
    {
      title: "Messages",
      value: data.unreadMessages,
      icon: MessageCircle,
    },
    {
      title: "Low Stock",
      value: data.lowStockProducts,
      icon: AlertTriangle,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="h-12 w-12 rounded-full border-4 border-[#889551] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#889551] dark:text-[#f4f2dd]">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-300">
          Manage your store, products, orders and customers.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-[#5f6b35] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-[#6f7c42]"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {card.title}
              </p>

              <card.icon size={22} className="text-[#889551]" />
            </div>

            <h2 className="text-3xl font-bold mt-4 text-[#889551] dark:text-[#f4f2dd]">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid xl:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-[#5f6b35] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-5 text-[#889551] dark:text-[#f4f2dd]">
            Recent Orders
          </h2>

          <div className="space-y-3">
            {data.recentOrders.length > 0 ? (
              data.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex justify-between items-center p-4 rounded-xl bg-gray-100 dark:bg-[#889551]"
                >
                  <div>
                    <p className="font-semibold">{order.customerName}</p>

                    <p className="text-sm opacity-70">#{order._id.slice(-6)}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">₹{order.totalAmount}</p>

                    <p className="text-sm">{order.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                No orders found
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-[#5f6b35] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-5 text-[#889551] dark:text-[#f4f2dd]">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* <Link
              href="/admin/products"
              className="bg-[#889551] text-white p-4 rounded-xl text-center font-semibold hover:opacity-90 transition"
            >
              Products
            </Link> */}

            {/* <Link
              href="/admin/orders"
              className="bg-[#889551] text-white p-4 rounded-xl text-center font-semibold hover:opacity-90 transition"
            >
              Orders
            </Link> */}

            <Link
              href="/admin/users"
              className="bg-[#889551] text-white p-4 rounded-xl text-center font-semibold hover:opacity-90 transition"
            >
              Users
            </Link>

            <Link
              href="/admin/testimonials"
              className="bg-[#889551] text-white p-4 rounded-xl text-center font-semibold hover:opacity-90 transition"
            >
              Testimonials
            </Link>

            <Link
              href="/admin/videos"
              className="bg-[#889551] text-white p-4 rounded-xl text-center font-semibold hover:opacity-90 transition"
            >
              Videos
            </Link>

            <Link
              href="/admin/settings"
              // style={{gridColumnStart: '1', gridColumnEnd: '3'}}
              className="bg-[#889551] text-white p-4 rounded-xl text-center font-semibold hover:opacity-90 transition"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
