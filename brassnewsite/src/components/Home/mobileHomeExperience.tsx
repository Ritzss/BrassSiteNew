/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FiBookmark,
  FiGrid,
  FiMenu,
  FiSearch,
  FiShoppingBag,
} from "react-icons/fi";

import { similarProducts } from "@/Demo/data/similarProduct";

/*
 * Temporary web-safe product image.
 *
 * The current similarProducts dataset comes from a React Native
 * source and its image values are not reliable browser URLs.
 * Until the product dataset is unified with the web application,
 * use this known Next.js public asset.
 */
const FALLBACK_IMAGE = "/Assets/Static/image.png";

const categories = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Drinkware",
    value: "drinkware",
  },
  {
    label: "Bottles",
    value: "bottles",
  },
  {
    label: "Bowls",
    value: "bowls",
  },
  {
    label: "Glasses",
    value: "glasses",
  },
];

export default function MobileHomeExperience() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  /*
   * IMPORTANT FOR HYDRATION:
   *
   * We do not access:
   * - window
   * - document
   * - localStorage
   * - navigator
   *
   * during render.
   *
   * Therefore the server HTML and initial client HTML
   * are deterministic.
   */
  const products = similarProducts ?? [];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) =>
            product.category?.toLowerCase() === selectedCategory.toLowerCase(),
        );

  /*
   * Keep enough products visible for the vertical app feed.
   */
  const displayProducts = filteredProducts.slice(0, 6);

  const getProductImage = () => {
    /*
     * The current demo dataset contains a React Native
     * require() result rather than a browser URL.
     *
     * Use the known web asset for now.
     */
    return FALLBACK_IMAGE;
  };

  const getProductPrice = (product: any) => {
    return product?.variants?.[0]?.price ?? 0;
  };

  const getProductCapacity = (product: any) => {
    return product?.variants?.[0]?.capacity;
  };

  return (
    <main
      className="
        min-h-[100svh]
        overflow-x-hidden
        bg-[#F7F5EC] text-[#0E4001]
      "
    >
      {/* =====================================================
          APP HEADER
      ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          flex
          h-[68px]
          items-center
          justify-between
          bg-[#F7F5EC] text-[#0E4001]
          px-5
        "
      >
        {/* Menu */}

        <button
          type="button"
          aria-label="Open menu"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            text-white
          "
        >
          <FiMenu size={20} />
        </button>

        {/* Brand */}

        <Link
          href="/"
          className="
            absolute
            left-1/2
            -translate-x-1/2
            font-serif
            text-xl
            italic
            tracking-wide
          "
        >
          Brass.
        </Link>

        {/* Utilities */}

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
            "
          >
            <FiSearch size={18} />
          </Link>

          <Link
            href="/cart"
            aria-label="Cart"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
            "
          >
            <FiShoppingBag size={18} />
          </Link>
        </div>
      </header>

      {/* =====================================================
          TITLE
      ===================================================== */}

      <section className="px-4 pb-4">
        <p
          className="
            mb-3
            text-[8px]
            uppercase
            tracking-[0.28em]
            text-[#E4E198]
          "
        >
          Traditional Craft / Modern Living
        </p>

        <h1
          className="
            max-w-[350px]
            font-serif
            text-[38px]
            font-normal
            italic
            leading-[0.9]
            tracking-[-0.04em]
          "
        >
          TIMELESS
          <br />
          BRASSWARE
        </h1>
      </section>

      {/* =====================================================
          CATEGORY PILLS
      ===================================================== */}

      <section className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((category) => {
            const isActive = selectedCategory === category.value;

            return (
              <button
                key={category.value}
                type="button"
                onClick={() => setSelectedCategory(category.value)}
                className={`
                  flex
                  h-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  px-5
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.08em]
                  transition-colors
                  ${
                    isActive
                      ? "bg-white text-black"
                      : "border border-white/15 bg-[#171717] text-white/70"
                  }
                `}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          PRODUCT FEED
      ===================================================== */}

      <section className="px-2 pb-10">
        <div className="space-y-2">
          {displayProducts.map((product: any, index: number) => {
            const productId = product?.Productid ?? product?.productId;

            const image = getProductImage();

            const price = getProductPrice(product);

            const capacity = getProductCapacity(product);

            return (
              <Link
                key={`${productId}-${index}`}
                href={`/productsdetail/${productId}`}
                className="block"
              >
                <article
                  className="
                      group
                      relative
                      h-[330px]
                      overflow-hidden
                      rounded-[18px]
                      bg-[#E9E9E9]
                    "
                >
                  {/* Product image */}

                  <Image
                    src={image}
                    alt={product?.name || "Brass product"}
                    fill
                    sizes="100vw"
                    className=" object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    priority={index < 2}
                  />

                  {/* Subtle image overlay */}

                  <div className=" absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                  {/* Category */}

                  <div className=" absolute left-4 top-4 rounded-full bg-[#F7F5EC]/65 text-[#0E4001] px-3 py-2 text-[7px] uppercase tracking-[0.16em] backdrop-blur-md">
                    {product?.category || "Brassware"}
                  </div>

                  {/* Bookmark */}

                  <button
                    type="button"
                    aria-label="Save product"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                    className=" absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F5EC]/60 text-[#0E4001] backdrop-blur-md"
                  >
                    <FiBookmark size={15} />
                  </button>

                  {/* Product information */}

                  <div className=" absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className=" truncate font-serif text-[26px] italic leading-none ">
                          {product?.name}
                        </h2>

                        <p className=" mt-2 text-[8px] uppercase tracking-[0.15em] text-white/60">
                          {capacity ? `${capacity} ml` : "Handcrafted Brass"}
                        </p>
                      </div>

                      <p className=" shrink-0 font-serif text-[21px] italic">
                        ₹{price}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Empty state */}

        {displayProducts.length === 0 && (
          <div className=" flex min-h-[300px] items-center justify-center rounded-[18px] bg-[#F7F5EC] text-[#0E4001] text-center">
            <div>
              <p className="font-serif text-2xl italic">Nothing here yet.</p>

              <p className="mt-2 text-xs text-white/40">
                Try another collection.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          SIMPLE FOOTER
      ===================================================== */}

      <section className="px-4 pb-28">
        <div className=" rounded-[18px] border border-white/10 bg-[#F7F5EC] text-[#0E4001] px-6 py-10 text-center">
          <p className=" text-[8px] uppercase tracking-[0.25em] text-[#E4E198]">
            The Brass Philosophy
          </p>

          <h2 className=" mt-4 font-serif text-3xl italic leading-tight">
            Made for rituals.
            <br />
            Made to last.
          </h2>
        </div>
      </section>
    </main>
  );
}
