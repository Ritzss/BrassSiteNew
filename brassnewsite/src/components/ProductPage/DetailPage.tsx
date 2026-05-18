"use client";

import { Product } from "@/Types/Product";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { toast } from "sonner";
import ProductCard from "./ProductCard";
// import CurvedCarousel from "../UI/CurvedCarousel";
// import PipeSection from "../UI/CurvedCarousel";

const DetailPage = ({
  product,
  similarProduct,
}: {
  product?: Product;
  similarProduct?: Product[];
}) => {
  const [variant, setVariant] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [showCare, setShowCare] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const variantActive = product?.variants?.[variant];
  const images = variantActive?.images || [];

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleAddtoCart = () => {
    toast.success("Product Added to Cart");
  };

  const handleBuyNow = () => {
    toast.success("Buying Now....");
  };

  return (
    <main className="flex-col flex gap-15">
      {/* BREADCRUMB */}
      <nav className="cursor-default flex px-2 md:px-5 md:text-xl bg-white h-15">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
          </li>
          <li>{">"}</li>

          <li>
            <Link
              href={`productsdetail/${product?.category?.toLowerCase()}`}
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
        <div className="cursor-default flex flex-col">
          {/* IMAGE SLIDER */}
          <div className="hidden md:block dark:shadow-[7px_3px_5px_#e4e198] rounded-3xl rounded-t-[45px] relative md:self-center w-137.5 mx-auto overflow-hidden">
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
              <IoIosArrowBack
                className="scale-x-200 stroke-12 stroke-[#e4e198] w-[3vw]"
                size={48}
                color="#889551"
              />
            </div>

            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={nextImage}
            >
              <IoIosArrowForward
                className="scale-x-200 stroke-12 stroke-[#e4e198] w-[3vw]"
                size={48}
                color="#889551"
              />
            </div>
          </div>
          {/* Mobile Image Slider */}
          <div className="block md:hidden relative md:self-center w-[320px] mx-auto overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentImage * 320}px)` }}
            >
              {images.map((src, ind) => (
                <Image
                  key={ind}
                  src={src}
                  alt=""
                  width={320}
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
              <IoIosArrowBack
                className="scale-x-300 w-[4vw]"
                size={48}
                color="#889551"
              />
            </div>

            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={nextImage}
            >
              <IoIosArrowForward
                className="scale-x-300 w-[4vw]"
                size={48}
                color="#889551"
              />
            </div>
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-2 mt-2">
            {images.map((_, ind) => (
              <div
                key={ind}
                onClick={() => setCurrentImage(ind)}
                className={`h-3 w-3 rounded-full cursor-pointer ${
                  ind === currentImage
                    ? "bg-[#889551] dark:bg-[#e4e198]"
                    : "bg-[#e4e198] dark:bg-[#f4f2dd]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="cursor-default dark:text-[#f4f2dd] flex-col flex gap-5 p-5">
          <div className="head-font w-60 md:w-94 text-[2rem] dark:text-shadow-[4px_0_1px_#000000] md:text-[4rem]">
            {product?.name}
          </div>
          <div className="md:text-3xl descrip-font">{product?.description}</div>
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
                    className={`border rounded-lg text-[#889551] dark:text-[#f4f2dd] text-center p-2 w-full ${ind === variant ? "border-2" : "cursor-pointer"}`}
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
            <button
              onClick={handleAddtoCart}
              className="cursor-pointer text-xl md:text-2xl bg-[#889551] dark:bg-[#e4e198] lg:hover:shadow-[0_2px_10px_#000000af] shadow-[0_0_0] lg:hover:-translate-y-1 transition-all duration-300 text-white rounded-full py-4 md:p-5 text-center w-full"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="cursor-pointer text-xl md:text-2xl bg-[#E4E198] dark:bg-[#f4f2dd] lg:hover:shadow-[0_2px_10px_#000000af] shadow-[0_0_0] lg:hover:-translate-y-1 transition-all duration-300 text-[#889551] rounded-full py-4 md:p-5 text-center w-full"
            >
              Buy Now
            </button>
          </div>
          <div className="flex flex-wrap flex-col md:flex-row md:gap-8 text-2xl">
            <li className="text-[#889551] dark:text-[#e4e198]">
              <span className="text-black dark:text-[#fdf2dd] inter">
                Handcrafted
              </span>
            </li>
            <li className="text-[#889551] dark:text-[#e4e198]">
              <span className="text-black dark:text-[#fdf2dd] inter">
                100% Pure Brass
              </span>
            </li>
            <li className="text-[#889551] dark:text-[#e4e198]">
              <span className="text-black dark:text-[#fdf2dd] inter">
                Plastic-Free
              </span>
            </li>
          </div>
          <div>
            <div className="p-1 text-xl font-light flex items-center gap-1 w-full inter">
              <Image
                src={"/Assets/Icons/image.png"}
                alt=""
                width={40}
                height={40}
              />{" "}
              Free delivery on orders over $50
            </div>
            <div className="p-1 text-xl font-light flex items-center gap-1 w-full inter">
              <FiRefreshCcw /> 30-day easy returns & exchanges
            </div>
          </div>
        </div>
      </div>

      {/* Static Data */}

      {/* Quote */}
      <div className="text-center cursor-default dark:text-[#fdf2dd] text-[#889551] static-content w-full lg:w-[56%] mx-auto flex justify-center">
        &quot;Designed to support natural hydration{" "}
        <br className="md:hidden " /> while reducing everyday waste.&quot;
      </div>

      {/* Health & Wellness */}
      <div className="cursor-default dark:text-[#fdf2dd] flex-col flex items-center">
        <div className="md:text-7xl text-3xl inter text-center">
          Health & Wellness Benefits
        </div>
        <div className="rounded-2xl shadow-[0_4px_10px_#000000af] m-2 p-8 flex justify-center flex-wrap gap-3 w-[85%] bg-[#e4e198]">
          <div className="lg:w-[45%] h-fit flex items-center flex-wrap gap-1 m-2 font-bold inter">
            <Image
              src={"/Assets/Icons/plant.png"}
              alt=""
              width={30}
              height={40}
              className="hidden md:block"
            />
            <div className={`text-[#889551] text-lg`}>
              Supports Better Digestion Process
            </div>
            <div className="text-[#00000090] font-light lg:pl-12">
              Naturally infused water may aid the digestive process
            </div>
          </div>
          <div className="lg:w-[45%] h-fit flex items-center flex-wrap gap-1 m-2 font-bold inter">
            <Image
              src={"/Assets/Icons/antibacterial.png"}
              alt=""
              width={30}
              height={40}
              className="hidden md:block"
            />
            <div className={`text-[#889551] text-lg`}>
              {" "}
              Naturally Antibacterial Properties
            </div>
            <div className="text-[#00000090] font-light lg:pl-12">
              Brass has inherent antimicrobial properties
            </div>
          </div>
          <div className="lg:w-[45%] h-fit flex items-center flex-wrap gap-1 m-2 font-bold inter">
            <Image
              src={"/Assets/Icons/drop.png"}
              alt=""
              width={30}
              height={40}
              className="hidden md:block"
            />
            <div className={`text-[#889551] text-lg`}>
              Helps Maintain Water Freshness
            </div>
            <div className="text-[#00000090] font-light lg:pl-12">
              Natural properties keep water pure and clean
            </div>
          </div>
          <div className="lg:w-[45%] h-fit flex items-center flex-wrap gap-1 m-2 font-bold inter">
            <Image
              src={"/Assets/Icons/ecology.png"}
              alt=""
              width={30}
              height={40}
              className="hidden md:block"
            />
            <div className={`text-[#889551] text-lg`}>
              Rooted in Traditional Wellness Practices
            </div>
            <div className="text-[#00000090] font-light lg:pl-12">
              Inspired by ancient Ayurvedic wisdom
            </div>
          </div>
        </div>
      </div>

      {/* Why Brass? */}
      <div className="cursor-default inter flex flex-col lg:flex-row justify-center mx-auto w-[85%]">
        <div className="flex flex-col lg:w-[80%]">
          <div className="text-3xl md:text-5xl text-[#889551] dark:text-[#fdf2dd] h-fit w-full">
            Why Brass ?
          </div>
          <div className="px-4 flex items-center w-full">
            <div className="border-3 border-[#889551] bg-[#889551] dark:bg-[#fdf2dd] dark:border-[#fdf2dd] w-2 rounded-full h-20 md:h-30 lg:h-[85%]"></div>
            <div className="p-3 h-full md:text-3xl text-[#000000af] dark:text-[#fdf2dd]">
              Brass is a natural copper-zinc alloy that has been used in
              traditional wellness practices for thousands of years, valued for
              its unique mineral properties.
            </div>
          </div>
          <div className="px-4 flex items-center w-full">
            <div className="border-3 border-[#889551] bg-[#889551] dark:bg-[#fdf2dd] dark:border-[#fdf2dd] w-2 rounded-full h-20 md:h-30 lg:h-[85%]"></div>
            <div className="p-3 h-full md:text-3xl text-[#000000af] dark:text-[#fdf2dd]">
              Storing water in brass vessels is rooted in Ayurvedic traditions,
              where the subtle interactions between water and metal are believed
              to support balance and vitality.
            </div>
          </div>
        </div>
        <div>
          <Image
            src={"/Assets/Static/image.png"}
            alt=""
            width={310}
            height={353}
            className="hidden lg:block"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="cursor-default w-[85%] mx-auto">
        <div className="md:text-6xl text-3xl dark:text-[#fdf2dd] text-center inter">
          Product Details
        </div>
        <div className="flex flex-col lg:flex-row  lg:justify-center">
          <div className={`inter bg-[#e4e198] shadow-[0_4px_10px_#000000af] w-full lg:w-[48%] my-2 md:m-2 px-8 py-4 ${showDetails ? "rounded-4xl" : "rounded-2xl" }`}>
            <div className={`${showDetails ? "text-3xl mb-5" : "text-2xl"} md:text-5xl md:text-[#889551] flex justify-between items-center`} onClick={() => setShowDetails(!showDetails)}>
              Specifications
              <IoIosArrowDown
                className={`${showDetails ? "rotate-180" : "rotate-0"} trasnsition-all duration-500`}
              />
            </div>
            <div  className={`cursor-default overflow-hidden transition-all duration-500 ${showDetails ? "max-h-125 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="md:text-2xl px-1 py-4 flex justify-between lg:hover:text-[#889551] transition-all duration-300 border-b">
              <div>Material</div>
              <div>{product?.details?.material}</div>
            </div>
            <div className="md:text-2xl px-1 py-4 flex justify-between lg:hover:text-[#889551] transition-all duration-300 border-b">
              <div>Capacity</div>
              <div>{variantActive?.capacity}ml</div>
            </div>
            <div className="md:text-2xl px-1 py-4 flex justify-between lg:hover:text-[#889551] transition-all duration-300 border-b">
              <div>Finish</div>
              <div>{product?.details?.finish}</div>
            </div>
            <div className="md:text-2xl px-1 py-4 flex justify-between lg:hover:text-[#889551] transition-all duration-300 border-b">
              <div>Weight</div>
              <div>{variantActive?.weight}g</div>
            </div>
            <div className="md:text-2xl px-1 py-4 flex justify-between lg:hover:text-[#889551] transition-all duration-300 border-b">
              <div>Design</div>
              <div>{product?.details?.design}</div>
            </div>
            <div className="md:text-2xl px-1 py-4 flex justify-between lg:hover:text-[#889551] transition-all duration-300 border-b">
              <div>Sustainability</div>
              <div>{product?.details?.sustainability}</div>
            </div>
            </div>
          </div>
          <div
            className={`bg-[#e4e198] inter ${showFeatures ? "rounded-4xl" : "rounded-2xl" } px-8 py-4 shadow-[0_4px_10px_#000000af]  w-full lg:w-[48%] my-2 md:m-2 p-4"`}
          >
            <div
              className={`${showFeatures ? "text-3xl mb-5" : "text-2xl"} md:text-5xl md:text-[#889551] flex items-center justify-between`}
              onClick={() => setShowFeatures(!showFeatures)}
            >
              Key Features{" "}
              <IoIosArrowDown
                className={`${showFeatures ? "rotate-180" : "rotate-0"} trasnsition-all duration-500`}
              />
            </div>
            <div
              className={`cursor-default overflow-hidden transition-all duration-500 ${showFeatures ? "max-h-125 opacity-100" : "max-h-0 opacity-0"}`}
            >
              {product?.details?.features.map((feat, ind) => {
                return (
                  <div
                    key={ind}
                    className="flex md:text-2xl items-center group hover:text-[#889551] p-2 py-4 transition-colors duration-300"
                  >
                    <BsArrowReturnRight className="mr-3 text-black group-hover:text-[#889551] transition-colors duration-300" />
                    {feat}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Care Instructions*/}
      <div
        className=" shadow-[0_4px_10px_#000000af] inter rounded-2xl w-[80%] mx-auto bg-[#e4e198]"
        onClick={() => setShowCare(!showCare)}
      >
        <div className="cursor-pointer flex items-center justify-between p-5 text-2xl">
          <div className={``}>Care Instructions</div>
          <div
            className={`${showCare ? "rotate-180" : "rotate-0"} trasnsition-all duration-500`}
          >
            <IoIosArrowDown />
          </div>
        </div>
        <div
          className={`px-10 md:px-15 cursor-default overflow-hidden transition-all duration-500 ${showCare ? "max-h-125 opacity-100" : "max-h-0 opacity-0"}`}
        >
          {product?.details?.care?.map((care, ind) => {
            return (
              <div
                key={ind}
                className="flex md:text-2xl items-center group hover:text-[#889551] p-2 py-4 transition-all duration-300"
              >
                <BsArrowReturnRight className="mr-3 text-black group-hover:text-[#889551] transition-colors duration-300" />
                {care}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sustainability & Eco Impact */}
      <div>
        <div className="inter flex dark:text-[#fdf2dd] flex-col items-center gap-4 w-[85%] mx-auto">
          <div className="text-center md:text-6xl text-3xl">
            Sustainability & Eco Impact
          </div>
          <div className="text-xl md:text-2xl text-center font-light">
            Every conscious choice contributes to a healthier planet.
          </div>
          <div className="md:text-2xl lg:text-4xl dark:bg-[#e4e198] dark:text-black rounded-tl-[30px] lg:rounded-tl-[70px] rounded-br-[30px] lg:rounded-br-[70px] rounded-lg text-white bg-[#889551] p-6 text-center">
            Choosing a brass bottle means choosing to reduce waste, honor
            tradition, and invest in a product that serves you and the Earth for
            years to come.
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mx-auto w-[85%] dark:text-[#fdf2dd] text-[#000000]">
        <div className="text-2xl px-3">You May Also Like</div>
        <div className="flex shrink-0 overflow-x-auto no-scrollbar">
          {similarProduct
            ?.filter((prod) => prod.category == product?.category)
            .map((prod) => (
              <ProductCard key={`${prod.Productid}`} product={prod} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default DetailPage;
