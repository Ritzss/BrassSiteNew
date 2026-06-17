/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

// import { IMSProduct } from "@/Types/Product";
// import { useRouter } from "next/router";
// import { useAppContext } from "@/hooks/useAppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiHeartFill } from "react-icons/ri";
import { toast } from "sonner";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Product } from "@/Types/Product";
import { useAppContext } from "@/Context/AppContext";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ProductQuickView = ({
  product,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: ProductQuickViewProps) => {
  const [selectedCapacity, setSelectedCapacity] = useState(
    product?.variants?.[0]?.capacity ?? 0,
  );
  const [activeImage, setActiveImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const router = useRouter();

  const {
    addToCart,
    removeFromCart,
    cartItems,
    favCollections,
    addToCollection,
    removeFromCollection,
  } = useAppContext();

  const selectedVariant =
    product?.variants?.find(
      (variant) => variant.capacity === selectedCapacity,
    ) || product?.variants?.[0];

  const productId = product?.Productid ?? "";

  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const isInCart = cartItems.some(
    (item: { productId: string; capacity: number | undefined; }) =>
      item.productId === productId &&
      item.capacity === selectedVariant?.capacity,
  );

  const collectionNames = Object.keys(favCollections);

  const isWishlisted = collectionNames.some((collectionName) =>
    // favCollections stores a Set of productIds for each collection
    Boolean((favCollections as unknown as Record<string, Set<string>>)[collectionName]?.has?.(productId)),
  );

  const handleWishlist = () => {
    const collectionNames = Object.keys(favCollections);

    if (selectedCollection) {
      removeFromCollection(productId);
      setSelectedCollection(null);
      return;
    }

    if (collectionNames.length > 0) {
      const defaultCollection = collectionNames[0];
      addToCollection(productId);
      setSelectedCollection(defaultCollection);
    }
  };

  useEffect(() => {
    if (!product) return;

    setSelectedCapacity(product?.variants?.[0]?.capacity ?? 0);
    setActiveImage(0);
  }, [product, product?.Productid]);

useEffect(() => {
  if (!isOpen) return;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "Escape") onClose();
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener(
      "keydown",
      handleKeyDown,
    );
  };
}, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !product) return null;

  const currentVariant =
    product.variants?.find(
      (variant) => variant.capacity === selectedCapacity,
    ) || product.variants?.[0];

  const activeImageIndex = currentVariant?.images?.[activeImage]
    ? activeImage
    : 0;

  const handleCartToggle = () => {
    if (!selectedVariant) return;

    if (isInCart) {
      removeFromCart(
        productId,
        selectedVariant.capacity,
        selectedVariant.color,
      );
    } else {
      addToCart(productId, selectedVariant.capacity, selectedVariant.color);
    }
  };

  const handleBuyNow = () => {
    if (!selectedVariant) return;

    router.push(
      `/checkout?buyNow=${productId}&productId=${productId}&capacity=${selectedVariant.capacity}&color=${selectedVariant.color}&qty=1`,
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) {
      onNext(); // swipe left
    }

    if (distance < -50) {
      onPrev(); // swipe right
    }

    setTouchStart(null);
  };

  return (
    <div
      className="fixed inset-0 z-9999 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 md:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative bg-white w-full max-w-7xl h-[95dvh] rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.25)] animate-in fade-in zoom-in-95 duration-300"
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-white shadow-md rounded-full p-2"
        >
          <X size={20} />
        </button>

        {/* PREV */}
        <button
          onClick={onPrev}
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-full p-3"
        >
          <ChevronLeft size={22} />
        </button>

        {/* NEXT */}
        <button
          onClick={onNext}
          className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-full p-3"
        >
          <ChevronRight size={22} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[42%_58%] h-full">
          {/* IMAGE */}
          <div className="relative bg-linear-to-br from-[#f8f4ef] to-[#efe7dc] h-[40vh] md:h-full overflow-hidden">
            {currentVariant?.mrp &&
              currentVariant.mrp > currentVariant.price && (
                <div className="absolute top-5 left-5 z-20 bg-black text-white px-4 py-2 rounded-full text-xs font-medium tracking-[0.15em] uppercase">
                  {Math.round(
                    ((currentVariant.mrp - currentVariant.price) /
                      currentVariant.mrp) *
                      100,
                  )}
                  % Off
                </div>
              )}

            <div className="relative h-[40vh] md:h-full overflow-hidden">
              {/* Blurred background */}
              {currentVariant?.images?.[activeImageIndex] && (
                <Image
                  src={currentVariant.images[activeImageIndex]}
                  alt=""
                  fill
                  className="object-cover blur scale-110 opacity-40"
                />
              )}

              {/* Main image */}
              <div className="absolute inset-0 flex items-center justify-center">
                {currentVariant?.images?.[activeImageIndex] && (
                  <Image
                    src={currentVariant.images[activeImageIndex]}
                    alt={product.name ?? ''}
                    fill
                    className="object-contain md:object-cover"
                  />
                )}
                {/* Wishlist */}
                <button
                  onClick={handleWishlist}
                  className=" absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-[#5f5143] hover:bg-[#889551] hover:text-white transition"
                >
                  {isWishlisted ? (
                    <RiHeartFill size={18} className="text-red-500" />
                  ) : (
                    <Heart size={18} />
                  )}
                </button>
              </div>
            </div>

            {(currentVariant?.images?.length ?? 0) > 1 && (
              <div className="absolute bottom-5 left-0 right-0 px-4 flex gap-2 overflow-x-auto justify-center">
                {currentVariant?.images?.map(
                  (
                    image: string | StaticImport,
                    index: SetStateAction<number>,
                  ) => (
                    <button
                      key={`${image}-${index}`}
                      onClick={() => setActiveImage(index)}
                      className={`relative h-14 w-14 rounded-lg overflow-hidden border-2 ${
                        activeImage === index
                          ? "border-[#889551]"
                          : "border-white"
                      }`}
                    >
                      <Image src={image} alt="" fill className="object-cover" />
                    </button>
                  ),
                )}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="flex flex-col overflow-y-auto p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9a8571]">
              {product.category}
            </p>

            <h2 className="mt-4 text-2xl sm:text-3xl md:text-5xl font-light tracking-tight text-[#2e2924]">
              {product.name}
            </h2>

            <div className="flex items-end gap-4 mt-6">
              <span className="text-2xl font-semibold text-[#3d342d]">
                ₹{currentVariant?.price}
              </span>

              {currentVariant?.mrp &&
                currentVariant.mrp > currentVariant.price && (
                  <span className="line-through text-gray-400">
                    ₹{currentVariant?.mrp}
                  </span>
                )}
            </div>

            <div className="flex gap-4 mt-4 text-sm text-[#6a5f55]">
              <span>Capacity: {currentVariant?.capacity} ML</span>

              <span>Weight: {currentVariant?.weight} g</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {/* {product.brand && (
                <span className="px-3 py-1 rounded-full bg-[#f5efe8] text-xs uppercase tracking-wider">
                  {product.brand}
                </span>
              )} */}

              <span className="px-3 py-1 rounded-full bg-[#f5efe8] text-xs uppercase tracking-wider">
                {currentVariant?.capacity} ML
              </span>

              <span className="px-3 py-1 rounded-full bg-[#f5efe8] text-xs uppercase tracking-wider">
                Premium
              </span>
            </div>

            {product.description && (
              <div className="mt-8">
                <p
                  className={`text-[#6a5f55] leading-8 text-[15px] transition-all duration-300 ${
                    showFullDescription ? "" : "line-clamp-4"
                  }`}
                >
                  {product.description}
                </p>

                {product.description.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-2 text-sm font-medium text-[#3d342d] hover:underline"
                  >
                    {showFullDescription ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
            )}

            {/* {product.variants.length > 1 && (
              <div className="mt-8">
                <h3 className="text-sm font-medium uppercase mb-3">Color</h3>

                <div className="flex flex-wrap gap-2">
                  {product.variants.map(
                    (
                      variant: { color: Key | null | undefined },
                      index: SetStateAction<number>,
                    ) => (
                      <button
                        key={variant.color}
                        onClick={() => {
                          setSelectedColor(index);
                          setSelectedSize("");
                          setActiveImage(0);
                        }}
                        className={`px-4 py-2 rounded-md border ${
                          selectedColor === index
                            ? "bg-[#889551] text-white border-white"
                            : "border-gray-300"
                        }`}
                      >
                        <>
                          {variant.color}
                          {selectedColor === index && (
                            <span className="ml-2">✓</span>
                          )}
                        </>
                      </button>
                    ),
                  )}
                </div>
              </div>
            )} */}

            {product?.variants && product.variants.length > 1 && (
              <div className="mt-8">
                <h3 className="text-sm font-medium uppercase mb-3">Capacity</h3>

                <div className="flex flex-wrap gap-2">
                  {product.variants?.map((variant) => (
                    <button
                      key={variant.capacity}
                      onClick={() => {
                        setSelectedCapacity(variant.capacity);
                        setActiveImage(0);
                      }}
                      className={`px-4 py-2 rounded-md border ${
                        selectedCapacity === variant.capacity
                          ? "bg-[#889551] text-white border-white"
                          : "border-gray-300"
                      }`}
                    >
                      {variant.capacity} ML
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* {currentVariant?.sizes?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-medium uppercase mb-3">Size</h3>

                <div className="flex flex-wrap gap-2">
                  {currentVariant.sizes.map(
                    (
                      size:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ((prevState: string) => string)
                        | optimisticKey
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
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
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-md border ${
                          selectedSize === size
                            ? "bg-[#889551] text-white border-white"
                            : "border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )} */}

            <Link
              href={`/product/${productId}`}
              className="inline-flex items-center mt-5 gap-2 text-sm font-medium text-[#3d342d] hover:gap-3 transition-all"
            >
              Explore The Product
              <span>→</span>
            </Link>

            {true ? (
              <div className="sticky bottom-0 bg-white border-t border-[#eee] pt-6 mt-8 flex md:flex-col gap-3">
                <button
                  onClick={handleCartToggle}
                  disabled={!selectedVariant}
                  className="w-full bg-[#889551] text-white py-4 rounded-xl tracking-wide hover:opacity-90 transition disabled:opacity-50"
                >
                  {isInCart ? "✓ Added To Bag" : "👜 Add To Bag"}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!selectedVariant}
                  className="w-full border border-[#2d2722] text-[#2d2722] py-4 rounded-xl hover:bg-[#2d2722] hover:text-white transition disabled:opacity-50"
                >
                  ⚡ Buy Instantly
                </button>
              </div>
            ) : (
              <div className="relative flex top-3 left-3">
                <button
                  onClick={() => {
                    toast.success("Will be notified when restocked");
                  }}
                  className="flex-1 flex justify-center py-4 rounded-full bg-[#5f5143] text-white hover:bg-[#889551] transition disabled:opacity-40"
                >
                  {`Notify Me When Available (Sold Out)`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
