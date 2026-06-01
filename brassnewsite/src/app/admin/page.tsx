import StatCard from "@/components/admin/StatCard";

export default function AdminDashboard() {

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-[#889551] dark:text-[#f4f2dd]">
          Dashboard
        </h1>

        <p className="mt-2 text-[#889551] dark:text-[#f4f2dd]/80">
          Manage products, users, videos and store content.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Products"
          value="124"
        />

        <StatCard
          title="Orders"
          value="89"
        />

        <StatCard
          title="Users"
          value="452"
        />

        <StatCard
          title="Revenue"
          value="₹1,24,000"
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-6 border border-[#889551]">

          <h2 className="text-2xl font-bold text-[#889551] dark:text-[#f4f2dd] mb-4">
            Recent Orders
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between bg-[#f4f2dd] dark:bg-[#889551] p-4 rounded-xl">
              <span>Order #1024</span>
              <span>₹2400</span>
            </div>

            <div className="flex justify-between bg-[#f4f2dd] dark:bg-[#889551] p-4 rounded-xl">
              <span>Order #1025</span>
              <span>₹5200</span>
            </div>

          </div>

        </div>

        <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-6 border border-[#889551]">

          <h2 className="text-2xl font-bold text-[#889551] dark:text-[#f4f2dd] mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <button className="bg-[#889551] text-[#f4f2dd] p-4 rounded-xl font-semibold">
              Add Product
            </button>

            <button className="bg-[#889551] text-[#f4f2dd] p-4 rounded-xl font-semibold">
              Add Video
            </button>

            <button className="bg-[#889551] text-[#f4f2dd] p-4 rounded-xl font-semibold">
              Add Testimonial
            </button>

            <button className="bg-[#889551] text-[#f4f2dd] p-4 rounded-xl font-semibold">
              View Users
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}