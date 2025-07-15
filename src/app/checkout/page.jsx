"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCart } from "@/src/context/CartContext.js";

export default function CheckoutPage() {
  const { cart, getCart } = useCart();
  const router = useRouter();
  const invoiceRef = useRef();

  const [redirectedToReview, setRedirectedToReview] = useState(false);

  const items = Array.isArray(cart) ? cart : [];
  const totalPrice = items.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleConfirmOrder = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkOut`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (data.success) {
       toast.success(
  <div>
    Order placed successfully ✅
    <br />
    <button
      onClick={() => {
        setRedirectedToReview(true);
        toast.dismiss();
        router.push("/AddReview");
      }}
      className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
    >
      ⭐ Rate the Restaurant
    </button>
    <br />
    <button
      onClick={() => {
        toast.dismiss();
        router.push("/");
      }}
      className="mt-2 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
    >
      🏠 Back to Home
    </button>
  </div>,
  { autoClose: false }
);


        getCart();
        router.push("/");
      } else {
        toast.error(data.message || "Checkout failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div ref={invoiceRef} id="invoice-section" className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Checkout Page 🧾</h2>

        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded"
                >
                  <span className="capitalize font-medium">
                    <strong>{item.name}</strong> ({item.size})
                  </span>
                  <span className="text-gray-700">
                    {item.quantity} × ${item.price?.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold">
              Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
            </h3>
          </>
        )}
      </div>

      {items.length > 0 && (
        <button
          className="mt-6 w-full bg-green-600 text-white py-3 rounded font-semibold text-lg hover:bg-green-700 transition"
          onClick={handleConfirmOrder}
        >
          ✅ Confirm Order
        </button>
      )}
    </div>
  );
}
