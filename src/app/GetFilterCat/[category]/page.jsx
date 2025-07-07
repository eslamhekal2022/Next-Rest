import Link from "next/link";

async function getProducts(category) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getProductsCat/${category}`, {
    cache: "no-store"
  });

  if (!res.ok) return [];
  const json = await res.json();
  return json?.data || [];
}

export default async function GetFilterCat({ category }) {
  const products = await getProducts(category);

  return (
    <div className="grid gap-6 grid-cols-2 md:grid-cols-4 p-4">
      {products.map((x) => (
        <div key={x._id} className="bg-white shadow rounded-xl p-4">
          <Link href={`/productDetails/${x._id}`}>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${x.images[0]}`}
              alt={x.name}
              className="w-full h-32 object-cover rounded"
            />
          </Link>
          <h3 className="text-lg font-semibold">{x.name}</h3>
          <p className="text-sm text-gray-600">{x.description.slice(0, 40)}...</p>
          <div className="mt-2 space-y-1">
            {x.sizes.map((size, idx) => (
              <p key={idx} className="text-sm">
                {size.size.toUpperCase()} : {size.price} EGP
              </p>
            ))}
          </div>
          {/* اضف زر الإضافة لعربة التسوق هنا لو عايز */}
        </div>
      ))}
    </div>
  );
}
