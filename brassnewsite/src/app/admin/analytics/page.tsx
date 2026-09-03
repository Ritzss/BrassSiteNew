"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiBarChart2,
  FiCalendar,
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
  FiTrendingUp,
} from "react-icons/fi";

interface AnalyticsData {
  period: {
    days: number;
    startDate: string;
    endDate: string;
  };

  metrics: {
    totalRevenue: number;
    totalOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    averageOrderValue: number;
  };

  revenueTimeline: {
    date: string;
    revenue: number;
    orders: number;
  }[];

  topProducts: {
    productId: string;
    name: string;
    quantity: number;
    revenue: number;
  }[];

  statusBreakdown: {
    status: string;
    count: number;
  }[];

  paymentBreakdown: {
    method: string;
    count: number;
    revenue: number;
  }[];
}

export default function AnalyticsPage() {
  const [data, setData] =
    useState<AnalyticsData | null>(null);

  const [days, setDays] = useState(30);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchAnalytics = async (
    selectedDays: number,
  ) => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `/api/admin/analytics?days=${selectedDays}`,
      );

      setData(res.data);
    } catch (error) {
      console.error(
        "Failed to fetch analytics:",
        error,
      );

      setError(
        "Unable to load analytics data.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(days);
  }, [days]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const completionRate = useMemo(() => {
    if (!data?.metrics.totalOrders) return 0;

    return Math.round(
      (data.metrics.completedOrders /
        data.metrics.totalOrders) *
        100,
    );
  }, [data]);

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  if (error || !data) {
    return (
      <main className="min-h-full bg-[#F4F2DD] px-4 py-8 text-[#0E4001] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px] rounded-[28px] border border-[#889551]/25 bg-white/60 p-12 text-center">
          <FiActivity className="mx-auto text-4xl text-[#889551]" />

          <h1 className="mt-5 font-serif text-3xl font-semibold">
            Analytics unavailable
          </h1>

          <p className="mt-2 text-sm text-[#0E4001]/55">
            {error ||
              "There is no analytics data available."}
          </p>

          <button
            onClick={() => fetchAnalytics(days)}
            className="mt-6 rounded-full bg-[#0E4001] px-6 py-3 text-sm font-bold text-[#F4F2DD]"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-full bg-[#F4F2DD] px-4 py-6 text-[#0E4001] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-8">

        {/* Header */}
        <section className="rounded-[28px] bg-[#0E4001] p-6 text-[#F4F2DD] shadow-[0_25px_70px_rgba(14,64,1,0.16)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#E4E198]">
                Business Intelligence
              </p>

              <h1 className="font-serif text-4xl font-semibold sm:text-5xl">
                Analytics
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F4F2DD]/70 sm:text-base">
                Monitor real sales performance,
                orders, products, and payment activity.
              </p>
            </div>

            {/* Period selector */}
            <div className="flex items-center gap-2 rounded-full border border-[#E4E198]/20 bg-white/[0.06] p-1">
              {[7, 30, 90].map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    setDays(option)
                  }
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    days === option
                      ? "bg-[#E4E198] text-[#0E4001]"
                      : "text-[#F4F2DD]/70 hover:bg-white/10"
                  }`}
                >
                  {option}D
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={<FiDollarSign />}
            label="Total Revenue"
            value={formatCurrency(
              data.metrics.totalRevenue,
            )}
          />

          <MetricCard
            icon={<FiShoppingBag />}
            label="Total Orders"
            value={data.metrics.totalOrders}
          />

          <MetricCard
            icon={<FiTrendingUp />}
            label="Average Order"
            value={formatCurrency(
              data.metrics.averageOrderValue,
            )}
          />

          <MetricCard
            icon={<FiPackage />}
            label="Completion Rate"
            value={`${completionRate}%`}
          />
        </section>

        {/* Revenue chart */}
        <RevenueChart
          timeline={data.revenueTimeline}
          formatCurrency={formatCurrency}
        />

        {/* Products + statuses */}
        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">

          {/* Top products */}
          <div className="rounded-[26px] border border-[#889551]/20 bg-white/60 p-6 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#889551]">
                  Product Performance
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  Top Selling Products
                </h2>
              </div>

              <FiBarChart2 className="text-2xl text-[#889551]" />
            </div>

            <div className="mt-6 space-y-3">
              {data.topProducts.length === 0 ? (
                <EmptyRow text="No product sales recorded yet." />
              ) : (
                data.topProducts.map(
                  (product, index) => (
                    <div
                      key={product.productId}
                      className="flex items-center gap-4 rounded-2xl bg-[#F4F2DD]/80 p-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0E4001] text-xs font-bold text-[#E4E198]">
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-[#0E4001]/45">
                          {product.quantity} units sold
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-bold">
                        {formatCurrency(
                          product.revenue,
                        )}
                      </p>
                    </div>
                  ),
                )
              )}
            </div>
          </div>

          {/* Order status */}
          <div className="rounded-[26px] border border-[#889551]/20 bg-white/60 p-6 shadow-sm backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#889551]">
              Order Pipeline
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Order Status
            </h2>

            <div className="mt-6 space-y-4">
              {data.statusBreakdown.map(
                (item) => {
                  const percentage =
                    data.metrics.totalOrders > 0
                      ? Math.round(
                          (item.count /
                            data.metrics
                              .totalOrders) *
                            100,
                        )
                      : 0;

                  return (
                    <div key={item.status}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>
                          {item.status}
                        </span>

                        <span className="font-bold">
                          {item.count}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-[#889551]/15">
                        <div
                          className="h-full rounded-full bg-[#0E4001] transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </section>

        {/* Payment + summary */}
        <section className="grid gap-6 lg:grid-cols-2">

          {/* Payment methods */}
          <div className="rounded-[26px] border border-[#889551]/20 bg-[#0E4001] p-6 text-[#F4F2DD] shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E4E198]">
              Payment Activity
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Payment Methods
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {data.paymentBreakdown.map(
                (payment) => (
                  <div
                    key={payment.method}
                    className="rounded-2xl border border-[#E4E198]/15 bg-white/[0.05] p-4"
                  >
                    <p className="text-sm font-semibold">
                      {payment.method}
                    </p>

                    <p className="mt-3 text-2xl font-semibold">
                      {formatCurrency(
                        payment.revenue,
                      )}
                    </p>

                    <p className="mt-1 text-xs text-[#F4F2DD]/45">
                      {payment.count} orders
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Period summary */}
          <div className="rounded-[26px] border border-[#889551]/20 bg-white/60 p-6 shadow-sm backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#889551]">
              Period Summary
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              {days}-Day Overview
            </h2>

            <div className="mt-6 space-y-4">
              <SummaryRow
                label="Delivered Orders"
                value={
                  data.metrics.completedOrders
                }
              />

              <SummaryRow
                label="Cancelled Orders"
                value={
                  data.metrics.cancelledOrders
                }
              />

              <SummaryRow
                label="Total Revenue"
                value={formatCurrency(
                  data.metrics.totalRevenue,
                )}
              />

              <SummaryRow
                label="Average Order Value"
                value={formatCurrency(
                  data.metrics.averageOrderValue,
                )}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Metric Card                                                                 */
/* -------------------------------------------------------------------------- */

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-[22px] border border-[#889551]/20 bg-white/60 p-5 shadow-sm backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0E4001] text-[#E4E198]">
          {icon}
        </div>

        <FiActivity className="text-[#889551]/30" />
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-[#889551]">
        {label}
      </p>

      <p className="mt-2 font-serif text-3xl font-semibold">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Revenue Chart                                                               */
/* -------------------------------------------------------------------------- */

function RevenueChart({
  timeline,
  formatCurrency,
}: {
  timeline: AnalyticsData["revenueTimeline"];
  formatCurrency: (value: number) => string;
}) {
  const maxRevenue = Math.max(
    ...timeline.map((item) => item.revenue),
    1,
  );

  const chartData =
    timeline.length > 31
      ? timeline.filter(
          (_, index) =>
            index % Math.ceil(
              timeline.length / 30,
            ) === 0,
        )
      : timeline;

  return (
    <section className="rounded-[26px] border border-[#889551]/20 bg-white/60 p-6 shadow-sm backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#889551]">
            Revenue Overview
          </p>

          <h2 className="mt-2 font-serif text-2xl font-semibold">
            Sales over time
          </h2>
        </div>

        <p className="text-sm text-[#0E4001]/50">
          {formatCurrency(
            timeline.reduce(
              (sum, item) =>
                sum + item.revenue,
              0,
            ),
          )}{" "}
          total
        </p>
      </div>

      <div className="mt-8 overflow-x-auto">
        <div className="flex h-[260px] min-w-[700px] items-end gap-1 border-b border-[#889551]/20 pb-2">
          {chartData.map((item) => {
            const height =
              item.revenue === 0
                ? 2
                : Math.max(
                    5,
                    (item.revenue /
                      maxRevenue) *
                      100,
                  );

            return (
              <div
                key={item.date}
                className="group flex h-full min-w-[14px] flex-1 flex-col justify-end"
              >
                <div className="relative flex h-full items-end">
                  <div
                    className="w-full rounded-t-md bg-[#0E4001]/80 transition-all duration-300 group-hover:bg-[#0E4001]"
                    style={{
                      height: `${height}%`,
                    }}
                    title={`${item.date}: ${formatCurrency(item.revenue)}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex min-w-[700px] justify-between text-[10px] text-[#0E4001]/40">
          <span>
            {timeline[0]?.date}
          </span>

          <span>
            {timeline[
              Math.floor(
                timeline.length / 2,
              )
            ]?.date}
          </span>

          <span>
            {timeline[
              timeline.length - 1
            ]?.date}
          </span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Summary                                                                     */
/* -------------------------------------------------------------------------- */

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#889551]/15 pb-4 last:border-0 last:pb-0">
      <span className="text-sm text-[#0E4001]/60">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>
    </div>
  );
}

function EmptyRow({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-[#F4F2DD] p-6 text-center text-sm text-[#0E4001]/50">
      {text}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Loading State                                                                */
/* -------------------------------------------------------------------------- */

function AnalyticsSkeleton() {
  return (
    <main className="min-h-full bg-[#F4F2DD] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-8">
        <div className="h-[190px] animate-pulse rounded-[28px] bg-[#0E4001]/10" />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-[150px] animate-pulse rounded-[22px] bg-[#889551]/15"
              />
            ),
          )}
        </div>

        <div className="h-[380px] animate-pulse rounded-[26px] bg-[#889551]/15" />

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="h-[400px] animate-pulse rounded-[26px] bg-[#889551]/15" />

          <div className="h-[400px] animate-pulse rounded-[26px] bg-[#889551]/15" />
        </div>
      </div>
    </main>
  );
}