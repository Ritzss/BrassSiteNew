"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Product } from "@/Types/Product";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({
  product,
  index = 0,
}: ProductCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState(0);

  const variants = product?.variants || [];
  const variant = variants[selectedVariant] || variants[0];

  const productName = product?.name || "Brass Product";
  const productImage = variant?.images?.[0];

  /*
   * Brand-safe image backgrounds.
   * The lighter shades work especially well on mobile.
   */
/*
 * Each product gets a stable background based on its Productid.
 *
 * Using Productid instead of array index means:
 * - Product keeps the same color after sorting
 * - Product keeps the same color after filtering
 * - Product keeps the same color on different pages
 * - No repeated first-color problem caused by index = 0
 */
const cardColors = [
  "#B8B64A", // Brass Olive
  "#557A45", // Botanical Green
  "#C47A45", // Burnt Terracotta
  "#4F7180", // Deep Dusty Blue
  "#A85D68", // Muted Burgundy Rose
  "#C29A3A", // Antique Gold
  "#75638A", // Rich Dusty Purple
  "#B56A3C", // Copper Clay
  "#3F7465", // Deep Eucalyptus
  "#8A7042", // Bronze
  "#5E668C", // Slate Blue
  "#9B5B43", // Burnt Clay
  "#6F7F3E", // Moss
  "#B98232", // Brass Amber
  "#82556B", // Plum Rose
  "#46756D", // Teal Green
  "#A46A36", // Copper
  "#596F9A", // Denim Blue
  "#8C624D", // Walnut Clay
  "#A39A35", // Mustard Olive
];

/*
 * Convert Productid into a deterministic number.
 *
 * This avoids using Math.random(), which would cause
 * the same product to change color on every render.
 */
const getColorIndex = (id: string | number | undefined) => {
  const value = String(id);

  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash =
      (hash * 31 + value.charCodeAt(i)) |
      0;
  }

  return Math.abs(hash) % cardColors.length;
};

const backgroundColor = cardColors[
  getColorIndex(product.Productid)
];

/*
 * Light text is required for the darker backgrounds.
 */
const darkBackgrounds = [
  "#0E4001",
  "#667347",
  "#889551",
  "#8C8A58",
  "#71804D",
  "#596C3D",
  "#4D6238",
  "#748557",
  "#3F5A30",
];

