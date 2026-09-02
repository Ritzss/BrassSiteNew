/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
// import Link from "next/link";

import { FiArrowUpRight } from "react-icons/fi";

import ProductCard from "@/components/Pages/Product/ProductCard";

import FilterSidebar from "@/components/Pages/Product/FilterSidebar";

import { similarProducts } from "@/Demo/data/similarProduct";

const ITEMS_PER_LOAD = 10;

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "name";

const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  "price-low": "Price: Low to High",
  "price-high": "Price: High to Low",
  name: "Name",
};

type FilterState = {
  category: string[];
  capacity: string[];
  finish: string[];
  features: string[];
  price: string[];
};


const Page = () => {
  /* =====================================================
    STATE
  ===================================================== */

  const [activeCategory, setActiveCategory] = useState("all");

  const [filters, setFilters] = useState<FilterState>({
    category: [],
    capacity: [],
    finish: [],
    features: [],
    price: [],
  });

  const [sort, setSort] = useState<SortOption>("featured");

  const [visibleCount, setVisibleCount] =
    useState(ITEMS_PER_LOAD);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  /* =====================================================
    CATEGORY + FILTER LOGIC
  ===================================================== */

  const filteredProducts = useMemo(() => {
    return similarProducts.filter((product) => {
      /*
       * Top category navigation.
       * "all" leaves the complete collection visible.
       */
      const activeCategoryMatch =
        activeCategory === "all" ||
        product.category?.toLowerCase() === activeCategory;

      const categoryMatch =
        filters.category.length === 0 ||
        filters.category.some(
          (category) =>
            product.category?.toLowerCase() ===
            category.toLowerCase(),
        );

      const capacityMatch =
        filters.capacity.length === 0 ||
        product.variants?.some((variant) =>
          filters.capacity.includes(
            variant.capacity.toString(),
          ),
        );

      const finishMatch =
        filters.finish.length === 0 ||
        filters.finish.some((finish) =>
          product.details?.finish
            ?.toLowerCase()
            .includes(finish.toLowerCase()),
        );

      const featureMatch =
        filters.features.length === 0 ||
        filters.features.some((feature) =>
          product.details?.features?.some((item) =>
            item
              .toLowerCase()
              .includes(feature.toLowerCase()),
          ),
        );

      const priceMatch =
        filters.price.length === 0 ||
        product.variants?.some((variant) =>
          filters.price.some((range) => {
            const price = variant.price;

            switch (range) {
              case "$0 - $25":
                return price >= 0 && price <= 25;

              case "$25 - $50":
                return price > 25 && price <= 50;

              case "$50 - $100":
                return price > 50 && price <= 100;

              case "$100+":
                return price > 100;

              default:
                return false;
            }
          }),
        );

      return (
        activeCategoryMatch &&
        categoryMatch &&
        capacityMatch &&
        finishMatch &&
        featureMatch &&
        priceMatch
      );
    });
  }, [activeCategory, filters]);

  /* =====================================================
     SORTING
  ===================================================== */

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (sort) {
      case "price-low":
        return products.sort(
          (a, b) =>
            (a.variants?.[0]?.price ?? 0) -
            (b.variants?.[0]?.price ?? 0),
        );

      case "price-high":
        return products.sort(
          (a, b) =>
            (b.variants?.[0]?.price ?? 0) -
            (a.variants?.[0]?.price ?? 0),
        );

      case "name":
        return products.sort(
          (a, b) =>
            (a.name ?? "").localeCompare(b.name ?? ""),
        );

      case "featured":
      default:
        return products;
    }
  }, [filteredProducts, sort]);

  /* =====================================================
     INFINITE SCROLL
  ===================================================== */

  useEffect(() => {
    const currentLoader = loaderRef.current;

    if (!currentLoader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (
          entry.isIntersecting &&
          visibleCount < sortedProducts.length
        ) {
          observer.unobserve(currentLoader);

          setVisibleCount((previous) =>
            Math.min(
              previous + ITEMS_PER_LOAD,
              sortedProducts.length,
            ),
          );
        }
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(currentLoader);

    return () => observer.disconnect();
  }, [visibleCount, sortedProducts.length]);

  /*
   * Start from the first batch whenever the
   * category, filters, or sorting changes.
   */
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [activeCategory, filters, sort]);

  /* =====================================================
     ACTIVE FILTER COUNT
  ===================================================== */

  const activeFilterCount = Object.values(filters).reduce(
    (total, values) => total + values.length,
    0,
  );

  const visibleProducts = sortedProducts.slice(
    0,
    visibleCount,
  );

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main
      className="
    min-h-screen
    text-[#0E4001]
    bg-[linear-gradient(180deg,#0E4001_0%,#294F1E_10%,#627746_22%,#A5A36C_36%,#D6D39A_52%,#ECE8C5_70%,#F4F2DD_88%,#F4F2DD_100%)]
  "
    >
      {/* =================================================
          HERO
      ================================================= */}

      <section className="px-4 pt-6 sm:px-8 lg:px-12">
        <div
          className="
            relative
            mx-auto
            max-w-400
            overflow-hidden
            rounded-4xl
            bg-[#0E4001]
            px-6
            py-16
            text-[#F4F2DD]
            sm:px-10
            sm:py-20
            lg:px-16
            lg:py-24
          "
        >
          {/* Decorative shapes */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-64
              w-64
              rounded-full
              border
              border-[#E4E198]/20
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              right-24
              h-72
              w-72
              rounded-full
              border
              border-[#E4E198]/10
            "
          />

          <div className="relative max-w-3xl">
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-[#E4E198]
              "
            >
              VastraDrobe · Brassware
            </p>

            <h1
              className="
                mt-5
                max-w-3xl
                font-serif
                text-5xl
                leading-[0.95]
                tracking-tight
                sm:text-6xl
                lg:text-8xl
              "
            >
              The Brass
              <br />
              <span className="italic text-[#E4E198]">
                Collection.
              </span>
            </h1>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p
                className="
                  max-w-xl
                  text-sm
                  leading-7
                  text-[#F4F2DD]/65
                  sm:text-base
                "
              >
                Explore our complete collection of
                handcrafted brass pieces, designed to
                bring traditional craft into contemporary
                everyday living.
              </p>

              <div className="flex items-center gap-2 text-[#E4E198]">
                <span className="text-[9px] uppercase tracking-[0.2em]">
                  {similarProducts.length} Pieces
                </span>

                <FiArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          CATEGORY NAVIGATION
      ================================================= */}

      {/* <section className="mx-auto mt-8 max-w-400 px-4 sm:px-8 lg:px-12">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((category) => {
            const active =
              activeCategory === category.value;

            return (
              <button
                key={category.value}
                type="button"
                onClick={() =>
                  setActiveCategory(category.value)
                }
                className={`
                  shrink-0
                  rounded-full
                  px-5
                  py-2.5
                  text-[9px]
                  uppercase
                  tracking-[0.16em]
                  transition
                  ${
                    active
                      ? "bg-[#0E4001] text-[#F4F2DD]"
                      : "border border-[#0E4001]/10 bg-white/50 text-[#0E4001]/60 hover:bg-[#E4E198]/30"
                  }
                `}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </section> */}

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <section className="mx-auto mt-6 max-w-400 px-4 sm:px-8 lg:px-12">
        <div
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-[#0E4001]/10
            bg-white/50
            px-4
            py-3
            backdrop-blur-sm
          "
        >
          <div>
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[#889551]
              "
            >
              Curated Selection
            </p>

            <p className="mt-1 text-sm text-[#0E4001]/65">
              {sortedProducts.length} products
            </p>
          </div>

          <div className="flex items-center gap-2">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
            />

            {/* SORT */}

            <div className="relative">
              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    event.target.value as SortOption,
                  )
                }
                className="
                  appearance-none
                  rounded-full
                  border
                  border-[#0E4001]/10
                  bg-[#E4E198]
                  py-2.5
                  pl-4
                  pr-9
                  text-[9px]
                  uppercase
                  tracking-[0.15em]
                  text-[#0E4001]
                  outline-none
                "
              >
                {(
                  Object.entries(sortLabels) as [
                    SortOption,
                    string,
                  ][]
                ).map(([value, label]) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ACTIVE FILTERS */}

        {activeFilterCount > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className="
                mr-1
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-[#889551]
              "
            >
              Active
            </span>

            {Object.entries(filters).flatMap(
              ([type, values]) =>
                values.map((value) => (
                  <button
                    key={`${type}-${value}`}
                    type="button"
                    onClick={() => {
                      setFilters((current) => ({
                        ...current,
                        [type]:
                          current[
                            type as keyof FilterState
                          ].filter(
                            (item) => item !== value,
                          ),
                      }));
                    }}
                    className="
                      rounded-full
                      border
                      border-[#0E4001]/10
                      bg-white/60
                      px-3
                      py-1.5
                      text-[8px]
                      text-[#0E4001]/70
                      transition
                      hover:bg-[#E4E198]/30
                    "
                  >
                    {value} ×
                  </button>
                )),
            )}
          </div>
        )}
      </section>

      {/* =================================================
          PRODUCT GRID
      ================================================= */}

      <section className="mx-auto mt-8 max-w-400 px-4 sm:px-8 lg:px-12">
        {visibleProducts.length > 0 ? (
          <div
            className="
              grid
              grid-cols-2
              gap-x-3
              gap-y-10
              sm:gap-x-5
              lg:grid-cols-3
              lg:gap-x-6
              lg:gap-y-14
            "
          >
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={`${product.Productid}-${index}`}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div
            className="
              flex
              min-h-[40vh]
              items-center
              justify-center
              rounded-3xl
              border
              border-[#0E4001]/10
              bg-white/30
            "
          >
            <div className="text-center">
              <p className="font-serif text-3xl italic text-[#0E4001]">
                No products found
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[#889551]">
                Try adjusting your filters
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            INFINITE SCROLL
        ================================================= */}

        <div
          ref={loaderRef}
          className="
            flex
            h-24
            w-full
            items-center
            justify-center
          "
        >
          {visibleCount < sortedProducts.length && (
            <div
              className="
                animate-pulse
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[#889551]
              "
            >
              Loading more
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;