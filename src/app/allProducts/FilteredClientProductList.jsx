"use client";
import AddToCartSection from "@/src/(components)/AddToCart/page.jsx";
import Link from "next/link";
import BackButton from "@/src/(components)/BackButton/page";

export default function FilteredClientProductList({ category, products, apiUrl }) {
  const arabicCategoryNames = {
    pizza: "بيتزا",
    burger: "برجر",
    pasta: "باستا",
  };

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen p-10 text-center text-2xl">
        لا توجد منتجات في فئة {arabicCategoryNames[category] || category}
        <br />
        <Link href="/all-products" className="text-orange-500 underline">
          رجوع
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf0] p-6">
      <BackButton />
      <h1 className="text-4xl font-bold text-center text-[#F9A303] mb-10">
        منتجات {arabicCategoryNames[category] || category}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow">
            <img
              src={`${apiUrl}${product.images?.[0] || "/fallback.jpg"}`}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="mt-2">
              {product.sizes.map((size, idx) => (
                <p key={idx} className="text-sm flex justify-between items-center bg-gray-100 px-3 py-1 rounded mb-1">
                  <span className="font-medium text-gray-800">{size.size.toUpperCase()}</span>
                  <span className="text-orange-500 font-semibold">{size.price} EGP</span>
                </p>
              ))}
              <AddToCartSection product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
