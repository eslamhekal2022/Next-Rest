import Link from "next/link";

export default async function AllProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/getAllProducts`, { cache: 'no-store' });
  const data = await res.json();
  const products = data.data;
  const categories = ['pizza', 'burger', 'pasta'];

  return (
    <div className="min-h-screen bg-[#fffaf0] p-6">
    <h1 className="text-4xl font-bold text-center text-[#F9A303] mb-10">كل المنتجات</h1>
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
            <Link
  key={cat}
  href={`/allProducts/${cat}`}
  className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-[#fce3ab] text-gray-700 font-semibold"
>

  {cat.charAt(0).toUpperCase() + cat.slice(1)}
</Link>
        ))}
      </div>

      {/* المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <img
              src={`${apiUrl}${product.images[0]}`}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            {product.sizes.map((size, idx) => (
            <p key={idx} className="text-sm flex justify-between items-center bg-gray-100 px-3 py-1 rounded mb-1">
  <span className="font-medium text-gray-800">{size.size.toUpperCase()}</span>
  <span className="text-orange-500 font-semibold">{size.price} EGP</span>
</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
