"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";

import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  MessageCircle,
  AlertTriangle,
  ArrowUpRight,
  Settings,
  Video,
  Star,
  TrendingUp,
  Activity,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

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

/* =========================================================
   COMPONENT
========================================================= */

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

  /* =========================================================
     FETCH DASHBOARD DATA
  ========================================================= */

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

  /* =========================================================
     MONTHLY SALES CALCULATIONS

     Used only for visualizing the existing API data.
  ========================================================= */

  const maximumMonthlySales = useMemo(() => {
    if (!data.monthlySales.length) return 0;

    return Math.max(
      ...data.monthlySales.map((item) =>
        Number(item.sales) || 0,
      ),
    );
  }, [data.monthlySales]);

  /* =========================================================
     STAT CARDS
  ========================================================= */

  const cards = [
    {
      title: "Products",
      value: data.totalProducts.toLocaleString(),
      icon: Package,
      description: "Active products",
    },
    {
      title: "Orders",
      value: data.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      description: "Total orders",
    },
    {
      title: "Customers",
      value: data.totalUsers.toLocaleString(),
      icon: Users,
      description: "Registered users",
    },
    {
      title: "Revenue",
      value: `₹${data.totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      description: "Total revenue",
      featured: true,
    },
    {
      title: "Messages",
      value: data.unreadMessages.toLocaleString(),
      icon: MessageCircle,
      description: "Unread messages",
    },
    {
      title: "Low Stock",
      value: data.lowStockProducts.toLocaleString(),
      icon: AlertTriangle,
      description: "Products needing attention",
      warning: data.lowStockProducts > 0,
    },
  ];

  /* =========================================================
     LOADING STATE
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#F4F2DD]">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#889551]/30" />

              <div className="h-8 w-8 animate-spin rounded-full border-[2px] border-[#889551] border-t-transparent" />
            </div>

            <p className="text-[9px] uppercase tracking-[0.25em] text-[#0E4001]/50">
              Loading Dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F2DD] text-[#0E4001]">
      <div className="mx-auto max-w-[1600px] space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[30px]
            bg-[#0E4001]
            px-6
            py-8
            text-[#F4F2DD]
            shadow-[0_25px_70px_rgba(14,64,1,0.16)]
            sm:px-8
            sm:py-10
            lg:px-10
            lg:py-12
          "
        >
          {/* Decorative circles */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
              h-64
              w-64
              rounded-full
              border
              border-[#E4E198]/10
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -right-4
              -top-8
              h-36
              w-36
              rounded-full
              bg-[#889551]/20
              blur-3xl
            "
          />

          <div className="relative z-10">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-[8px] uppercase tracking-[0.3em] text-[#E4E198]">
                  Store Overview
                </p>

                <h1
                  className="
                    mt-2
                    font-serif
                    text-4xl
                    italic
                    leading-none
                    sm:text-5xl
                    lg:text-6xl
                  "
                >
                  Admin Dashboard
                </h1>

                <p className="mt-3 max-w-lg text-[10px] leading-5 text-[#F4F2DD]/55 sm:text-[11px]">
                  A clear view of your products, orders,
                  customers and store activity.
                </p>
              </div>

              {/* Status */}

              <div
                className="
                  flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#E4E198]/15
                  bg-white/[0.06]
                  px-4
                  py-2.5
                  backdrop-blur-md
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#E4E198]" />

                <span className="text-[8px] uppercase tracking-[0.18em] text-[#F4F2DD]/65">
                  Store Active
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            STAT CARDS
        ===================================================== */}

        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-[8px] uppercase tracking-[0.25em] text-[#889551]">
                At a Glance
              </p>

              <h2 className="mt-1 font-serif text-2xl italic text-[#0E4001]">
                Store Metrics
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-[22px]
                    border
                    p-4
                    shadow-[0_12px_35px_rgba(14,64,1,0.07)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    sm:p-5
                    ${
                      card.featured
                        ? "border-[#E4E198]/30 bg-[#0E4001] text-[#F4F2DD]"
                        : "border-[#0E4001]/10 bg-white/50 text-[#0E4001] backdrop-blur-xl"
                    }
                  `}
                >
                  {/* Decorative glow */}

                  {card.featured && (
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-8
                        -top-8
                        h-24
                        w-24
                        rounded-full
                        bg-[#889551]/20
                        blur-2xl
                      "
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`
                          text-[8px]
                          uppercase
                          tracking-[0.15em]
                          ${
                            card.featured
                              ? "text-[#F4F2DD]/55"
                              : "text-[#0E4001]/50"
                          }
                        `}
                      >
                        {card.title}
                      </span>

                      <Icon
                        size={16}
                        strokeWidth={1.5}
                        className={
                          card.warning
                            ? "text-[#9C6B22]"
                            : card.featured
                              ? "text-[#E4E198]"
                              : "text-[#889551]"
                        }
                      />
                    </div>

                    <p
                      className={`
                        mt-5
                        font-serif
                        text-2xl
                        italic
                        leading-none
                        sm:text-3xl
                        ${
                          card.featured
                            ? "text-[#F4F2DD]"
                            : "text-[#0E4001]"
                        }
                      `}
                    >
                      {card.value}
                    </p>

                    <p
                      className={`
                        mt-2
                        text-[8px]
                        ${
                          card.featured
                            ? "text-[#F4F2DD]/40"
                            : "text-[#0E4001]/40"
                        }
                      `}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            SALES + RECENT ORDERS
        ===================================================== */}

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          {/* ===================================================
              MONTHLY SALES
          =================================================== */}

          <section
            className="
              overflow-hidden
              rounded-[28px]
              border
              border-[#0E4001]/10
              bg-white/45
              p-5
              shadow-[0_15px_45px_rgba(14,64,1,0.07)]
              backdrop-blur-xl
              sm:p-7
            "
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[8px] uppercase tracking-[0.24em] text-[#889551]">
                  Performance
                </p>

                <h2 className="mt-1 font-serif text-2xl italic text-[#0E4001]">
                  Monthly Sales
                </h2>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E198]/50 text-[#0E4001]">
                <TrendingUp
                  size={17}
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {data.monthlySales.length > 0 ? (
              <div className="mt-8 flex h-[240px] items-end gap-2 overflow-x-auto pb-2 sm:gap-4">
                {data.monthlySales.map((item, index) => {
                  const sales = Number(item.sales) || 0;

                  const height =
                    maximumMonthlySales > 0
                      ? Math.max(
                          (sales /
                            maximumMonthlySales) *
                            100,
                          4,
                        )
                      : 4;

                  return (
                    <div
                      key={`${item.month}-${index}`}
                      className="
                        flex
                        h-full
                        min-w-[42px]
                        flex-1
                        flex-col
                        items-center
                        justify-end
                        gap-2
                      "
                    >
                      {/* Sales amount */}

                      <span className="text-[7px] text-[#0E4001]/45">
                        ₹
                        {sales.toLocaleString()}
                      </span>

                      {/* Bar */}

                      <div className="flex h-[170px] w-full items-end justify-center rounded-full bg-[#0E4001]/[0.035]">
                        <div
                          className="
                            w-full
                            max-w-[32px]
                            rounded-full
                            bg-[#889551]
                            transition-all
                            duration-700
                          "
                          style={{
                            height: `${height}%`,
                          }}
                        />
                      </div>

                      {/* Month */}

                      <span className="max-w-[42px] truncate text-[7px] uppercase tracking-[0.08em] text-[#0E4001]/45">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex h-[240px] items-center justify-center">
                <div className="text-center">
                  <Activity
                    size={24}
                    strokeWidth={1}
                    className="mx-auto text-[#889551]/50"
                  />

                  <p className="mt-3 text-[9px] uppercase tracking-[0.15em] text-[#0E4001]/35">
                    No sales data available
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* ===================================================
              RECENT ORDERS
          =================================================== */}

          <section
            className="
              overflow-hidden
              rounded-[28px]
              border
              border-[#0E4001]/10
              bg-white/45
              p-5
              shadow-[0_15px_45px_rgba(14,64,1,0.07)]
              backdrop-blur-xl
              sm:p-7
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[8px] uppercase tracking-[0.24em] text-[#889551]">
                  Activity
                </p>

                <h2 className="mt-1 font-serif text-2xl italic text-[#0E4001]">
                  Recent Orders
                </h2>
              </div>

              <ShoppingCart
                size={19}
                strokeWidth={1.5}
                className="text-[#889551]"
              />
            </div>

            <div className="mt-6 space-y-3">
              {data.recentOrders.length > 0 ? (
                data.recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      gap-3
                      rounded-2xl
                      border
                      border-[#0E4001]/[0.06]
                      bg-[#F4F2DD]/60
                      p-3
                      transition
                      hover:bg-[#E4E198]/35
                      sm:p-4
                    "
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      {/* Initial */}

                      <div
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#0E4001]
                          font-serif
                          text-sm
                          italic
                          text-[#E4E198]
                        "
                      >
                        {order.customerName
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[10px] font-medium text-[#0E4001] sm:text-[11px]">
                          {order.customerName}
                        </p>

                        <p className="mt-1 text-[8px] text-[#0E4001]/35">
                          #{order._id.slice(-6)}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="font-serif text-sm italic text-[#0E4001]">
                        ₹
                        {Number(
                          order.totalAmount || 0,
                        ).toLocaleString()}
                      </p>

                      <span
                        className="
                          mt-1
                          inline-block
                          rounded-full
                          bg-[#889551]/10
                          px-2
                          py-1
                          text-[7px]
                          uppercase
                          tracking-[0.1em]
                          text-[#889551]
                        "
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex min-h-[250px] items-center justify-center text-center">
                  <div>
                    <ShoppingCart
                      size={26}
                      strokeWidth={1}
                      className="mx-auto text-[#889551]/40"
                    />

                    <p className="mt-3 text-[9px] uppercase tracking-[0.15em] text-[#0E4001]/35">
                      No orders found
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <section>
          <div className="mb-5">
            <p className="text-[8px] uppercase tracking-[0.24em] text-[#889551]">
              Management
            </p>

            <h2 className="mt-1 font-serif text-2xl italic text-[#0E4001]">
              Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {/* Users */}

            <Link
              href="/admin/users"
              className="
                group
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-[#0E4001]/10
                bg-[#0E4001]
                p-5
                text-[#F4F2DD]
                shadow-[0_12px_35px_rgba(14,64,1,0.10)]
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              <Users
                size={21}
                strokeWidth={1.5}
                className="text-[#E4E198]"
              />

              <p className="mt-8 text-sm font-medium">
                Users
              </p>

              <p className="mt-1 text-[8px] text-[#F4F2DD]/40">
                Manage customers
              </p>

              <ArrowUpRight
                size={16}
                className="
                  absolute
                  right-5
                  top-5
                  text-[#F4F2DD]/40
                  transition
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>

            {/* Testimonials */}

            <Link
              href="/admin/testimonials"
              className="
                group
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-[#0E4001]/10
                bg-white/55
                p-5
                shadow-[0_12px_35px_rgba(14,64,1,0.07)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              <Star
                size={21}
                strokeWidth={1.5}
                className="text-[#889551]"
              />

              <p className="mt-8 text-sm font-medium text-[#0E4001]">
                Testimonials
              </p>

              <p className="mt-1 text-[8px] text-[#0E4001]/40">
                Manage customer reviews
              </p>

              <ArrowUpRight
                size={16}
                className="
                  absolute
                  right-5
                  top-5
                  text-[#0E4001]/30
                  transition
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>

            {/* Videos */}

            <Link
              href="/admin/videos"
              className="
                group
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-[#0E4001]/10
                bg-white/55
                p-5
                shadow-[0_12px_35px_rgba(14,64,1,0.07)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              <Video
                size={21}
                strokeWidth={1.5}
                className="text-[#889551]"
              />

              <p className="mt-8 text-sm font-medium text-[#0E4001]">
                Videos
              </p>

              <p className="mt-1 text-[8px] text-[#0E4001]/40">
                Manage store media
              </p>

              <ArrowUpRight
                size={16}
                className="
                  absolute
                  right-5
                  top-5
                  text-[#0E4001]/30
                  transition
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>

            {/* Settings */}

            <Link
              href="/admin/settings"
              className="
                group
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-[#0E4001]/10
                bg-[#E4E198]/45
                p-5
                shadow-[0_12px_35px_rgba(14,64,1,0.06)]
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              <Settings
                size={21}
                strokeWidth={1.5}
                className="text-[#0E4001]"
              />

              <p className="mt-8 text-sm font-medium text-[#0E4001]">
                Settings
              </p>

              <p className="mt-1 text-[8px] text-[#0E4001]/40">
                Store configuration
              </p>

              <ArrowUpRight
                size={16}
                className="
                  absolute
                  right-5
                  top-5
                  text-[#0E4001]/30
                  transition
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}