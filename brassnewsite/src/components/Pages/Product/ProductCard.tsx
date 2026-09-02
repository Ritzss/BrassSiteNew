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

  const variants = product?.variants ?? [];
  const variant = variants[selectedVariant] ?? variants[0];

  const productName = product?.name || "Brass Product";
  const productImage = variant?.images?.[0];

  /*
   * Soft brand backgrounds for the image area.
   * Each card gets a slightly different tone.
   */
  const imageThemes = [
    "#C5D0A9",
    "#D8D5A0",
    "#B5C095",
    "#889551",
  ];

  const imageBackground =
    imageThemes[index % imageThemes.length];

  /*
   * Product description.
   */
  const description =
    product?.details?.features[0] ||
    "Thoughtfully crafted brassware designed for everyday rituals.";

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
   * Change product variant without navigating
   * to the product detail page.
   */
  const handleVariantChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    variantIndex: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedVariant(variantIndex);
  };

  const price =
    variant?.price !== undefined
      ? Number(variant.price)
      : undefined;

  /*
   * Capacity is used as the variant label.
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
        overflow-hidden
        rounded-[26px]
        bg-[#F4F2DD]
        shadow-[0_12px_35px_rgba(14,64,1,0.12)]
        transition-all
        duration-500
        sm:rounded-[30px]
        sm:hover:-translate-y-1
        sm:hover:shadow-[0_22px_60px_rgba(14,64,1,0.18)]
      "
    >
      {/* =====================================================
          PRODUCT IMAGE
      ===================================================== */}
      <Link
        href={`/productsdetail/${product.Productid}`}
        className="block"
      >
        <div className="relative p-2 pb-0 sm:p-2.5 sm:pb-0">
          <div
            className="
              relative
              aspect-[0.95]
              overflow-hidden
              rounded-[20px]
              sm:aspect-[1.05]
              sm:rounded-[22px]
            "
            style={{
              backgroundColor: imageBackground,
            }}
          >
            {/* Product image */}
            {productImage ? (
              <Image
                src={productImage}
                alt={productName}
                fill
                sizes="
                  (max-width: 640px) 48vw,
                  (max-width: 1024px) 45vw,
                  30vw
                "
                className="
                  object-contain
                  p-3
                  drop-shadow-[0_12px_12px_rgba(14,64,1,0.18)]
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.035]
                  sm:p-5
                "
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-[8px] uppercase tracking-[0.18em] text-[#0E4001]">
                  Brass Product
                </span>
              </div>
            )}

            {/* Soft highlight */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-linear-to-br
                from-white/16
                via-transparent
                to-transparent
              "
            />

            {/* =================================================
                PRICE BADGE
            ================================================= */}
            {price !== undefined && (
              <div
                className="
                  absolute
                  -right-px
                  -top-px
                  flex
                  min-w-14.5
                  items-center
                  justify-center
                  rounded-bl-[17px]
                  rounded-tr-[20px]
                  bg-[#F4F2DD]
                  px-2.5
                  py-2
                  text-[#0E4001]
                  sm:min-w-18
                  sm:px-4
                  sm:py-3
                "
              >
                <span
                  className="
                    text-sm
                    font-medium
                    sm:font-serif
                    sm:text-lg
                    sm:italic
                  "
                >
                  ${price}
                </span>
              </div>
            )}

            {/* Category */}
            <span
              className="
                absolute
                bottom-2.5
                left-3
                rounded-full
                bg-[#F4F2DD]/85
                px-2.5
                py-1
                text-[7px]
                font-medium
                uppercase
                tracking-[0.16em]
                text-[#0E4001]
                backdrop-blur-md
                sm:bottom-3
                sm:left-4
                sm:px-3
                sm:py-1.5
                sm:text-[8px]
              "
            >
              {product.category || "Brassware"}
            </span>
          </div>
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
            sm:pt-4
          "
        >
          {/* Name + View */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2
                className="
                  truncate
                  font-serif
                  text-[18px]
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
                    sm:text-[10px]
                  "
                >
                  {getVariantLabel(variant)}
                </p>
              )}
            </div>

            {/* View product */}
            <span
              className="
                flex
                shrink-0
                items-center
                gap-0.5
                pt-1
                text-[7px]
                uppercase
                tracking-widest
                text-[#0E4001]/65
                sm:gap-1
                sm:text-[9px]
              "
            >
              View
              <span className="text-xs sm:text-sm">
                ↗
              </span>
            </span>
          </div>

          {/* Description */}
          <p
            className="
              mt-2
              line-clamp-2
              text-[9px]
              leading-[1.55]
              text-[#0E4001]/50
              sm:mt-3
              sm:text-[10px]
              sm:leading-[1.7]
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
                sm:mt-4
                sm:gap-3
              "
            >
              <span
                className="
                  shrink-0
                  text-[7px]
                  uppercase
                  tracking-[0.14em]
                  text-[#0E4001]
                  sm:text-[8px]
                "
              >
                Size
              </span>

              <div className="flex min-w-0 gap-1 sm:gap-1.5">
                {variants.map(
                  (currentVariant, variantIndex) => {
                    const active =
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
                          min-w-7.25
                          rounded-full
                          px-2
                          py-1
                          text-[7px]
                          transition-all
                          duration-300
                          sm:min-w-8.5
                          sm:px-2.5
                          sm:py-1.5
                          sm:text-[8px]
                          ${
                            active
                              ? "bg-[#0E4001] text-[#F4F2DD]"
                              : "bg-[#0E4001]/6 text-[#0E4001]/60 hover:bg-[#E4E198]"
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
              gap-2
              sm:mt-5
              sm:gap-3
            "
          >
            {/* Price */}
            <div className="flex items-baseline">
              {price !== undefined && (
                <span
                  className="
                    font-serif
                    text-[19px]
                    italic
                    leading-none
                    text-[#0E4001]
                    sm:text-[22px]
                  "
                >
                  ₹{price}
                </span>
              )}
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="
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
                hover:bg-[#355B2A]
                sm:rounded-xl
                sm:px-5
                sm:py-3
                sm:text-[9px]
                sm:tracking-[0.12em]
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