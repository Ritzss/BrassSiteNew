"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/Assets/slides/brass-5.png",
    title: "Benefits of Brass",
    eyebrow: "01 / Wellness",
    points: ["Boosts Immunity", "Promotes Digestion", "Balances pH Levels"],
  },
  {
    id: 2,
    image: "/Assets/slides/brass-6.png",
    title: "Traditional Elegance",
    eyebrow: "02 / Craft",
    points: ["Premium Finish", "Handcrafted Design", "Luxury Dining"],
  },
  {
    id: 3,
    image: "/Assets/slides/brass-7.png",
    title: "Pure Brass Craft",
    eyebrow: "03 / Material",
    points: ["Minimal Aesthetic", "Durable Material", "Timeless Style"],
  },
  {
    id: 4,
    image: "/Assets/slides/brass-8.png",
    title: "Classic Collection",
    eyebrow: "04 / Collection",
    points: ["Elegant Serving", "Traditional Touch", "Premium Quality"],
  },
];

export default function HomeSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full">
      <div className="relative h-[600px] w-full overflow-hidden rounded-[2rem] bg-[#0E4001] sm:h-[660px] lg:h-[710px]">
        <div
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <article
              key={slide.id}
              className="relative flex h-full min-w-full items-end overflow-hidden"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                sizes="(max-width: 768px) 100vw, 88vw"
                className="object-cover"
              />

              {/* Green-tinted editorial overlays keep the brand palette
                  present even when the source photography varies. */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0E4001]/70 via-[#0E4001]/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E4001]/65 via-transparent to-transparent" />

              <div className="relative z-10 flex w-full flex-col justify-between gap-8 px-7 pb-24 pt-12 text-[#F4F2DD] sm:px-12 lg:flex-row lg:items-end lg:px-16 lg:pb-28">
                <div className="max-w-xs">
                  <p className="mb-5 text-[9px] uppercase tracking-[0.25em] text-[#E4E198]/85">
                    {slide.eyebrow}
                  </p>

                  <p className="font-serif text-3xl italic leading-tight">
                    &quot;brandName&quot;
                  </p>

                  <Link
                    href="/productsdetail"
                    className="group mt-7 inline-flex items-center gap-4 rounded-full bg-[#889551] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F4F2DD] shadow-lg transition duration-300 hover:scale-[1.03] hover:bg-[#0E4001]"
                  >
                    Shop now
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </Link>
                </div>

                <div className="max-w-lg lg:max-w-[470px]">
                  <h2 className="font-serif text-4xl italic leading-[1] sm:text-6xl">
                    {slide.title}
                  </h2>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                    {slide.points.map((point, index) => (
                      <div
                        key={point}
                        className="flex items-center gap-3 border-t border-[#E4E198]/25 pt-3 text-sm text-[#F4F2DD]/85"
                      >
                        <span className="font-serif text-xs italic text-[#E4E198]/80">
                          0{index + 1}
                        </span>
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E4E198]/35 bg-[#0E4001]/25 text-3xl text-[#F4F2DD] backdrop-blur-sm transition hover:bg-[#0E4001]/60 sm:left-6"
        >
          ‹
        </button>

        <button
          type="button"
          aria-label="Next slide"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E4E198]/35 bg-[#0E4001]/25 text-3xl text-[#F4F2DD] backdrop-blur-sm transition hover:bg-[#0E4001]/60 sm:right-6"
        >
          ›
        </button>

        <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.id}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrent(index)}
              className="group flex h-5 items-center"
            >
              <span
                className={`block h-1 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-10 bg-[#E4E198]"
                    : "w-5 bg-[#F4F2DD]/45 group-hover:bg-[#E4E198]/70"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
