import { FaStar } from "react-icons/fa";

export const dynamic = "force-dynamic";

export default async function ProductDetailsPage({ params }) {
  const id = params.id;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productDetails/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return <p className="text-center text-red-500">حدث خطأ أثناء تحميل المنتج</p>;

  const data = await res.json();
  if (!data.success) return <p className="text-center text-red-500">لم يتم العثور على المنتج</p>;

  const product = data.data;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Images */}
        <div>
          <div className="relative border rounded-2xl overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.images[0]}`}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl"
            />
            {product.averageRating && (
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="text-sm font-semibold">
                  {Number.isInteger(product.averageRating)
                    ? product.averageRating
                    : product.averageRating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${img}`}
                  alt={`thumb-${idx}`}
                  className="w-20 h-20 object-cover rounded-xl border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="space-y-4">
          <p className="text-sm text-gray-500">الفئة: {product.category}</p>
          <h1 className="text-3xl font-bold uppercase">{product.name}</h1>

          <div className="space-y-2 text-gray-700">
            {product.description
              .split("*")
              .filter(Boolean)
              .map((item, idx) => (
                <p key={idx}>🥄 {item.trim()}</p>
              ))}
          </div>

          <div className="space-y-1">
            {product.sizes.map((size, idx) => (
              <p key={idx} className="text-lg font-semibold text-black">
                {size.size.toUpperCase()} : {size.price} EGP
              </p>
            ))}
          </div>

          <button className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition">
            Add To Cart 🛒
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Reviews:</h2>
        {product.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) : (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review._id} className="bg-gray-100 p-4 rounded-xl">
                <p className="font-bold">{review.userId?.name || "User"}</p>
                <p className="text-yellow-500">⭐ {review.rating} / 5</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
