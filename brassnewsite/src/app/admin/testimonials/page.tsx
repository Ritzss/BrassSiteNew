export default function TestimonialsPage() {

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <h1 className="text-4xl font-bold text-[#889551] dark:text-[#f4f2dd]">
          Testimonials
        </h1>

        <button className="bg-[#889551] text-[#f4f2dd] px-5 py-3 rounded-xl font-semibold">
          Add Testimonial
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-6 border border-[#889551]">

          <h2 className="text-xl font-bold mb-3">
            Amazing Products
          </h2>

          <p>
            Beautiful brass quality and premium finishing.
          </p>

        </div>

      </div>

    </div>
  );
}