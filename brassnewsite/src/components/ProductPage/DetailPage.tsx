"use client";

import { Product } from "@/Types/Product";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const DetailPage = ({ product }: { product?: Product }) => {
  const [variant, setVariant] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const variantActive = product?.variants?.[variant];
  const images = variantActive?.images || [];

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <main className="flex-col flex gap-15">
      {/* BREADCRUMB */}
      <nav className="flex px-5 text-xl bg-white h-15">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
          </li>
          <li>{">"}</li>

          <li>
            <Link
              href={`/${product?.category?.toLowerCase()}`}
              className="hover:text-black transition capitalize"
            >
              {product?.category || "Category"}
            </Link>
          </li>

          {product?.subcategory && (
            <>
              <li>{">"}</li>
              <li>
                <Link
                  href={`/${product?.category?.toLowerCase()}?subcategory=${product.subcategory}`}
                  className="hover:text-black transition capitalize"
                >
                  {product?.subcategory}
                </Link>
              </li>
            </>
          )}

          <li>{">"}</li>
          <li className="text-[#889551] font-medium line-clamp-1">
            {product?.name || "Product"}
          </li>
        </ol>
      </nav>

      {/* PRODUCT DETAILS */}
      <div className="lg:flex mx-5">
        {/* LEFT SIDE */}
        <div className="flex flex-col">
          {/* IMAGE SLIDER */}
          <div className="relative md:self-center w-[550px] overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentImage * 550}px)` }}
            >
              {images.map((src, ind) => (
                <Image
                  key={ind}
                  src={src}
                  alt=""
                  width={550}
                  height={878}
                  className="rounded-2xl shrink-0"
                />
              ))}
            </div>

            {/* ARROWS */}
            <div
              className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={prevImage}
            >
              <IoIosArrowBack size={48} color="#889551" />
            </div>

            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={nextImage}
            >
              <IoIosArrowForward size={48} color="#889551" />
            </div>
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-2 mt-2">
            {images.map((_, ind) => (
              <div
                key={ind}
                onClick={() => setCurrentImage(ind)}
                className={`h-3 w-3 rounded-full cursor-pointer ${
                  ind === currentImage ? "bg-[#889551]" : "bg-[#e4e198]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex-col flex gap-5 p-10">
          <div className="head-font text-8xl font-">{product?.name}</div>
          <div className="text-3xl descrip-font">{product?.description}</div>
          <div className="flex text-2xl gap-1">
            <div className="inter">Capacity:</div>
            <div className="inter">{variantActive?.capacity}ml</div>
          </div>
          <div className="inter">
            <div className="w-full flex gap-5">
              {product?.variants?.map((p, ind) => {
                return (
                  <span
                    onClick={() => {
                      setVariant(ind);
                    }}
                    className={`border rounded-lg text-[#889551] text-center p-2 w-full ${ind === variant ? "border-2" : ""}`}
                    key={ind}
                  >
                    {p?.capacity}ml
                  </span>
                );
              })}
            </div>
          </div>
          <div className="inter text-5xl mt-3">
            ${variantActive?.price}
            <div className="text-lg">Inclusive of All Taxes</div>
          </div>
          <div className="mt-5 flex gap-4">
            <span className="text-2xl bg-[#889551] shadow-[0_3px_10px_#000000] lg:hover:shadow-[0_0_0] lg:hover:translate-y-1 transition-all duration-300 text-white rounded-full p-5 text-center w-full">
              Add to Cart
            </span>
            <span className="text-2xl bg-[#e4e198] shadow-[0_3px_10px_#000000] lg:hover:shadow-[0_0_0] lg:hover:translate-y-1 transition-all duration-300 text-[#889551] rounded-full p-5 text-center w-full">
              Buy Now
            </span>
          </div>
          <div className="flex flex-wrap gap-8 text-2xl">
            <li className="text-[#889551]">
              <span className="text-black inter">Handcrafted</span>
            </li>
            <li className="text-[#889551]">
              <span className="text-black inter">100% Pure Brass</span>
            </li>
            <li className="text-[#889551]">
              <span className="text-black inter">Plastic-Free</span>
            </li>
          </div>
          <div>
            <div className="p-1 text-xl font-light flex items-center gap-1 w-full inter">
              <Image src={"/Assets/Icons/image.png"} alt="" width={40} height={40} /> Free delivery on
              orders over $50
            </div>
            <div className="p-1 text-xl font-light flex items-center gap-1 w-full inter">
              <FiRefreshCcw /> 30-day easy returns & exchanges
            </div>
          </div>
        </div>
      </div>
      {/* Static Data */}

      <div className="static-content mx-auto flex justify-center text-3xl">
        &quot;Designed to support natural hydration while reducing everyday
        waste.&quot;
      </div>

      <div className="flex-col flex items-center">
        <div className="text-7xl inter">Health & Wellness Benefits</div>
        <div className="border rounded-2xl shadow-[0_0_10px_#000] p-4 m-5 flex justify-center flex-wrap gap-3 w-[80%] bg-[#e4e198]">
          <div className="w-[48%] p-10 font-bold inter text-xl border">
            <Image src={"/Assets/Icons/plant.png"} alt="" width={40} height={40} />
            Supports Better Digestion
            <div className="text-lg font-light pl-5">
              Naturally infused water may aid the digestive process
            </div>
          </div>
          <div className="w-[48%] p-10 font-bold inter text-xl border">
            <Image src={"/Assets/Icons/antibacterial.png"} alt="" width={40} height={40} />
            Naturally Antibacterial Properties
            <div className="text-lg font-light pl-5">
              Brass has inherent antimicrobial properties
            </div>
          </div>
          <div className="w-[48%] p-10 font-bold inter text-xl border">
            <Image src={"/Assets/Icons/drop.png"} alt="" width={40} height={40} />
            Helps Maintain Water Freshness
            <div className="text-lg font-light pl-5">
              Natural properties keep water pure and clean
            </div>
          </div>
          <div className="w-[48%] p-10 font-bold inter text-xl border">
            <Image src={"/Assets/Icons/ecology.png"} alt="" width={40} height={40} />
            Rooted in Traditional Wellness Practices
            <div className="text-lg font-light pl-5">
              Inspired by ancient Ayurvedic wisdom
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailPage;
