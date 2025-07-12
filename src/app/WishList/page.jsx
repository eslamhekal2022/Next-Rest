'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHandleAddToCart } from '@/src/utilits/handleAddCart.js';
import { useCart } from '@/src/context/CartContext.js';

export default function WishList() {

  const { handleAddToCart } = useHandleAddToCart();
  const { wishList, removeWishList } = useCart();

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">Favorites List</h2>

      {wishList.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products in favorites</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishList.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center transition duration-300 hover:shadow-lg"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${product.images[0]}`}
                alt={product.name}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-orange-500 font-medium mt-2">{product.price} EGP</p>
              <div className="mt-4 flex flex-col gap-2 w-full">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
                  onClick={() => removeWishList(product._id)}
                >
                  Remove
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
                  onClick={() => handleAddToCart(product)}
                >
         🛒 Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
