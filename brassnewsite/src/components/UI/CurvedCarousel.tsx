"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";
import { toast } from "sonner";

import { Product } from "@/Types/Product";

interface CurvedCarouselProps {
  products: Product[];
}

export default function CurvedCarousel({
  products,
}: CurvedCarouselProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const cardRefs = useRef<
    (HTMLDivElement | null)[]
  >([]);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  /* =========================================================
     CARD DEPTH

     Calculates how far each card is from the center.
     Center = large
     Near center = medium
     Far away = smaller
  ========================================================= */

  const updateCardDepth = () => {
    const container = sliderRef.current;

    if (!container) return;

    const containerRect =
      container.getBoundingClientRect();

    const centerX =
      containerRect.left +
      containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();

      const cardCenter =
        rect.left + rect.width / 2;

      const distance = Math.abs(
        centerX - cardCenter,
      );

      /* Find current center card */
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }

      /*
       * Normalize distance.
       *
       * 0 = center
       * 1 = far away
       */
      const maxDistance =
        containerRect.width * 0.55;

      const normalizedDistance = Math.min(
        distance / maxDistance,
        1,
      );

      /*
       * Scale:
       *
       * Center       → 1.00
       * Near center  → ~0.93
       * Far away     → ~0.82
       */
      const scale =
        1 -
        normalizedDistance * 0.18;

      /*
       * Slight vertical movement creates
       * the front/back feeling.
       */
      const translateY =
        normalizedDistance * 12;

      /*
       * Slight opacity difference gives
       * additional depth.
       */
      const opacity =
        1 -
        normalizedDistance * 0.25;

      card.style.transform = `
        translateY(${translateY}px)
        scale(${scale})
      `;

      card.style.opacity =
        opacity.toString();
    });

    setActiveIndex(closestIndex);
  };

  /* =========================================================
     SCROLL
  ========================================================= */

  const handleScroll = () => {
    requestAnimationFrame(updateCardDepth);
  };

  /* =========================================================
     POINTER DRAGGING

     This intentionally uses Pointer Events rather than
     mouse events.

     It works with:
     - Mouse
     - Touch
     - Pen
     - Trackpad where pointer input is available
  ========================================================= */

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const container = sliderRef.current;

    if (!container) return;

    /*
     * Only primary pointer.
     */
    if (!event.isPrimary) return;

    isDragging.current = true;

    startX.current = event.clientX;

    startScrollLeft.current =
      container.scrollLeft;

    setDragging(true);

    /*
     * Capture the pointer so dragging continues
     * even when the pointer leaves the carousel.
     */
    container.setPointerCapture(
      event.pointerId,
    );
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const container = sliderRef.current;

    if (!container || !isDragging.current) {
      return;
    }

    const distance =
      event.clientX - startX.current;

    /*
     * Multiply movement slightly to make
     * the carousel feel responsive.
     */
    container.scrollLeft =
      startScrollLeft.current -
      distance * 1.15;

    event.preventDefault();
  };

  const stopDragging = (
    event?: React.PointerEvent<HTMLDivElement>,
  ) => {
    const container = sliderRef.current;

    if (!container) return;

    isDragging.current = false;

    setDragging(false);

    if (
      event &&
      container.hasPointerCapture(
        event.pointerId,
      )
    ) {
      container.releasePointerCapture(
        event.pointerId,
      );
    }

    /*
     * Snap to the nearest card after releasing.
     */
    requestAnimationFrame(() => {
      snapToNearestCard();
    });
  };

  /* =========================================================
     SNAP TO CENTER

     After dragging stops, find the closest card
     and smoothly bring it to the center.
  ========================================================= */

  const snapToNearestCard = () => {
    const container = sliderRef.current;

    if (!container) return;

    const containerRect =
      container.getBoundingClientRect();

    const centerX =
      containerRect.left +
      containerRect.width / 2;

    let closestCard: HTMLDivElement | null =
      null;

    let closestDistance = Infinity;

    cardRefs.current.forEach((card) => {
      if (!card) return;

      const rect =
        card.getBoundingClientRect();

      const cardCenter =
        rect.left + rect.width / 2;

      const distance = Math.abs(
        centerX - cardCenter,
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });

    if (!closestCard) return;

    const cardRect =
      (closestCard as HTMLDivElement).getBoundingClientRect();

    const cardCenter =
      cardRect.left + cardRect.width / 2;

    const adjustment =
      cardCenter - centerX;

    container.scrollBy({
      left: adjustment,
      behavior: "smooth",
    });
  };

  /* =========================================================
     INITIALIZE
  ========================================================= */

  useEffect(() => {
    const frame =
      requestAnimationFrame(
        updateCardDepth,
      );

    return () =>
      cancelAnimationFrame(frame);
  }, [products]);

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    toast.success(
      `${product.name || "Product"} added to cart`,
    );
  };

  if (!products?.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-2">

      {/* =====================================================
          HEADER
      ===================================================== */}

      {/* <div className="mx-auto max-w-375 px-5 sm:px-8 lg:px-12">
        <div className="mb-8 text-center sm:mb-12">

          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-[#889551]
            "
          >
            Our Collection
          </p>

          <h2
            className="
              mt-2
              font-serif
              text-4xl
              italic
              leading-none
              text-[#0E4001]
              sm:text-5xl
              lg:text-6xl
            "
          >
            Featured Brassware
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-md
              text-[10px]
              leading-5
              text-[#0E4001]/50
              sm:text-[11px]
            "
          >
            Discover timeless brass pieces crafted
            for everyday rituals.
          </p>

        </div>
      </div> */}

      {/* =====================================================
          CAROUSEL
      ===================================================== */}

      <div
        ref={sliderRef}
        onScroll={handleScroll}

        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={(event) => {
          /*
           * Do not immediately stop dragging when the
           * pointer leaves the visible area because
           * pointer capture keeps the interaction alive.
           */
          if (
            isDragging.current &&
            sliderRef.current?.hasPointerCapture(
              event.pointerId,
            )
          ) {
            return;
          }
        }}

        className={`
          flex
          snap-x
          snap-mandatory
          gap-4
          overflow-x-auto
          overflow-y-visible
          py-8
          no-scrollbar
          overscroll-x-contain
          select-none
          sm:gap-5
          lg:gap-7
          ${
            dragging
              ? "cursor-grabbing"
              : "cursor-grab"
          }
        `}

        style={{
          /*
           * Allow vertical page scrolling while
           * our Pointer Events handle horizontal dragging.
           */
          touchAction: "pan-y",
          scrollbarWidth: "none",
          paddingLeft:
            "max(calc((100vw - 270px) / 2), 20px)",
          paddingRight:
            "max(calc((100vw - 270px) / 2), 20px)",
        }}
      >

        {products.map((product, index) => {
          const variant =
            product?.variants?.[0];

          const image =
            variant?.images?.[0];

          return (
            <div
              key={product.Productid}
              ref={(element) => {
                cardRefs.current[index] =
                  element;
              }}
              className="
                relative
                w-67.5
                min-w-67.5
                shrink-0
                snap-center
                transform-gpu
                transition-[transform,opacity]
                duration-300
                ease-out
                sm:w-82.5
                sm:min-w-82.5
              "
            >

              {/* =================================================
                  CARD
              ================================================= */}

              <div
                className="
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-[#0E4001]/10
                  bg-[#F4F2DD]
                  shadow-[0_15px_45px_rgba(14,64,1,0.10)]
                "
              >

                {/* =============================================
                    IMAGE
                ============================================= */}

                <Link
                  href={`/productsdetail/${product.Productid}`}
                  draggable={false}
                  onClick={(event) => {
                    /*
                     * Prevent accidental navigation after
                     * a drag gesture.
                     */
                    if (dragging) {
                      event.preventDefault();
                    }
                  }}
                >
                  <div className="relative p-2.5 pb-0">

                    <div
                      className="
                        relative
                        aspect-[1.03]
                        overflow-hidden
                        rounded-[23px]
                        bg-[#C8D2AE]
                      "
                    >

                      {image ? (
                        <Image
                          src={image}
                          alt={
                            product.name ||
                            "Brass product"
                          }
                          fill
                          draggable={false}
                          sizes="
                            (max-width: 640px) 270px,
                            (max-width: 1024px) 330px,
                            390px
                          "
                          className="
                            pointer-events-none
                            select-none
                            object-contain
                            p-5
                            drop-shadow-[0_18px_15px_rgba(14,64,1,0.18)]
                            transition-transform
                            duration-700
                            ease-out
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-full
                            items-center
                            justify-center
                            text-[8px]
                            uppercase
                            tracking-[0.2em]
                            text-[#0E4001]/50
                          "
                        >
                          Brassware
                        </div>
                      )}

                      {/* Image highlight */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-linear-to-br
                          from-white/16
                          via-transparent
                          to-[#0E4001]/10
                        "
                      />

                      {/* Category */}
                      <span
                        className="
                          absolute
                          left-4
                          top-4
                          rounded-full
                          bg-[#F4F2DD]/90
                          px-3
                          py-1.5
                          text-[7px]
                          uppercase
                          tracking-[0.18em]
                          text-[#0E4001]
                          backdrop-blur-md
                        "
                      >
                        {product.category ||
                          "Brassware"}
                      </span>

                      {/* Favourite */}
                      <button
                        type="button"
                        aria-label="Add to favourites"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        className="
                          absolute
                          right-4
                          top-4
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          bg-[#F4F2DD]/90
                          text-[#0E4001]
                          backdrop-blur-md
                        "
                      >
                        <FiHeart
                          size={15}
                          strokeWidth={1.5}
                        />
                      </button>

                      {/* Product number */}
                      <span
                        className="
                          absolute
                          bottom-4
                          left-4
                          font-serif
                          text-sm
                          italic
                          text-[#0E4001]/50
                        "
                      >
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </span>

                    </div>
                  </div>

                  {/* =============================================
                      INFORMATION
                  ============================================= */}

                  <div
                    className="
                      px-5
                      pb-5
                      pt-4
                      sm:px-6
                      sm:pb-6
                    "
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <h3
                          className="
                            truncate
                            font-serif
                            text-[21px]
                            italic
                            leading-tight
                            text-[#0E4001]
                            sm:text-[24px]
                          "
                        >
                          {product.name}
                        </h3>

                        {variant?.capacity !==
                          undefined && (
                          <p
                            className="
                              mt-1
                              text-[9px]
                              text-[#889551]
                            "
                          >
                            {variant.capacity} ml
                          </p>
                        )}

                      </div>

                      <span
                        className="
                          shrink-0
                          pt-1
                          text-sm
                          text-[#0E4001]/40
                        "
                      >
                        ↗
                      </span>

                    </div>

                    {/* Description */}

                    <p
                      className="
                        mt-3
                        line-clamp-2
                        text-[10px]
                        leading-5
                        text-[#0E4001]/50
                      "
                    >
                      {product?.description ||
                        "Thoughtfully crafted brassware for everyday rituals."}
                    </p>

                    {/* Rating */}

                    <div className="mt-4 flex items-center gap-2">

                      <span className="text-[11px] text-[#889551]">
                        ★
                      </span>

                      <span className="text-[9px] text-[#0E4001]/55">
                        4.8
                      </span>

                      <span className="text-[9px] text-[#0E4001]/30">
                        · Handcrafted
                      </span>

                    </div>

                    {/* Price */}

                    <div className="mt-4">

                      {variant?.price !==
                        undefined && (
                        <span
                          className="
                            font-serif
                            text-[23px]
                            italic
                            text-[#0E4001]
                          "
                        >
                          ₹{variant.price}
                        </span>
                      )}

                    </div>

                  </div>
                </Link>

                {/* =============================================
                    CART
                ============================================= */}

                <div className="px-5 pb-5 sm:px-6 sm:pb-6">

                  <button
                    type="button"
                    onClick={(event) =>
                      handleAddToCart(
                        event,
                        product,
                      )
                    }
                    className="
                      flex
                      h-11
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#0E4001]
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.14em]
                      text-[#F4F2DD]
                      transition
                      hover:bg-[#355B2A]
                      active:scale-[0.98]
                    "
                  >
                    <FiShoppingBag size={14} />
                    Add to Cart
                  </button>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          INDICATORS
      ===================================================== */}

      {/* =====================================================
    INSTAGRAM-STYLE PAGINATION DOTS

    - Supports any number of products.
    - Shows a maximum of 7 dots.
    - Active dot is ALWAYS visible.
    - The visible dot window moves as the active
      product changes.
===================================================== */}

{products.length > 1 && (
  <div className="mt-3 flex items-center justify-center gap-1.5">
    {(() => {
      const MAX_VISIBLE_DOTS = 7;

      /*
       * If there are 7 or fewer products,
       * simply show every dot.
       */
      if (products.length <= MAX_VISIBLE_DOTS) {
        return products.map((_, index) => (
          <span
            key={index}
            className={`
              rounded-full
              transition-all
              duration-300
              ${
                index === activeIndex
                  ? "h-1.5 w-5 bg-[#889551]"
                  : "h-1.5 w-1.5 bg-[#0E4001]/20"
              }
            `}
          />
        ));
      }

      /*
       * For more than 7 products, keep the active
       * dot inside a moving 7-dot window.
       */
      const halfWindow = Math.floor(
        MAX_VISIBLE_DOTS / 2,
      );

      let startIndex =
        activeIndex - halfWindow;

      /*
       * Don't allow the window to go before
       * the first product.
       */
      if (startIndex < 0) {
        startIndex = 0;
      }

      /*
       * Don't allow the window to go beyond
       * the last product.
       */
      if (
        startIndex + MAX_VISIBLE_DOTS >
        products.length
      ) {
        startIndex =
          products.length - MAX_VISIBLE_DOTS;
      }

      const visibleProducts = products.slice(
        startIndex,
        startIndex + MAX_VISIBLE_DOTS,
      );

      return visibleProducts.map((_, dotIndex) => {
        const actualIndex =
          startIndex + dotIndex;

        const isActive =
          actualIndex === activeIndex;

        return (
          <span
            key={actualIndex}
            className={`
              rounded-full
              transition-all
              duration-300
              ${
                isActive
                  ? "h-1.5 w-5 bg-[#889551]"
                  : "h-1.5 w-1.5 bg-[#0E4001]/20"
              }
            `}
          />
        );
      });
    })()}
  </div>
)}
    </section>
  );
}