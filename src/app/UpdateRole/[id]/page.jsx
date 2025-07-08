"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function UpdateRole({ params }) {
  const { id } = params;
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getuser/${id}`);
      if (data.success) {
        setUser(data.data);
        setRole(data.data.role);
      }
    } catch (err) {
      toast.error("فشل في تحميل المستخدم");
    }
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/update-role/${id}`, { role });

      if (data.success) {
        toast.success("تم تحديث الدور بنجاح");

        const storedUser = localStorage.getItem("user");
        const currentUser = storedUser ? JSON.parse(storedUser) : null;
        if (currentUser?.id === id) {
          const updated = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getuser/${id}`);
          localStorage.setItem("user", JSON.stringify(updated.data.data));
        }

        router.push("/allUsers");
      } else {
        toast.error("فشل في تحديث الدور");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء التحديث");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 px-4">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update User Role</h2>

        <form onSubmit={handleUpdateRole} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              value={user.name || ""}
              readOnly
              className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => router.push("/allUsers")}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