const accentColor = darkBackgrounds.includes(
  backgroundColor,
)
  ? "#F4F2DD"
  : "#0E4001";

  /*
   * Product description.
   */
  const description =
    product?.description ||
    product?.details?.features[0] ||
    "Thoughtfully crafted brassware designed for timeless everyday use.";

  /*
   * Add to cart.
   */
  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    toast.success("Product Added to Cart");
  };

  /*
   * Change variant without navigating to the PDP.
   */
  const handleVariantChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    variantIndex: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedVariant(variantIndex);
  };

  /*
   * Current price.
   */
  const price =
    variant?.price !== undefined
      ? Number(variant.price)
      : undefined;

  /*
   * Support common old-price fields.
   */
  const variantWithOldPrice = variant as
    | (typeof variant & {
        originalPrice?: number;
        compareAtPrice?: number;
        oldPrice?: number;
      })
    | undefined;

  const originalPrice =
    variantWithOldPrice?.originalPrice ??
    variantWithOldPrice?.compareAtPrice ??
    variantWithOldPrice?.oldPrice;

  /*
   * Capacity label.
   */
  const getVariantLabel = (
    currentVariant: typeof variant,
  ) => {
    if (!currentVariant) return "";

    if (currentVariant.capacity !== undefined) {
      return `${currentVariant.capacity} ml`;
    }

    return "";
  };

  return (
    <article
      className="
        group
        w-full
        max-w-97.5
        overflow-hidden
        rounded-3xl
        bg-[#F4F2DD]
        shadow-[0_12px_35px_rgba(14,64,1,0.12)]
        transition-all
        duration-500

        sm:rounded-[28px]
        sm:hover:-translate-y-1
        sm:hover:shadow-[0_28px_70px_rgba(14,64,1,0.20)]
      "
    >
      <Link
        href={`/productsdetail/${product.Productid}`}
        className="block"
      >
        {/* =====================================================
            PRODUCT IMAGE
        ===================================================== */}
        <div
          className="
            relative
            h-57.5
            overflow-hidden

            sm:h-70
            md:h-77.5
          "
        >
          {/* =================================================
              CURVED IMAGE BACKDROP
          ================================================= */}
          <div
            className="
              absolute
              left-[-14%]
              top-[-6%]
              h-[75%]
              w-[128%]
              rounded-b-[48%]
              transition-transform
              duration-700

              sm:group-hover:scale-[1.03]
            "
            style={{
              backgroundColor,
            }}
          />

          {/* Soft highlight */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-6
              top-4
              h-16
              rounded-full
              bg-white/8
              blur-2xl

              sm:inset-x-8
              sm:top-5
              sm:h-24
            "
          />

          {/* =================================================
              CATEGORY
          ================================================= */}
          <div
            className="
              absolute
              left-4
              top-4
              z-20

              sm:left-6
              sm:top-5
            "
          >
            <span
              className="
                text-[7px]
                font-medium
                uppercase
                tracking-[0.2em]

                sm:text-[9px]
                sm:tracking-[0.24em]
              "
              style={{
                color: accentColor,
              }}
            >
              {product.category || "Brassware"}
            </span>
          </div>

          {/* =================================================
              PRODUCT IMAGE
          ================================================= */}
          <div
            className="
              absolute
              inset-x-5
              -bottom-2
              top-8
              z-10

              sm:inset-x-8
              sm:-bottom-2
              sm:top-10
            "
          >
            {productImage ? (
              <Image
                src={productImage}
                alt={productName}
                fill
                sizes="
                  (max-width: 640px) 92vw,
                  (max-width: 768px) 50vw,
                  390px
                "
                className="
                  object-contain
                  drop-shadow-[0_12px_14px_rgba(0,0,0,0.18)]
                  transition-transform
                  duration-700
                  ease-out

                  sm:drop-shadow-[0_18px_18px_rgba(0,0,0,0.20)]
                  sm:group-hover:scale-[1.045]
                "
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.18em]
                  "
                  style={{
                    color: theme.accent,
                  }}
                >
                  Brass Product
                </span>
              </div>
            )}
          </div>

          {/* =================================================
              PRODUCT NUMBER
          ================================================= */}
          {/* <span
            className="
              absolute
              right-4
              top-4
              z-20
              font-serif
              text-xs
              italic

              sm:right-6
              sm:top-5
              sm:text-sm
            "
            style={{
              color: theme.accent,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>*/}
        </div> 

        {/* =====================================================
            PRODUCT INFORMATION
        ===================================================== */}
        <div
          className="
            px-4
            pb-4
            pt-3

            sm:px-6
            sm:pb-6
            sm:pt-2
          "
        >
          {/* Product name */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2
                className="
                  truncate
                  font-serif
                  text-[19px]
                  italic
                  leading-tight
                  text-[#0E4001]

                  sm:text-[23px]
                "
              >
                {productName}
              </h2>

              {getVariantLabel(variant) && (
                <p
                  className="
                    mt-0.5
                    text-[9px]
                    text-[#889551]

                    sm:mt-1
                    sm:text-[11px]
                  "
                >
                  {getVariantLabel(variant)}
                </p>
              )}
            </div>

            {/* Mobile arrow */}
            <span
              className="
                shrink-0
                pt-0.5
                text-sm
                text-[#0E4001]/50

                sm:hidden
              "
            >
              ↗
            </span>
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}
          <p
            className="
              mt-2
              line-clamp-2
              text-[9px]
              leading-[1.6]
              text-[#0E4001]/50

              sm:mt-4
              sm:max-w-77.5
              sm:text-[11px]
              sm:leading-5
            "
          >
            {description}
          </p>

          {/* =================================================
              VARIANTS
          ================================================= */}
          {variants.length > 0 && (
            <div
              className="
                mt-3
                flex
                items-center
                gap-2

                sm:mt-5
                sm:gap-3
              "
            >
              <span
                className="
                  shrink-0
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.14em]
                  text-[#0E4001]

                  sm:text-[9px]
                  sm:tracking-[0.16em]
                "
              >
                Size
              </span>

              <div className="flex min-w-0 gap-1.5 overflow-x-auto no-scrollbar">
                {variants.map(
                  (currentVariant, variantIndex) => {
                    const isActive =
                      selectedVariant === variantIndex;

                    return (
                      <button
                        key={variantIndex}
                        type="button"
                        onClick={(event) =>
                          handleVariantChange(
                            event,
                            variantIndex,
                          )
                        }
                        className={`
                          flex
                          min-h-7
                          min-w-7.5
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          px-2
                          text-[8px]
                          transition-all
                          duration-300

                          sm:min-h-8
                          sm:min-w-9
                          sm:px-2.5
                          sm:text-[9px]

                          ${
                            isActive
                              ? "bg-[#0E4001] text-[#F4F2DD]"
                              : "bg-[#0E4001]/5 text-[#0E4001]/60 hover:bg-[#E4E198]"
                          }
                        `}
                      >
                        {currentVariant.capacity !==
                        undefined
                          ? currentVariant.capacity
                          : variantIndex + 1}
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          )}

          {/* =================================================
              PRICE + CART
          ================================================= */}
          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              gap-3

              sm:mt-6
              sm:items-end
            "
          >
            {/* Price */}
            <div className="flex min-w-0 items-baseline gap-2">
              {price !== undefined && (
                <span
                  className="
                    font-serif
                    text-[21px]
                    italic
                    leading-none
                    text-[#0E4001]

                    sm:text-[25px]
                  "
                >
                  ₹{price}
                </span>
              )}

              {originalPrice !== undefined &&
                Number(originalPrice) >
                  Number(price) && (
                  <span
                    className="
                      text-[9px]
                      text-[#0E4001]/35
                      line-through

                      sm:text-[11px]
                    "
                  >
                    ₹{originalPrice}
                  </span>
                )}
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="
                shrink-0
                rounded-[10px]
                bg-[#0E4001]
                px-3
                py-2.5
                text-[7px]
                font-medium
                uppercase
                tracking-[0.08em]
                text-[#F4F2DD]
                transition-all
                duration-300
                active:scale-95

                sm:rounded-xl
                sm:px-5
                sm:py-3
                sm:text-[10px]
                sm:tracking-[0.12em]
                sm:hover:bg-[#355B2A]
                sm:hover:shadow-[0_8px_25px_rgba(14,64,1,0.20)]
              "
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;