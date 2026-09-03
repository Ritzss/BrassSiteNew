import connectDB from "@/lib/connectDB";
import Testimonial from "@/models/Testimonial";
import Image from "next/image";

export default async function TestimonialsSection() {
  await connectDB();

  const testimonials = await Testimonial.find({
    active: true,
  })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="bg-[#F4F2DD] px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
      <div className="mx-auto max-w-375">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#0E4001]/55">
              04 / Customer stories
            </p>

            <h2 className="mt-4 font-serif text-4xl italic leading-tight text-[#0E4001] sm:text-5xl">
              Loved by
              <br />
              our customers.
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-[#0E4001]/60 sm:text-base">
            Real experiences from people who have made brass part of their
            everyday rituals.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={String(testimonial._id)}
              className="
                group relative overflow-hidden
                rounded-[28px]
                border border-[#0E4001]/10
                bg-[#E4E198]
                p-6
                transition-all duration-500
                hover:-translate-y-1
                hover:bg-[#0E4001]
                sm:p-8
              "
            >
              {/* Decorative circle */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute -right-14 -top-14
                  h-36 w-36 rounded-full
                  border border-[#0E4001]/10
                  transition-colors duration-500
                  group-hover:border-[#E4E198]/15
                "
              />

              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={
                        index < testimonial.rating
                          ? "text-[#0E4001] group-hover:text-[#E4E198]"
                          : "text-[#0E4001]/20 group-hover:text-[#E4E198]/20"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Review */}
                <blockquote className="mt-7 min-h-[135px] font-serif text-xl italic leading-8 text-[#0E4001] transition-colors duration-500 group-hover:text-[#F4F2DD]">
                  “{testimonial.review}”
                </blockquote>

                {/* Customer */}
                <div className="mt-8 flex items-center gap-3 border-t border-[#0E4001]/10 pt-5 group-hover:border-[#E4E198]/15">
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={46}
                      height={46}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0E4001] font-serif text-lg text-[#E4E198] group-hover:bg-[#E4E198] group-hover:text-[#0E4001]">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-semibold text-[#0E4001] group-hover:text-[#F4F2DD]">
                      {testimonial.name}
                    </p>

                    <p className="mt-0.5 text-xs text-[#0E4001]/50 group-hover:text-[#F4F2DD]/50">
                      {testimonial.designation || "Customer"}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
