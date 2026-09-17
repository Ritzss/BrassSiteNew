"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "@/Context/AppContext";

type ProductButtonProps = {
  productId: string;
  capacity: number;
  color: string;
};

export default function ProductButton({
  productId,
  capacity,
  color,
}: ProductButtonProps) {
  const { addToCart, cartItems, removeFromCart } = useAppContext();

  // Find the exact product variant currently stored in the cart.
  const cartItem = cartItems.find(
    (item) =>
      item.productId === productId &&
      item.capacity === capacity &&
      item.color === color,
  );

  const quantity = cartItem?.qty ?? 0;

  const handleAddToCart = () => {
    addToCart(productId, capacity, color);
    toast.success("Added to Cart");
  };

  const increaseQty = () => {
    addToCart(productId, capacity, color);

    const newQuantity = quantity + 1;
    toast.success(`Quantity Increased to ${newQuantity}`);
  };

  const decreaseQty = () => {
    if (quantity <= 0) return;

    if (quantity === 1) {
      // Removing the last item removes this variant completely.
      removeFromCart(productId, capacity, color);
      toast.success("Removed from Cart");
      return;
    }

    /*
     * AppContext currently doesn't expose a decrement function.
     * Since removeFromCart removes the entire variant, we need
     * a dedicated decrement operation for proper quantity control.
     */
  };

  return (
    <div className="w-full">
      {quantity === 0 ? (
        <button
          onClick={handleAddToCart}
          className=" cursor-pointer text-xl md:text-2xl bg-[#889551] dark:bg-[#e4e198] text-white rounded-full py-4 md:p-5 text-center w-full shadow-[0_0_0] lg:hover:shadow-[0_2px_10px_#000000af] lg:hover:-translate-y-1 transition-all duration-300
          "
        >
          Add to Cart
        </button>
      ) : (
        <div
          className="
            flex items-center justify-between
            bg-[#889551]
            text-white
            border
            rounded-full
            px-6 py-4
            w-full
          "
        >
          <button
            onClick={decreaseQty}
            className="text-2xl font-bold"
            aria-label="Decrease quantity"
          >
            -
          </button>

          <span className="text-xl md:text-2xl font-semibold">
            {quantity}
          </span>

          <button
            onClick={increaseQty}
            className="text-2xl font-bold"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}