// components/BackButton.jsx
"use client";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 px-4 py-2  hover:bg-gray-300 rounded"
       style={{ backgroundColor: "#F9A303ff" }}
    >
      <FaAngleLeft/>
    </button>
  );
}
