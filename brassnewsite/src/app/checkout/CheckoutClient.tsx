/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type CartItem = {
  price: number;
  qty: number;
  [key: string]: unknown;
};

export default function CheckoutClient() {
  const router = useRouter();

  // Replace with your actual cart data
  const cartItems: CartItem[] = [];

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
    paymentMethod: "COD",
  });

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (acc: number, item: any) => acc + item.price * item.qty,
      0
    );
  }, [cartItems]);

  const shippingCharge = subtotal > 999 ? 0 : 99;
  const discount = 0;

  const totalAmount =
    subtotal + shippingCharge - discount;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim())
      return "Full name required";

    if (!formData.email.trim())
      return "Email required";

    if (!formData.phone.trim())
      return "Phone required";

    if (!formData.address.trim())
      return "Address required";

    if (!formData.city.trim())
      return "City required";

    if (!formData.state.trim())
      return "State required";

    if (!formData.pincode.trim())
      return "Pincode required";

    return null;
  };

  const handlePlaceOrder = async () => {
    const error = validateForm();

    if (error) {
      alert(error);
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/orders",
        {
          // replace with actual user._id
          userId: "USER_ID",

          items: cartItems,

          subtotal,
          shippingCharge,
          discount,
          totalAmount,

          paymentMethod:
            formData.paymentMethod,

          deliveryAddress: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },

          notes: formData.notes,
        }
      );

      if (response.data.success) {
        router.push(
          `/order-success?id=${response.data.order.orderNumber}`
        );
      }
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f4f2dd] min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#889551] mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 dark:bg-white bg-[#e4e198] text-black rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">
              Contact Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg p-3 md:col-span-2"
              />
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              Delivery Address
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="border rounded-lg p-3 md:col-span-2"
              />

              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="border rounded-lg p-3 md:col-span-2"
              />
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              Order Notes
            </h2>

            <textarea
              name="notes"
              rows={4}
              placeholder="Additional instructions..."
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <h2 className="text-xl font-semibold mt-8 mb-4">
              Payment Method
            </h2>

            <div className="border rounded-lg p-4 bg-[#f4f2dd]">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  checked
                  readOnly
                />
                Cash On Delivery
              </label>
            </div>
          </div>

          {/* Right */}
          <div className="dark:bg-white bg-[#e4e198] text-black rounded-xl p-6 shadow h-fit sticky top-6">
            <h2 className="text-xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 max-h-80 overflow-y-auto">
              {cartItems.map(
                (item: any, index: number) => (
                  <div
                    key={index}
                    className="border-b pb-3"
                  >
                    <p className="font-medium">
                      {item.title}
                    </p>

                    {(item.capacity ||
                      item.weight) && (
                      <p className="text-sm text-gray-500">
                        {item.capacity &&
                          `${item.capacity}ml `}
                        {item.weight &&
                          `${item.weight}g`}
                      </p>
                    )}

                    <div className="flex justify-between mt-1">
                      <span>
                        Qty: {item.qty}
                      </span>

                      <span>
                        ₹
                        {item.price *
                          item.qty}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="border-t mt-6 pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  ₹{shippingCharge}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>
                  -₹{discount}
                </span>
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Total</span>
                <span>
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full mt-6 bg-[#889551] hover:bg-[#738044] text-white py-3 rounded-lg font-medium transition"
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}