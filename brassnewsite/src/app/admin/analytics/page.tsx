"use client";

export default function AnalyticsPage() {

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-[#889551] dark:text-[#f4f2dd]">
          Analytics
        </h1>

        <p className="mt-2 text-[#889551]/80 dark:text-[#f4f2dd]/80">
          Monitor performance and sales insights.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-6 border border-[#889551]">

          <h2 className="text-lg font-medium">
            Total Revenue
          </h2>

          <p className="text-4xl font-bold mt-4">
            $2.4L
          </p>

        </div>

        <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-6 border border-[#889551]">

          <h2 className="text-lg font-medium">
            Conversion Rate
          </h2>

          <p className="text-4xl font-bold mt-4">
            4.2%
          </p>

        </div>

        <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-6 border border-[#889551]">

          <h2 className="text-lg font-medium">
            Total Visitors
          </h2>

          <p className="text-4xl font-bold mt-4">
            18K
          </p>

        </div>

        <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-6 border border-[#889551]">

          <h2 className="text-lg font-medium">
            Returning Customers
          </h2>

          <p className="text-4xl font-bold mt-4">
            36%
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-6 border border-[#889551]">

          <h2 className="text-2xl font-bold mb-6">
            Top Selling Products
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between bg-[#f4f2dd] dark:bg-[#889551] p-4 rounded-xl">
              <span>Brass Bowl</span>
              <span>124 Sold</span>
            </div>

            <div className="flex justify-between bg-[#f4f2dd] dark:bg-[#889551] p-4 rounded-xl">
              <span>Brass Lamp</span>
              <span>82 Sold</span>
            </div>

            <div className="flex justify-between bg-[#f4f2dd] dark:bg-[#889551] p-4 rounded-xl">
              <span>Brass Plate</span>
              <span>68 Sold</span>
            </div>

          </div>

        </div>

        <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-6 border border-[#889551]">

          <h2 className="text-2xl font-bold mb-6">
            Traffic Sources
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between bg-[#f4f2dd] dark:bg-[#889551] p-4 rounded-xl">
              <span>Instagram</span>
              <span>45%</span>
            </div>

            <div className="flex justify-between bg-[#f4f2dd] dark:bg-[#889551] p-4 rounded-xl">
              <span>Google Search</span>
              <span>38%</span>
            </div>

            <div className="flex justify-between bg-[#f4f2dd] dark:bg-[#889551] p-4 rounded-xl">
              <span>Direct</span>
              <span>17%</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}