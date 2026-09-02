"use client";

import { Product } from "@/Types/Product";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { BsArrowReturnRight } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";

import { toast } from "sonner";

import ProductCard from "./ProductCard";
import ProductButton from "../../Global/ProductButton";

const DetailPage = ({
  product,
  similarProduct,
}: {
  product?: Product;
  similarProduct?: Product[];
}) => {
  /* =====================================================
     STATE
  ===================================================== */

  const [variant, setVariant] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const [showCare, setShowCare] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const similarProductsRef = useRef<HTMLDivElement>(null);

  /* =====================================================
     ACTIVE VARIANT
  ===================================================== */

  const variantActive = product?.variants?.[variant];

  const images = variantActive?.images || [];

  /* =====================================================
     IMAGE NAVIGATION
  ===================================================== */

  const nextImage = () => {
    if (images.length <= 1) return;

    setCurrentImage((previous) =>
      previous === images.length - 1 ? 0 : previous + 1,
    );
  };

  const prevImage = () => {
    if (images.length <= 1) return;

    setCurrentImage((previous) =>
      previous === 0 ? images.length - 1 : previous - 1,
    );
  };

  /* =====================================================
     VARIANT CHANGE
  ===================================================== */

  const handleVariantChange = (index: number) => {
    setVariant(index);

    // Reset image when changing variant because
    // each variant can have a different image set.
    setCurrentImage(0);
  };

  /* =====================================================
    BUY NOW
  ===================================================== */

  const handleBuyNow = () => {
    toast.success("Buying Now....");
  };

  const scrollSimilarProducts = (direction: "left" | "right") => {
    const container = similarProductsRef.current;

    if (!container) return;

    container.scrollBy({
      left: direction === "right" ? 1360 : -1360,
      behavior: "smooth",
    });
  };

  return (
    <main
      className="
    min-h-screen
    text-[#0E4001]
    bg-[linear-gradient(180deg,#0E4001_0%,#294F1E_10%,#627746_22%,#A5A36C_36%,#D6D39A_52%,#ECE8C5_70%,#F4F2DD_88%,#F4F2DD_100%)]
  "
    >
      {/* =====================================================
          PAGE BACKGROUND
          Green gradually transitions into warm ivory.
      ===================================================== */}

      <div
        className="
          fixed
          inset-0
          -z-20
          bg-[linear-gradient(
            180deg,
            #0E4001_0%,
            #294F1E_9%,
            #627746_20%,
            #A5A36C_34%,
            #D6D39A_50%,
            #ECE8C5_68%,
            #F4F2DD_84%,
            #F4F2DD_100%
          )]
        "
      />

      {/* Soft atmospheric light */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          -z-10
          bg-[radial-gradient(
            circle_at_50%_40%,
            rgba(244,242,221,0.30),
            transparent_46%
          )]
        "
      />

      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <nav className="mx-auto max-w-[1600px] px-4 pt-20 sm:px-8 lg:px-12">
        <ol
          className="
            flex
            flex-wrap
            items-center
            gap-2
            text-[9px]
            uppercase
            tracking-[0.16em]
            text-[#F4F2DD]/70
          "
        >
          <li>
            <Link href="/" className="transition hover:text-[#E4E198]">
              Home
            </Link>
          </li>

          <li>/</li>

          <li>
            <Link
              href={`/category/${product?.category?.toLowerCase()}`}
              className="transition hover:text-[#E4E198]"
            >
              {product?.category || "Category"}
            </Link>
          </li>

          <li>/</li>

          <li className="max-w-[220px] truncate text-[#E4E198]">
            {product?.name || "Product"}
          </li>
        </ol>
      </nav>

      {/* =====================================================
          MAIN PRODUCT EXPERIENCE
      ===================================================== */}

      <section className="mx-auto mt-5 max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-[#E4E198]/30
            bg-[#0E4001]/70
            text-[#F4F2DD]
            shadow-[0_30px_90px_rgba(14,64,1,0.22)]
            backdrop-blur-2xl
            backdrop-saturate-150
          "
        >
          {/* =================================================
              GLASS REFLECTION
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-0
              rounded-[32px]
              bg-gradient-to-br
              from-white/[0.10]
              via-transparent
              to-[#E4E198]/[0.07]
            "
          />

          {/* =================================================
              DECORATIVE CIRCLES
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              -right-28
              -top-28
              h-72
              w-72
              rounded-full
              border
              border-[#E4E198]/15
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-40
              left-1/3
              h-96
              w-96
              rounded-full
              border
              border-[#E4E198]/10
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[500px]
              w-[500px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#E4E198]/5
              blur-3xl
            "
          />

          {/* Soft brass glow */}

          <div
            className="
              pointer-events-none
              absolute
              -left-20
              top-1/4
              h-72
              w-72
              rounded-full
              bg-[#E4E198]/[0.06]
              blur-3xl
            "
          />

          {/* =================================================
              THREE COLUMN LAYOUT
          ================================================= */}

          <div
            className="
              relative
              z-10
              grid
              lg:grid-cols-[0.8fr_1.5fr_0.8fr]
            "
          >
            {/* =================================================
                LEFT PRODUCT INFORMATION
            ================================================= */}

            <div
              className="
                order-2
                flex
                flex-col
                justify-center
                border-t
                border-[#E4E198]/15
                bg-white/[0.025]
                p-7
                backdrop-blur-md
                sm:p-10
                lg:order-1
                lg:border-r
                lg:border-t-0
                lg:p-12
              "
            >
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.28em]
                  text-[#E4E198]
                "
              >
                {product?.category || "Brass Collection"}
              </p>

              <h1
                className="
                  mt-4
                  max-w-[420px]
                  font-serif
                  text-4xl
                  leading-[0.95]
                  tracking-tight
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {product?.name || "Brass Product"}
              </h1>

              <p className="mt-5 font-serif text-3xl italic text-[#E4E198]">
                ${variantActive?.price}
              </p>

              <div className="mt-8 h-px bg-[#E4E198]/10" />

              {/* Description */}

              <div className="mt-7">
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-[#E4E198]
                  "
                >
                  Description
                </p>

                <p
                  className={`
                    mt-4
                    text-sm
                    leading-7
                    text-[#F4F2DD]/65
                    transition-all
                    duration-300
                    ${!showFullDescription ? "line-clamp-5" : ""}
                  `}
                >
                  {product?.description ||
                    "A thoughtfully crafted brass piece designed for everyday use."}
                </p>

                {product?.description && product.description.length > 200 && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowFullDescription((previous) => !previous)
                    }
                    className="
                        mt-3
                        text-[9px]
                        uppercase
                        tracking-[0.15em]
                        text-[#E4E198]
                        underline
                        underline-offset-4
                      "
                  >
                    {showFullDescription ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>

              {/* Basic specifications */}

              <div className="mt-8 space-y-4">
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-[#E4E198]/10
                    pb-3
                  "
                >
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#889551]">
                    Material
                  </span>

                  <span className="text-right text-xs text-[#F4F2DD]/75">
                    {product?.details?.material || "-"}
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-[#E4E198]/10
                    pb-3
                  "
                >
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#889551]">
                    Finish
                  </span>

                  <span className="text-right text-xs text-[#F4F2DD]/75">
                    {product?.details?.finish || "-"}
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-[#E4E198]/10
                    pb-3
                  "
                >
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#889551]">
                    Weight
                  </span>

                  <span className="text-right text-xs text-[#F4F2DD]/75">
                    {variantActive?.weight ? `${variantActive.weight}g` : "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                CENTER PRODUCT IMAGE
            ================================================= */}

            <div
              className="
                order-1
                flex
                min-h-[480px]
                items-center
                justify-center
                bg-white/[0.015]
                px-5
                py-8
                sm:min-h-[600px]
                sm:px-10
                lg:order-2
                lg:min-h-[720px]
              "
            >
              <div
                className="
                  relative
                  h-[460px]
                  w-full
                  max-w-[580px]
                  sm:h-[570px]
                  lg:h-[650px]
                "
              >
                {/* Image glow */}

                <div
                  className="
                    absolute
                    inset-12
                    rounded-full
                    bg-[#E4E198]/10
                    blur-3xl
                  "
                />

                {/* Product image */}

                <div
                  className="
                    relative
                    h-full
                    w-full
                    overflow-hidden
                    rounded-[30px]
                  "
                >
                  {images.length > 0 ? (
                    <Image
                      src={images[currentImage]}
                      alt={product?.name || "Brass product"}
                      fill
                      priority
                      className="
                        object-contain
                        p-4
                        transition-transform
                        duration-700
                        hover:scale-[1.02]
                      "
                      sizes="
                        (max-width: 768px) 90vw,
                        (max-width: 1280px) 50vw,
                        580px
                      "
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[#F4F2DD]/40">
                      No image available
                    </div>
                  )}
                </div>

                {/* Previous image */}

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Previous product image"
                    className="
                      absolute
                      left-1
                      top-1/2
                      flex
                      h-10
                      w-10
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#E4E198]/20
                      bg-[#0E4001]/70
                      text-[#E4E198]
                      backdrop-blur-md
                      transition
                      hover:bg-[#E4E198]
                      hover:text-[#0E4001]
                    "
                  >
                    <IoIosArrowBack size={17} />
                  </button>
                )}

                {/* Next image */}

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next product image"
                    className="
                      absolute
                      right-1
                      top-1/2
                      flex
                      h-10
                      w-10
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#E4E198]/20
                      bg-[#0E4001]/70
                      text-[#E4E198]
                      backdrop-blur-md
                      transition
                      hover:bg-[#E4E198]
                      hover:text-[#0E4001]
                    "
                  >
                    <IoIosArrowForward size={17} />
                  </button>
                )}

                {/* Image dots */}

                {images.length > 1 && (
                  <div
                    className="
                      absolute
                      bottom-5
                      left-1/2
                      flex
                      -translate-x-1/2
                      gap-2
                    "
                  >
                    {images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentImage(index)}
                        aria-label={`View image ${index + 1}`}
                        className={`
                          h-1.5
                          rounded-full
                          transition-all
                          ${
                            currentImage === index
                              ? "w-7 bg-[#E4E198]"
                              : "w-1.5 bg-[#F4F2DD]/40"
                          }
                        `}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* =================================================
                RIGHT PURCHASE PANEL
            ================================================= */}

            <div
              className="
                order-3
                flex
                flex-col
                justify-center
                border-t
                border-[#E4E198]/15
                bg-white/[0.025]
                p-7
                backdrop-blur-md
                sm:p-10
                lg:border-l
                lg:border-t-0
                lg:p-12
              "
            >
              {/* Capacity */}

              <div>
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-[#E4E198]
                  "
                >
                  Capacity
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {product?.variants?.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleVariantChange(index)}
                      className={`
                          rounded-full
                          border
                          px-4
                          py-3
                          text-xs
                          transition
                          ${
                            index === variant
                              ? "border-[#E4E198] bg-[#E4E198] text-[#0E4001]"
                              : "border-[#F4F2DD]/15 text-[#F4F2DD]/65 hover:border-[#E4E198]/50 hover:text-[#F4F2DD]"
                          }
                        `}
                    >
                      {item?.capacity}ml
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected variant */}

              <div className="mt-8">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#889551]">
                  Selected
                </p>

                <p className="mt-2 text-lg text-[#F4F2DD]">
                  {variantActive?.capacity
                    ? `${variantActive.capacity}ml`
                    : "-"}
                </p>
              </div>

              {/* Price */}

              <div className="mt-8">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#889551]">
                  Price
                </p>

                <p className="mt-2 font-serif text-4xl italic text-[#E4E198]">
                  ${variantActive?.price}
                </p>

                <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-[#F4F2DD]/45">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Purchase buttons */}

              <div className="mt-8 space-y-3">
                <ProductButton />

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="
                    w-full
                    rounded-full
                    bg-[#E4E198]
                    px-6
                    py-4
                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    text-[#0E4001]
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-[0_10px_30px_rgba(228,225,152,0.2)]
                  "
                >
                  Buy Now
                </button>
              </div>

              {/* Trust information */}

              <div className="mt-8 space-y-3">
                {[
                  "Handcrafted",
                  "100% Pure Brass",
                  "Plastic-Free",
                  "7-Day Easy Returns",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-3
                      border-b
                      border-[#E4E198]/10
                      pb-3
                      text-xs
                      text-[#F4F2DD]/70
                    "
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E4E198]" />

                    {item}
                  </div>
                ))}
              </div>

              {/* Delivery information */}

              <div className="mt-7 space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#F4F2DD]/60">
                  <Image
                    src="/Assets/Icons/image.png"
                    alt=""
                    width={28}
                    height={28}
                  />
                  Free delivery on orders over $50
                </div>

                <div className="flex items-center gap-3 text-xs text-[#F4F2DD]/60">
                  <FiRefreshCcw size={17} />
                  7-day easy returns & exchanges
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT HIGHLIGHTS
      ===================================================== */}

      <section className="mx-auto mt-5 max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <div
          className="
            grid
            overflow-hidden
            rounded-[28px]
            border
            border-[#0E4001]/10
            bg-[#F4F2DD]/55
            backdrop-blur-xl
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {[
            {
              title: "HANDCRAFTED",
              text: "Made with traditional brass craftsmanship.",
            },
            {
              title: "PURE BRASS",
              text: "Crafted from durable brass for everyday use.",
            },
            {
              title: "TRADITIONAL",
              text: "Inspired by timeless Indian craft traditions.",
            },
            {
              title: "LONG LASTING",
              text: "Designed to become part of your everyday ritual.",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`
                min-h-[150px]
                border-[#0E4001]/10
                p-6
                sm:p-8
                ${index !== 3 ? "border-b lg:border-b-0 lg:border-r" : ""}
              `}
            >
              <h3 className="font-serif text-xl italic text-[#0E4001]">
                {item.title}
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#0E4001]/55">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          VISUAL PRODUCT STORY
      ===================================================== */}

      {images.length > 0 && (
        <section className="mx-auto mt-20 max-w-[1600px] px-4 sm:px-8 lg:px-12">
          <div className="mb-8">
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#0E4001]/60">
              Crafted In Detail
            </p>

            <h2
              className="
                mt-2
                font-serif
                text-4xl
                italic
                text-[#0E4001]
                sm:text-5xl
              "
            >
              Made to be noticed.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {images.slice(0, 3).map((src, index) => (
              <div key={`${src}-${index}`}>
                <div
                  className="
                    group
                    relative
                    aspect-[4/5]
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-[#0E4001]/10
                    bg-[#E4E198]/30
                    shadow-[0_20px_50px_rgba(14,64,1,0.08)]
                  "
                >
                  <Image
                    src={src}
                    alt={`${product?.name || "Product"} detail ${index + 1}`}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                    sizes="
                      (max-width: 1024px) 100vw,
                      33vw
                    "
                  />
                </div>

                <div className="mt-4 px-2">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#889551]">
                    0{index + 1}
                  </p>

                  <h3 className="mt-1 font-serif text-xl italic text-[#0E4001]">
                    {index === 0
                      ? "Craft & Form"
                      : index === 1
                        ? "Made for Everyday"
                        : "Details Matter"}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================
          EDITORIAL QUOTE
      ===================================================== */}

      <section className="mx-auto mt-24 max-w-4xl px-6 text-center">
        <p
          className="
            font-serif
            text-3xl
            italic
            leading-tight
            text-[#0E4001]
            sm:text-5xl
          "
        >
          “Designed to support natural hydration while reducing everyday waste.”
        </p>
      </section>

      {/* =====================================================
          HEALTH & WELLNESS
      ===================================================== */}

      <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-8">
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#0E4001]/60">
            Traditional Wellness
          </p>

          <h2
            className="
              mt-3
              font-serif
              text-4xl
              italic
              text-[#0E4001]
              sm:text-6xl
            "
          >
            Health & Wellness Benefits
          </h2>
        </div>

        <div
          className="
            mt-10
            grid
            overflow-hidden
            rounded-[28px]
            border
            border-[#0E4001]/10
            bg-[#F4F2DD]/55
            shadow-[0_20px_60px_rgba(14,64,1,0.06)]
            backdrop-blur-xl
            sm:grid-cols-2
          "
        >
          {[
            {
              icon: "/Assets/Icons/plant.png",
              title: "Supports Better Digestion Process",
              text: "Naturally infused water may aid the digestive process.",
            },
            {
              icon: "/Assets/Icons/antibacterial.png",
              title: "Naturally Antibacterial Properties",
              text: "Brass has inherent antimicrobial properties.",
            },
            {
              icon: "/Assets/Icons/drop.png",
              title: "Helps Maintain Water Freshness",
              text: "Natural properties help maintain freshness.",
            },
            {
              icon: "/Assets/Icons/ecology.png",
              title: "Rooted in Traditional Wellness Practices",
              text: "Inspired by traditional Ayurvedic practices.",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`
                flex
                gap-5
                p-7
                sm:p-9
                ${index < 2 ? "border-b border-[#0E4001]/10" : ""}
                ${index % 2 === 0 ? "sm:border-r" : ""}
                border-[#0E4001]/10
              `}
            >
              <Image
                src={item.icon}
                alt=""
                width={30}
                height={40}
                className="mt-1 h-8 w-auto object-contain"
              />

              <div>
                <h3 className="font-serif text-xl italic text-[#0E4001]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#0E4001]/55">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          WHY BRASS
      ===================================================== */}

      <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#0E4001]/60">
              The Material
            </p>

            <h2
              className="
                mt-3
                font-serif
                text-5xl
                italic
                text-[#0E4001]
                sm:text-7xl
              "
            >
              Why Brass?
            </h2>

            <div className="mt-8 space-y-6">
              <div className="flex gap-5">
                <div className="w-1 shrink-0 rounded-full bg-[#889551]" />

                <p className="text-sm leading-7 text-[#0E4001]/65 sm:text-base">
                  Brass is a natural copper-zinc alloy that has been used in
                  traditional wellness practices for thousands of years, valued
                  for its unique mineral properties.
                </p>
              </div>

              <div className="flex gap-5">
                <div className="w-1 shrink-0 rounded-full bg-[#889551]" />

                <p className="text-sm leading-7 text-[#0E4001]/65 sm:text-base">
                  Storing water in brass vessels is rooted in Ayurvedic
                  traditions, where the subtle interactions between water and
                  metal are believed to support balance and vitality.
                </p>
              </div>
            </div>
          </div>

          <div
            className="
              relative
              min-h-[420px]
              overflow-hidden
              rounded-[30px]
              border
              border-[#0E4001]/10
              bg-[#E4E198]/30
              shadow-[0_20px_60px_rgba(14,64,1,0.08)]
            "
          >
            <Image
              src="/Assets/Static/image.png"
              alt="Brass craftsmanship"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT DETAILS
      ===================================================== */}

      <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-8">
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#0E4001]/60">
            Specifications
          </p>

          <h2
            className="
              mt-3
              font-serif
              text-4xl
              italic
              text-[#0E4001]
              sm:text-6xl
            "
          >
            Product Details
          </h2>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {/* Specifications */}

          <div
            className={`
              overflow-hidden
              border
              border-[#0E4001]/10
              bg-[#F4F2DD]/55
              backdrop-blur-xl
              transition-all
              duration-300
              ${showDetails ? "rounded-[28px]" : "rounded-[22px]"}
            `}
          >
            <button
              type="button"
              onClick={() => setShowDetails((previous) => !previous)}
              className="
                flex
                w-full
                items-center
                justify-between
                px-7
                py-6
                text-left
              "
            >
              <span className="font-serif text-2xl italic text-[#0E4001]">
                Specifications
              </span>

              <IoIosArrowDown
                className={`
                  transition-transform
                  duration-300
                  ${showDetails ? "rotate-180" : ""}
                `}
              />
            </button>

            <div
              className={`
                overflow-hidden
                px-7
                transition-all
                duration-500
                ${
                  showDetails
                    ? "max-h-[600px] pb-7 opacity-100"
                    : "max-h-0 opacity-0"
                }
              `}
            >
              {[
                ["Material", product?.details?.material],
                [
                  "Capacity",
                  variantActive?.capacity ? `${variantActive.capacity}ml` : "-",
                ],
                ["Finish", product?.details?.finish],
                [
                  "Weight",
                  variantActive?.weight ? `${variantActive.weight}g` : "-",
                ],
                ["Design", product?.details?.design],
                ["Sustainability", product?.details?.sustainability],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="
                    flex
                    justify-between
                    gap-5
                    border-t
                    border-[#0E4001]/10
                    py-4
                    text-sm
                  "
                >
                  <span className="text-[#889551]">{label}</span>

                  <span className="text-right text-[#0E4001]/75">
                    {value || "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}

          <div
            className={`
              overflow-hidden
              border
              border-[#0E4001]/10
              bg-[#F4F2DD]/55
              backdrop-blur-xl
              transition-all
              duration-300
              ${showFeatures ? "rounded-[28px]" : "rounded-[22px]"}
            `}
          >
            <button
              type="button"
              onClick={() => setShowFeatures((previous) => !previous)}
              className="
                flex
                w-full
                items-center
                justify-between
                px-7
                py-6
                text-left
              "
            >
              <span className="font-serif text-2xl italic text-[#0E4001]">
                Key Features
              </span>

              <IoIosArrowDown
                className={`
                  transition-transform
                  duration-300
                  ${showFeatures ? "rotate-180" : ""}
                `}
              />
            </button>

            <div
              className={`
                overflow-hidden
                px-7
                transition-all
                duration-500
                ${
                  showFeatures
                    ? "max-h-[600px] pb-7 opacity-100"
                    : "max-h-0 opacity-0"
                }
              `}
            >
              {product?.details?.features?.map((feature, index) => (
                <div
                  key={`${feature}-${index}`}
                  className="
                      flex
                      items-center
                      gap-3
                      border-t
                      border-[#0E4001]/10
                      py-4
                      text-sm
                      text-[#0E4001]/70
                    "
                >
                  <BsArrowReturnRight className="shrink-0 text-[#889551]" />

                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Care Instructions */}

        <div
          className={`
            mt-4
            overflow-hidden
            border
            border-[#0E4001]/10
            bg-[#F4F2DD]/55
            backdrop-blur-xl
            transition-all
            duration-300
            ${showCare ? "rounded-[28px]" : "rounded-[22px]"}
          `}
        >
          <button
            type="button"
            onClick={() => setShowCare((previous) => !previous)}
            className="
              flex
              w-full
              items-center
              justify-between
              px-7
              py-6
              text-left
            "
          >
            <span className="font-serif text-2xl italic text-[#0E4001]">
              Care Instructions
            </span>

            <IoIosArrowDown
              className={`
                transition-transform
                duration-300
                ${showCare ? "rotate-180" : ""}
              `}
            />
          </button>

          <div
            className={`
              overflow-hidden
              px-7
              transition-all
              duration-500
              ${
                showCare
                  ? "max-h-[600px] pb-7 opacity-100"
                  : "max-h-0 opacity-0"
              }
            `}
          >
            {product?.details?.care?.map((care, index) => (
              <div
                key={`${care}-${index}`}
                className="
                    flex
                    items-center
                    gap-3
                    border-t
                    border-[#0E4001]/10
                    py-4
                    text-sm
                    text-[#0E4001]/70
                  "
              >
                <BsArrowReturnRight className="shrink-0 text-[#889551]" />

                {care}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SUSTAINABILITY
      ===================================================== */}

      <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-8">
        <div
          className="
            overflow-hidden
            rounded-[30px]
            bg-[#0E4001]
            p-8
            text-center
            text-[#F4F2DD]
            shadow-[0_30px_80px_rgba(14,64,1,0.18)]
            sm:p-14
            lg:p-20
          "
        >
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#E4E198]">
            Eco Impact
          </p>

          <h2
            className="
              mt-3
              font-serif
              text-4xl
              italic
              sm:text-6xl
            "
          >
            Sustainability
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#F4F2DD]/55 sm:text-base">
            Every conscious choice contributes to a healthier planet.
          </p>

          <div
            className="
              mx-auto
              mt-10
              max-w-4xl
              rounded-[24px]
              border
              border-[#E4E198]/20
              bg-[#E4E198]/10
              p-7
              sm:p-10
            "
          >
            <p className="font-serif text-2xl italic leading-relaxed text-[#E4E198] sm:text-4xl">
              Choosing a brass bottle means choosing to reduce waste, honor
              tradition, and invest in a product that serves you and the Earth
              for years to come.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          SIMILAR PRODUCTS
      ===================================================== */}

      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
          {/* Section heading */}
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-[#889551]">
                You May Like
              </p>

              <h2 className="mt-2 font-serif text-4xl italic text-[#0E4001] sm:text-5xl">
                More from the collection.
              </h2>
            </div>

            {/* Desktop controls */}
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollSimilarProducts("left")}
                aria-label="Previous products"
                className="
            flex h-11 w-11 items-center justify-center
            rounded-full
            border border-[#0E4001]/15
            bg-[#F4F2DD]/70
            text-[#0E4001]
            backdrop-blur-md
            transition
            hover:bg-[#E4E198]
          "
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => scrollSimilarProducts("right")}
                aria-label="Next products"
                className="
            flex h-11 w-11 items-center justify-center
            rounded-full
            border border-[#0E4001]/15
            bg-[#F4F2DD]/70
            text-[#0E4001]
            backdrop-blur-md
            transition
            hover:bg-[#E4E198]
          "
              >
                →
              </button>
            </div>
          </div>

          {/* Products rail */}
          <div
            ref={similarProductsRef}
            className="
        flex
        flex-nowrap
        gap-5
        overflow-x-auto
        overflow-y-hidden
        pb-4
        snap-x
        snap-mandatory
        scroll-smooth
        no-scrollbar
      "
          >
            {similarProduct?.map((item) => (
              <div
                key={item.Productid}
                className="
            w-[260px]
            min-w-[260px]
            shrink-0
            snap-start
            sm:w-[300px]
            sm:min-w-[300px]
            lg:w-[330px]
            lg:min-w-[330px]
          "
              >
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailPage;
