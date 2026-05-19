'use client'
import ProductCard from "@/components/ProductPage/ProductCard";
// import PipeSection from "@/components/UI/CurvedCarousel";
import { similarProducts } from "@/Demo/data/similarProduct";
// import React from 'react'

const page = () => {
  return (
    <div className="mx-auto w-[95%] dark:text-[#fdf2dd] text-[#000000]">
      {/* <div className="text-2xl px-3">You May Also Like</div> */}
      <div className="flex shrink-0 flex-wrap">
        {similarProducts.map((prod) => (
          <ProductCard key={`${prod.Productid}`} product={prod} />
        ))}
      </div>
      {/* test */}
      {/* <PipeSection /> */}
    </div>
  );
};

export default page;
