/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import ProductCard from "@/components/Pages/Product/ProductCard";

import FilterSidebar, {
  FiltersType,
} from "@/components/Pages/Product/FilterSidebar";

import { similarProducts } from "@/Demo/data/similarProduct";

const ITEMS_PER_LOAD = 10;

import { useParams } from "next/navigation";
import ProductQuickView from "@/components/Pages/Product/ProductQuickView";

const Page = () => {
  const params = useParams();

  const categorySlug =
    typeof params.slug === "string" ? params.slug.toLowerCase() : "";

  /* ---------------- FILTER STATE ---------------- */

  const [filters, setFilters] = useState<FiltersType>({
    category: [],
    capacity: [],
    finish: [],
    features: [],
    price: [],
  });

  /* ---------------- CATEGORY PRODUCTS ---------------- */

  const categoryProducts = useMemo(() => {
    return similarProducts.filter(
      (product) => product.category?.toLowerCase() === categorySlug,
    );
  }, [categorySlug]);

  /* ---------------- FILTER LOGIC ---------------- */

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      const categoryMatch =
        filters.category.length === 0 ||
        filters.category.includes(product.category);

      const capacityMatch =
        filters.capacity.length === 0 ||
        product.variants?.some((variant) =>
          filters.capacity.includes(variant.capacity.toString()),
        );

      const finishMatch =
        filters.finish.length === 0 ||
        filters.finish.some((finish) =>
          product.details?.finish?.toLowerCase().includes(finish.toLowerCase()),
        );

      const featureMatch =
        filters.features.length === 0 ||
        filters.features.some((feature) =>
          product.details?.features.some((item) =>
            item.toLowerCase().includes(feature.toLowerCase()),
          ),
        );

      const priceMatch =
        filters.price.length === 0 ||
        product.variants?.some((variant) => {
          return filters.price.some((range) => {
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
          });
        });

      return (
        categoryMatch &&
        capacityMatch &&
        finishMatch &&
        featureMatch &&
        priceMatch
      );
    });
  }, [filters, categoryProducts]);

  /* ---------------- INFINITE SCROLL ---------------- */

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentLoader = loaderRef.current;

    if (!currentLoader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && visibleCount < filteredProducts.length) {
          observer.unobserve(currentLoader);

          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_LOAD, filteredProducts.length),
          );
        }
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(currentLoader);

    return () => {
      observer.disconnect();
    };
  }, [visibleCount, filteredProducts.length]);

  /* ---------------- RESET COUNT ---------------- */

  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [filters, categorySlug]);

  /* ---------------- PRODUCTS ---------------- */

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    console.log(selectedIndex, visibleProducts[selectedIndex ?? 0]?.Productid);
  }, [selectedIndex, visibleProducts]);

  const openProduct = (index: number) => {
    setSelectedIndex(index);
  };

  const closeProduct = () => {
    setSelectedIndex(null);
  };

  const nextProduct = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;

      return (prev + 1) % visibleProducts.length;
    });
  }, [visibleProducts.length]);

  const prevProduct = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;

      return prev === 0 ? visibleProducts.length - 1 : prev - 1;
    });
  }, [visibleProducts.length]);

  return (
    <div className="flex">
      {/* SIDEBAR */}

      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        hideCategory={true}
      />

      {/* PRODUCTS */}

      <div className="flex-1 px-3 md:px-5 py-5">
        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold capitalize">
            {categorySlug} Collection
          </h1>

          <p className="text-sm opacity-70">
            {filteredProducts.length} Products
          </p>
        </div>

        <hr />
        {/* PRODUCT GRID */}

        <div className="flex flex-wrap gap-3">
          {visibleProducts.map((prod, i) => (
            <div
              key={`${prod.Productid}-${i}`}
              onClick={() => openProduct(i)}
              className="cursor-pointer"
            >
              <ProductCard product={prod} />
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          <ProductQuickView
            product={
              selectedIndex !== null ? visibleProducts[selectedIndex] : null
            }
            isOpen={selectedIndex !== null}
            onClose={closeProduct}
            onNext={nextProduct}
            onPrev={prevProduct}
          />
        </div>

        {/* EMPTY */}

        {filteredProducts.length === 0 && (
          <div className="h-[40vh] flex items-center justify-center text-2xl opacity-60">
            No products found
          </div>
        )}

        {/* LOADER */}

        <div
          ref={loaderRef}
          className="h-24 flex items-center justify-center w-full"
        >
          {visibleCount < filteredProducts.length && (
            <div className="text-lg opacity-70 animate-pulse">
              Loading more products...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
