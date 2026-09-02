/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
// import { FiChevronDown } from "react-icons/fi";

import ProductCard from "@/components/Pages/Product/ProductCard";
import FilterSidebar from "@/components/Pages/Product/FilterSidebar";

import { similarProducts } from "@/Demo/data/similarProduct";
import { useParams } from "next/navigation";
import SortDropdown from "@/components/Pages/Product/SortDropdown";

const ITEMS_PER_LOAD = 10;

type SortOption = "featured" | "price-low" | "price-high" | "name";

type FilterState = {
  category: string[];
  capacity: string[];
  finish: string[];
  features: string[];
  price: string[];
};

const Page = () => {
  const params = useParams();

  const categorySlug =
    typeof params.slug === "string" ? params.slug.toLowerCase() : "";

  const [filters, setFilters] = useState<FilterState>({
    category: [],
    capacity: [],
    finish: [],
    features: [],
    price: [],
  });

  const [sort, setSort] = useState<SortOption>("featured");

  // const [sortOpen, setSortOpen] = useState(false);

  /* ---------------------------------------------------------
    CATEGORY PRODUCTS
     --------------------------------------------------------- */

  const categoryProducts = useMemo(() => {
    // /category/all → display every product
    if (categorySlug === "brassware") {
      return similarProducts;
    }

    // /category/bowls → only bowls
    // /category/bottles → only bottles
    // /category/plates → only plates
    // /category/glasses → only glasses
    return similarProducts.filter(
      (product) =>
        product.category?.toLowerCase() === categorySlug.toLowerCase(),
    );
  }, [categorySlug]);

  /* ---------------------------------------------------------
    FILTER PRODUCTS
     --------------------------------------------------------- */

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      // Capacity
      const capacityMatch =
        filters.capacity.length === 0 ||
        product.variants?.some((variant) =>
          filters.capacity.includes(String(variant.capacity)),
        );

      // Finish
      const finishMatch =
        filters.finish.length === 0 ||
        filters.finish.some((finish: string) =>
          product.details?.finish?.toLowerCase().includes(finish.toLowerCase()),
        );

      // Features
      const featureMatch =
        filters.features.length === 0 ||
        filters.features.some((feature: string) =>
          product.details?.features?.some((item) =>
            item.toLowerCase().includes(feature.toLowerCase()),
          ),
        );

      // Price
      const priceMatch =
        filters.price.length === 0 ||
        product.variants?.some((variant) =>
          filters.price.some((range: any) => {
            const price = Number(variant.price);

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
                return true;
            }
          }),
        );

      return capacityMatch && finishMatch && featureMatch && priceMatch;
    });
  }, [categoryProducts, filters]);

  /* ---------------------------------------------------------
     SORTING
     --------------------------------------------------------- */

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (sort) {
      case "price-low":
        return products.sort((a, b) => {
          const priceA = Number(a.variants?.[0]?.price ?? 0);

          const priceB = Number(b.variants?.[0]?.price ?? 0);

          return priceA - priceB;
        });

      case "price-high":
        return products.sort((a, b) => {
          const priceA = Number(a.variants?.[0]?.price ?? 0);

          const priceB = Number(b.variants?.[0]?.price ?? 0);

          return priceB - priceA;
        });

      case "name":
        return products.sort((a, b) =>
          (a?.name ?? "").localeCompare(b?.name ?? ""),
        );

      case "featured":
      default:
        return products;
    }
  }, [filteredProducts, sort]);

  /* ---------------------------------------------------------
     INFINITE SCROLL
     --------------------------------------------------------- */

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < sortedProducts.length) {
          setVisibleCount((current) =>
            Math.min(current + ITEMS_PER_LOAD, sortedProducts.length),
          );
        }
      },
      {
        rootMargin: "300px",
      },
    );

    const loader = loaderRef.current;

    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }

      observer.disconnect();
    };
  }, [visibleCount, sortedProducts.length]);

  /* Reset pagination whenever filtering/category changes. */
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [filters, categorySlug, sort]);

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  /* ---------------------------------------------------------
    HELPERS
     --------------------------------------------------------- */

  const activeFilterCount = Object.values(filters).reduce(
    (total, values) => total + values.length,
    0,
  );

  const formattedCategory =
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  // const sortLabels: Record<SortOption, string> = {
  //   featured: "Featured",
  //   "price-low": "Price: Low",
  //   "price-high": "Price: High",
  //   name: "Name",
  // };

  return (
    <main
      className="
    min-h-screen
    text-[#0E4001]
    bg-[linear-gradient(180deg,#0E4001_0%,#294F1E_10%,#627746_22%,#A5A36C_36%,#D6D39A_52%,#ECE8C5_70%,#F4F2DD_88%,#F4F2DD_100%)]
  "
    >
      {/* =====================================================
          CATEGORY HERO
          ===================================================== */}

      <section className="px-4 pb-6 pt-5 sm:px-8 lg:px-12">
        <div
          className="
            relative
            mx-auto
            max-w-400
            overflow-hidden
            rounded-[30px]
            bg-[#0E4001]
            px-6
            py-14
            sm:px-10
            sm:py-16
            lg:px-14
            lg:py-20
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
              h-64
              w-64
              rounded-full
              border
              border-[#E4E198]/15
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              right-[20%]
              h-60
              w-60
              rounded-full
              border
              border-[#889551]/20
            "
          />

          <div className="relative z-10">
            <p
              className="
                mb-4
                text-[9px]
                uppercase
                tracking-[0.35em]
                text-[#E4E198]
              "
            >
              The Brass Collection
            </p>

            <h1
              className="
                font-serif
                text-5xl
                italic
                leading-none
                tracking-tight
                text-[#F4F2DD]
                sm:text-6xl
                lg:text-7xl
              "
            >
              {formattedCategory}
            </h1>

            <p
              className="
                mt-5
                max-w-lg
                text-sm
                leading-6
                text-[#F4F2DD]/60
              "
            >
              Timeless brass pieces crafted for everyday rituals and modern
              living.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORY TABS
          ===================================================== */}

      <section className="px-4 sm:px-8 lg:px-12">
        <div
          className="
            mx-auto
            flex
            max-w-400
            gap-2
            overflow-x-auto
            border-b
            border-[#0E4001]/10
            pb-3
          "
        >
          {[
            ["Brassware", "/category/brassware"],
            ["Bowls", "/category/bowls"],
            ["Bottles", "/category/bottles"],
            ["Plates", "/category/plates"],
            ["Glasses", "/category/glasses"],
          ].map(([label, href]) => {
            const active = label.toLowerCase() === categorySlug;

            return (
              <Link
                key={href}
                href={href}
                className={`
                  shrink-0
                  rounded-full
                  px-5
                  py-2.5
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  transition-all
                  duration-300
                  ${
                    active
                      ? "bg-[#0E4001] text-[#E4E198]"
                      : "text-[#ffffff]/50 hover:bg-[#E4E198]/40 hover:text-[#0E4001]"
                  }
                `}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* =====================================================
    TOOLBAR
===================================================== */}

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
          {/* PRODUCT COUNT */}
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

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            {/* FILTER */}
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              hideCategory={true}
            />

            {/* SORT */}
            <SortDropdown sort={sort} setSort={setSort} />
          </div>
        </div>

        {/* =====================================================
      ACTIVE FILTERS
  ===================================================== */}

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

            {Object.entries(filters).flatMap(([type, values]) =>
              values.map(
                (
                  value:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactPortal
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined,
                ) => (
                  <button
                    key={`${type}-${value}`}
                    type="button"
                    onClick={() => {
                      setFilters((current: FilterState): FilterState => {
                        const filterType = type as keyof FilterState;

                        return {
                          ...current,
                          [filterType]: current[filterType].filter(
                            (item) => item !== String(value),
                          ),
                        };
                      });
                    }}
                    className="
              group
              flex
              items-center
              gap-2
              rounded-full
              border
              border-[#0E4001]/10
              bg-white/60
              px-3
              py-1.5
              text-[8px]
              text-[#0E4001]/70
              transition
              hover:border-[#0E4001]/20
              hover:bg-[#E4E198]/30
            "
                  >
                    <span>{value}</span>

                    <span
                      className="
                text-[10px]
                leading-none
                text-[#889551]
                transition
                group-hover:text-[#0E4001]
              "
                    >
                      ×
                    </span>
                  </button>
                ),
              ),
            )}
          </div>
        )}
      </section>

      {/* =====================================================
          PRODUCTS
          ===================================================== */}

      <section
        className="
          mx-auto
          mt-6
          max-w-400
          px-4
          pb-20
          sm:px-8
          lg:px-12
        "
      >
        {visibleProducts.length > 0 ? (
          <div
            className="
              grid
              grid-cols-2
              gap-x-3
              gap-y-9
              sm:gap-x-5
              sm:gap-y-11
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
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="text-center">
              <h2
                className="
                  font-serif
                  text-3xl
                  italic
                  text-[#0E4001]
                "
              >
                Nothing found
              </h2>

              <p className="mt-2 text-sm text-[#0E4001]/50">
                Try changing your filters.
              </p>
            </div>
          </div>
        )}

        {/* Infinite scroll */}
        <div
          ref={loaderRef}
          className="
            flex
            h-24
            items-center
            justify-center
          "
        >
          {visibleCount < sortedProducts.length && (
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#889551]/40" />

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-[#889551]
                "
              >
                Loading
              </span>

              <span className="h-px w-8 bg-[#889551]/40" />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
