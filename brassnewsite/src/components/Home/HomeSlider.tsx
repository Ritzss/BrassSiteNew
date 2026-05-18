"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/Assets/slides/brass-5.png",
    title: "Benefits of Brass",
    points: ["Boosts Immunity", "Promotes Digestion", "Balances pH Levels"],
  },

  {
    id: 2,
    image: "/Assets/slides/brass-6.png",
    title: "Traditional Elegance",
    points: ["Premium Finish", "Handcrafted Design", "Luxury Dining"],
  },

  {
    id: 3,
    image: "/Assets/slides/brass-7.png",
    title: "Pure Brass Craft",
    points: ["Minimal Aesthetic", "Durable Material", "Timeless Style"],
  },

  {
    id: 4,
    image: "/Assets/slides/brass-8.png",
    title: "Classic Collection",
    points: ["Elegant Serving", "Traditional Touch", "Premium Quality"],
  },
];

export default function HomeSlider() {
  const [current, setCurrent] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="w-full">
      <div className="relative w-full h-200 overflow-hidden rounded-[30px]">
        {/* SLIDER TRACK */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full h-full relative flex items-center"
            >
              {/* BACKGROUND IMAGE */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-r from-black/50 to-black/10" />

              {/* CONTENT WRAPPER */}
              <div className="relative z-10 w-full h-full flex items-center justify-between px-8 md:px-20">
                {/* LEFT BUTTON */}
                <div className="flex items-end h-full pb-20">
                  <button className="bg-[#97ab4d] hover:bg-[#879a44] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl transition duration-300 hover:scale-105">
                    SHOP NOW
                  </button>
                </div>

                {/* RIGHT CONTENT */}
                <div className="max-w-175 text-white">
                  <h1 className="text-4xl md:text-6xl leading-tight font-serif mb-8">
                    {slide.title}
                  </h1>

                  <div className="space-y-5">
                    {slide.points?.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 text-lg md:text-[26px]"
                      >
                        <span className="text-2xl md:text-3xl">🍃</span>

                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LEFT ARROW */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 text-5xl md:text-6xl text-white hover:scale-110 transition"
        >
          ‹
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 text-5xl md:text-6xl text-white hover:scale-110 transition"
        >
          ›
        </button>

        {/* DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 rounded-full ${
                current === index ? "w-8 h-3 bg-white" : "w-3 h-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
