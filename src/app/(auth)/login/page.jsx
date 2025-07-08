"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, user);
      if (res.data?.success) {
        const { token, user: userData } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("user", JSON.stringify(userData));

        toast.success("تم تسجيل الدخول بنجاح ✅");
        router.push("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">تسجيل الدخول</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          تسجيل الدخول
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        ليس لديك حساب؟{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          سجل الآن
        </a>
      </p>
      <p className="text-center text-sm text-gray-600 mt-2">
        نسيت كلمة المرور؟{" "}
        <a href="/ForgetPassword" className="text-blue-600 hover:underline">
          اضغط هنا
        </a>
      </p>
    </div>
  );
}
