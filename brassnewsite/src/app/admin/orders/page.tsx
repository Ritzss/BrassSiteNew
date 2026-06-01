"use client";

import { useState } from "react";

const ordersData = [
  {
    id: "#1024",
    customer: "ritanshu@gmail.com",
    amount: "$24.00",
    status: "Pending",
  },
  {
    id: "#1025",
    customer: "admin@gmail.com",
    amount: "$52.00",
    status: "Shipped",
  },
  {
    id: "#1026",
    customer: "customer@gmail.com",
    amount: "$18.00",
    status: "Delivered",
  },
];

export default function OrdersPage() {

  const [orders, setOrders] =
    useState(ordersData);

  const updateStatus = (
    index: number,
    value: string
  ) => {

    const updatedOrders = [...orders];

    updatedOrders[index].status = value;

    setOrders(updatedOrders);
  };

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-[#889551] dark:text-[#f4f2dd]">
            Orders
          </h1>

          <p className="mt-2 text-[#889551]/80 dark:text-[#f4f2dd]/80">
            Manage customer orders and shipping.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-[#e4e198] dark:bg-[#5f6b35] p-6 rounded-2xl border border-[#889551]">
          <h2 className="text-lg font-medium">
            Total Orders
          </h2>

          <p className="text-4xl font-bold mt-4">
            128
          </p>
        </div>

        <div className="bg-[#e4e198] dark:bg-[#5f6b35] p-6 rounded-2xl border border-[#889551]">
          <h2 className="text-lg font-medium">
            Pending Orders
          </h2>

          <p className="text-4xl font-bold mt-4">
            12
          </p>
        </div>

        <div className="bg-[#e4e198] dark:bg-[#5f6b35] p-6 rounded-2xl border border-[#889551]">
          <h2 className="text-lg font-medium">
            Revenue
          </h2>

          <p className="text-4xl font-bold mt-4">
            $1,24,0.00
          </p>
        </div>

      </div>

      <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-6 border border-[#889551] overflow-x-auto">

        <table className="w-full min-w-175">

          <thead>

            <tr className="border-b border-[#889551] text-left">

              <th className="pb-4">
                Order ID
              </th>

              <th className="pb-4">
                Customer
              </th>

              <th className="pb-4">
                Amount
              </th>

              <th className="pb-4">
                Status
              </th>

              <th className="pb-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map(
              (order, index) => (

                <tr
                  key={order.id}
                  className="border-b border-[#889551]/20"
                >

                  <td className="py-5">
                    {order.id}
                  </td>

                  <td>
                    {order.customer}
                  </td>

                  <td>
                    {order.amount}
                  </td>

                  <td>
                    <span className="px-4 py-2 rounded-full bg-[#889551] text-[#f4f2dd] text-sm">
                      {order.status}
                    </span>
                  </td>

                  <td>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          index,
                          e.target.value
                        )
                      }
                      className="
                        bg-[#889551]
                        text-[#f4f2dd]
                        px-4
                        py-2
                        rounded-xl
                        outline-none
                      "
                    >

                      <option>
                        Pending
                      </option>

                      <option>
                        Processing
                      </option>

                      <option>
                        Shipped
                      </option>

                      <option>
                        Delivered
                      </option>

                      <option>
                        Cancelled
                      </option>

                    </select>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}