import AddToCartSection from "@/src/(components)/AddToCart/page.jsx";
import axios from "axios";
import Link from "next/link";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.query || "";

  if (!query.trim()) {
    return (
      <p className="text-center text-gray-500 mt-10">لم يتم إدخال كلمة بحث.</p>
    );
  }

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/searchProducts?query=${query}`
  );
  const products = data.data;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-10">
        لا توجد منتجات مطابقة لبحثك.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col"
        >
          <Link href={`/productDetails/${product._id}`}>
            <img
              src={`${apiUrl}${product.images?.[0] || "/fallback.jpg"}`}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-bold mb-2">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {product.description?.slice(0, 80)}...
            </p>

            {product.sizes?.map((size, idx) => (
              <p
                key={idx}
                className="text-sm flex justify-between items-center bg-gray-100 px-3 py-1 rounded mb-1"
              >
                <span className="font-medium text-gray-800">
                  {size.size.toUpperCase()}
                </span>
                <span className="text-orange-500 font-semibold">
                  {size.price} EGP
                </span>
              </p>
            ))}
          </Link>

          <AddToCartSection product={product} />
        </div>
      ))}
    </div>
  );
}
