'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddReview() {
  const router = useRouter();
  const [form, setForm] = useState({ comment: '', rating: 5 });
  const [loading, setLoading] = useState(false);

  const ratings = useMemo(() => [1, 2, 3, 4, 5], []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!form.comment.trim()) {
        toast.warning('من فضلك أدخل تعليقك.');
        return;
      }

      setLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/addReviews`,
          form,
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          }
        );

        if (data.success) {
          toast.success('شكراً لمراجعتك!');
          setTimeout(() => router.push('/'), 1000);
        } else {
          toast.error('حدث خطأ أثناء الإرسال.');
        }
      } catch (err) {
        console.error(err);
        toast.error('فشل إرسال المراجعة.');
      } finally {
        setLoading(false);
      }
    },
    [form, router]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl space-y-4"
    >
      <h2 className="text-xl font-bold text-center">اترك تقييمك 📝</h2>
      <textarea
        name="comment"
        placeholder="ما رأيك في خدماتنا؟"
        value={form.comment}
        onChange={handleChange}
        className="w-full h-32 p-3 border border-gray-300 rounded resize-none"
        required
      />
      <select
        name="rating"
        value={form.rating}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        {ratings.map((num) => (
          <option key={num} value={num}>
            ⭐ {num}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition"
      >
        {loading ? 'جاري الإرسال...' : 'إرسال المراجعة'}
      </button>
    </form>
  );
}
