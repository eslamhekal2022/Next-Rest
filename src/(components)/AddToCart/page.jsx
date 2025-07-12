"use client";
import { useCart } from "@/src/context/CartContext.js";
import { useHandleAddToCart } from "@/src/utilits/handleAddCart";

export default function AddToCartSection({ product }) {
  const { handleAddToCart } = useHandleAddToCart();
  const { addToWihsList } = useCart();

  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-3">
      <button
        onClick={() => handleAddToCart(product)}
        className="cursor-pointer flex-1 bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition duration-200 shadow-sm"
      >
         🛒 Add to Order
      </button>

      <button
        onClick={() => addToWihsList(product._id)}
        className=" cursor-pointer flex-1 bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition duration-200 shadow-sm"
      >
Love this ❤️
      </button>
    </div>
  );
}
