"use client";
import { useState } from "react";

export default function ProductButton() {
  const [quantity, setQuantity] = useState(0);

  const handleAddtoCart = () => {
    setQuantity(1);
  };

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity(0);
    }
  };

  return (
    <div className="w-full">
      {quantity === 0 ? (
        <button
          onClick={handleAddtoCart}
          className="cursor-pointer text-xl md:text-2xl bg-[#889551] dark:bg-[#e4e198] lg:hover:shadow-[0_2px_10px_#000000af] shadow-[0_0_0] lg:hover:-translate-y-1 transition-all duration-300 text-white rounded-full py-4 md:p-5 text-center w-full"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center justify-between bg-[#889551] text-white border rounded-full px-6 py-4 w-full">
          <button
            onClick={decreaseQty}
            className="text-2xl font-bold"
          >
            -
          </button>

          <span className="text-xl md:text-2xl font-semibold">
            {quantity}
          </span>

          <button
            onClick={increaseQty}
            className="text-2xl font-bold"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}