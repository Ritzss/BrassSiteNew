/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
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
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );
  const [touchStart, setTouchStart] = useState<number | null>(null);

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

  const isInCart = cartItems.some(
    (item: { productId: string; capacity: number | undefined }) =>
      item.productId === productId &&
      item.capacity === selectedVariant?.capacity,
  );

  const collectionNames = Object.keys(favCollections);

  const isWishlisted = collectionNames.some((collectionName) =>
    Boolean(
      (
        favCollections as unknown as Record<string, Set<string>>
      )[collectionName]?.has?.(productId),
    ),
  );

  const handleWishlist = () => {
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
    setSelectedCapacity(product.variants?.[0]?.capacity ?? 0);
    setActiveImage(0);
    setShowFullDescription(false);
  }, [product, product?.Productid]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !product) return null;

  const currentVariant =
    product.variants?.find(
      (variant) => variant.capacity === selectedCapacity,
    ) || product.variants?.[0];

  const activeImageIndex = currentVariant?.images?.[activeImage] ? activeImage : 0;

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

    const distance = touchStart - e.changedTouches[0].clientX;

    if (distance > 50) onNext();
    if (distance < -50) onPrev();

    setTouchStart(null);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0E4001]/80 p-2 backdrop-blur-md md:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative grid h-[95dvh] w-full max-w-7xl grid-cols-1 overflow-hidden rounded-[2rem] border border-[#E4E198]/30 bg-[#F4F2DD] shadow-[0_30px_100px_rgba(14,64,1,.45)] md:grid-cols-[45%_55%]"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#E4E198] text-[#0E4001] shadow-lg transition hover:bg-[#0E4001] hover:text-[#E4E198]"
        >
          <X size={19} />
        </button>

        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 z-50 hidden -translate-y-1/2 rounded-full bg-[#F4F2DD]/90 p-3 text-[#0E4001] shadow-lg md:block"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 z-50 hidden -translate-y-1/2 rounded-full bg-[#F4F2DD]/90 p-3 text-[#0E4001] shadow-lg md:block"
        >
          <ChevronRight size={22} />
        </button>

        {/* Image panel */}
        <div className="relative h-[40vh] overflow-hidden bg-[#889551] md:h-full">
          {currentVariant?.images?.[activeImageIndex] && (
            <>
              <Image
                src={currentVariant.images[activeImageIndex]}
                alt=""
                fill
                className="object-cover opacity-30 blur-xl scale-110"
              />

              <Image
                src={currentVariant.images[activeImageIndex]}
                alt={product.name ?? ""}
                fill
                className="relative z-10 object-contain p-8 md:object-cover md:p-0"
              />
            </>
          )}

          <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0E4001]/55 via-transparent to-transparent" />

          <div className="absolute bottom-5 left-5 z-30">
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#E4E198]/80">
              VastraDrobe
            </p>
            <p className="mt-1 font-serif text-2xl italic text-[#F4F2DD]">
              Brass Collection
            </p>
          </div>

          <button
            onClick={handleWishlist}
            className="absolute right-5 top-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F2DD]/90 text-[#0E4001] shadow-lg backdrop-blur"
          >
            {isWishlisted ? (
              <RiHeartFill size={18} className="text-red-500" />
            ) : (
              <Heart size={18} />
            )}
          </button>

          {(currentVariant?.images?.length ?? 0) > 1 && (
            <div className="absolute bottom-5 right-5 z-40 flex max-w-[45%] gap-2 overflow-x-auto">
              {currentVariant?.images?.map(
                (
                  image: string | StaticImport,
                  index: SetStateAction<number>,
                ) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setActiveImage(index)}
                    className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 ${
                      activeImage === index
                        ? "border-[#E4E198]"
                        : "border-[#F4F2DD]/70"
                    }`}
                  >
                    <Image src={image} alt="" fill className="object-cover" />
                  </button>
                ),
              )}
            </div>
          )}
        </div>

        {/* Details panel */}
        <div className="flex flex-col overflow-y-auto p-6 md:p-10">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#0E4001]/45">
            {product.category}
          </p>

          <h2 className="mt-4 font-serif text-4xl italic leading-tight text-[#0E4001] sm:text-5xl">
            {product.name}
          </h2>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-serif text-3xl text-[#0E4001]">
              ₹{currentVariant?.price}
            </span>

            {currentVariant?.mrp &&
              currentVariant.mrp > currentVariant.price && (
                <span className="text-sm text-[#0E4001]/35 line-through">
                  ₹{currentVariant.mrp}
                </span>
              )}
          </div>

          <div className="mt-4 flex gap-5 text-xs uppercase tracking-[0.12em] text-[#0E4001]/55">
            <span>{currentVariant?.capacity} ML</span>
            <span>{currentVariant?.weight} G</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#E4E198] px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-[#0E4001]">
              {currentVariant?.capacity} ML
            </span>
            <span className="rounded-full bg-[#0E4001] px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-[#E4E198]">
              Premium Brass
            </span>
          </div>

          {product.description && (
            <div className="mt-8">
              <p
                className={`text-sm leading-7 text-[#0E4001]/65 ${
                  showFullDescription ? "" : "line-clamp-4"
                }`}
              >
                {product.description}
              </p>

              {product.description.length > 150 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 text-xs uppercase tracking-[0.15em] text-[#0E4001] underline underline-offset-4"
                >
                  {showFullDescription ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          )}

          {product.variants && product.variants.length > 1 && (
            <div className="mt-8">
              <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#0E4001]/55">
                Capacity
              </h3>

              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.capacity}
                    onClick={() => {
                      setSelectedCapacity(variant.capacity);
                      setActiveImage(0);
                    }}
                    className={`rounded-full border px-4 py-2 text-xs transition ${
                      selectedCapacity === variant.capacity
                        ? "border-[#0E4001] bg-[#0E4001] text-[#E4E198]"
                        : "border-[#0E4001]/20 text-[#0E4001] hover:border-[#0E4001]"
                    }`}
                  >
                    {variant.capacity} ML
                  </button>
                ))}
              </div>
            </div>
          )}

          <Link
            href={`/productsdetail/${productId}`}
            className="mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#0E4001]"
          >
            Explore the product <span>→</span>
          </Link>

          <div className="mt-auto flex flex-col gap-3 border-t border-[#0E4001]/10 bg-[#F4F2DD] pt-6">
            <button
              onClick={handleCartToggle}
              disabled={!selectedVariant}
              className="w-full rounded-full bg-[#0E4001] py-4 text-xs uppercase tracking-[0.18em] text-[#E4E198] transition hover:bg-[#889551] disabled:opacity-50"
            >
              {isInCart ? "✓ Added To Bag" : "👜 Add To Bag"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={!selectedVariant}
              className="w-full rounded-full border border-[#0E4001] py-4 text-xs uppercase tracking-[0.18em] text-[#0E4001] transition hover:bg-[#E4E198] disabled:opacity-50"
            >
              ⚡ Buy Instantly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
