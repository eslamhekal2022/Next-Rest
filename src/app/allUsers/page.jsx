"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchUsers = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getUsers`, {
      headers: {
        token: localStorage.getItem("token"), // لو في حماية
      },
    });

    if (data.success) {
      setUsers(data.data);
    }
  } catch (err) {
    toast.error("فشل في تحميل المستخدمين");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are You Sure ?",
      text: "لا يمكنك التراجع بعد الحذف!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes,delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/deleteUser/${id}`);
        if (res.data.success) {
          toast.success("تم حذف المستخدم بنجاح");
          fetchUsers();
        } else {
          toast.error(res.data.message || "فشل في الحذف");
        }
      } catch (err) {
        toast.error("حدث خطأ أثناء الحذف");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">جميع المستخدمين</h1>

      {loading ? (
        <p className="text-center text-gray-500">جاري تحميل المستخدمين...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">لا يوجد مستخدمين حاليًا.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div key={user._id} className="bg-white shadow rounded-lg p-4 border relative">
              <button
                onClick={() => deleteUser(user._id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                title="Delete-User"
              >
                <FaTrashAlt />
              </button>

              <p className="font-semibold">Name: {user.name}</p>
              <p>Email: {user.email}</p>
<p
  className={`text-sm font-medium ${
    user.role === 'admin' ? 'text-green-600' : 'text-gray-700'
  }`}
>
  🛡️ Role: {user.role}
</p>
              <Link
                href={`/UpdateRole/${user._id}`}
                className="inline-flex items-center gap-1 mt-3 text-blue-600 hover:underline"
              >
                <FaEdit /> Update-Role
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
