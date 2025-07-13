'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/src/context/CartContext';
import { useState } from 'react';
import axios from 'axios';

export default function CartPage() {
  const { cart, removeCart, getCart } = useCart();
  const router = useRouter();
  const items = Array.isArray(cart) ? cart : [];
  const [loading, setLoading] = useState(false);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/updateQuntatiy`,
        { productId, quantity: newQuantity },
        {
          headers: { token: localStorage.getItem('token') },
        }
      );
      if (data.success) getCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#111827]">
        🛒 سلة المشتريات
      </h2>

      {loading && (
        <div className="text-center text-gray-500 mb-6 animate-pulse">
          يتم تحديث السلة...
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          💤 سلتك فاضية حالياً
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center gap-6 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300"
              >
                <div className="w-32 h-32 relative rounded-xl overflow-hidden shadow">
                  <img
                    src={
                      item.images?.[0]
                        ? `${process.env.NEXT_PUBLIC_API_URL}${item.images[0]}`
                        : '/fallback.jpg'
                    }
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-semibold text-[#1f2937]">{item.name}</h3>
                  <p className="text-gray-600 capitalize">الحجم: {item.size}</p>
                  <p className="text-gray-800 font-medium">السعر: {item.price.toFixed(2)} جنيه</p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1 || loading}
                      className="w-8 h-8 text-xl flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
                    >
                      −
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      disabled={loading}
                      className="w-8 h-8 text-xl flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-[#F97316] font-semibold">
                    الإجمالي: {(item.price * item.quantity).toFixed(2)} جنيه
                  </p>

                  <button
                    onClick={() => removeCart(item._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    ❌ إزالة المنتج
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-right border-t pt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              الإجمالي الكلي: <span className="text-green-600">{totalPrice.toFixed(2)} جنيه</span>
            </h3>
            <button
              onClick={() => router.push('/checkout')}
              className="bg-green-600 hover:bg-green-700 text-white text-lg font-medium px-6 py-3 rounded-xl shadow transition"
            >
              ✅ إتمام الطلب
            </button>
          </div>
        </>
      )}
    </div>
  );
}
