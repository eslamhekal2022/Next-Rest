"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUser((prev) => ({ ...prev, image: file }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setUser((prev) => ({ ...prev, image: null }));
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(user).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.success) {
        localStorage.setItem("phone", user.phone);
        toast.success("تم التسجيل بنجاح ✅");
        router.push("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء التسجيل");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">تسجيل حساب جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="الاسم الكامل"
          value={user.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={user.email}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          value={user.password}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="number"
          name="phone"
          placeholder="رقم الهاتف"
          value={user.phone}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />

        {preview && (
          <div className="relative mt-2">
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
            >
              ×
            </button>
            <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded" />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          تسجيل
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        لديك حساب بالفعل؟{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          تسجيل الدخول
        </a>
      </p>
    </div>
  );
}
