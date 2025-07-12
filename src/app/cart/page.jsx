'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/src/context/CartContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';


export default function CartPage() {
    <Head>
  <title>Your Cart - My Shop</title>
  <meta name="robots" content="noindex" />
</Head>
  const { cart, removeCart, getCart } = useCart();
  const router = useRouter();
  const items = Array.isArray(cart) ? cart : [];

  const [loading, setLoading] = useState(false);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      setLoading(true);
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/updateQuntatiy`, {
        productId,
        quantity: newQuantity,
      }, {
        headers: { token: localStorage.getItem("token") }
      });
      if (data.success) getCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">🛒 Shopping Cart</h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item._id} className="flex flex-col md:flex-row items-center gap-4 border p-4 rounded-lg shadow">
                <div className="w-32 h-32 relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${item.images[0]}`}
                    alt={item.name}
                    layout="fill"
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="capitalize">Size: {item.size}</p>
                  <p>Price: ${item.price?.toFixed(2)}</p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1 || loading}
                      className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      disabled={loading}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>

                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>

                  <button
                    onClick={() => removeCart(item._id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <h3 className="text-xl font-bold mb-4">Total: ${totalPrice.toFixed(2)}</h3>
            <button
              onClick={() => router.push('/checkout')}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              ✅ Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
