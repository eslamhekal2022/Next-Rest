import FilteredProductsList from "../FilteredProductsList.jsx";


async function getProducts(category) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getProductsCat/${category}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  const json = await res.json();
  return json?.data || [];
}

export default async function GetFilterCatPage({ params }) {
  const products = await getProducts(params.category);

  return (
    <div className="p-4">
      {products.length === 0 ? (
        <p className="text-center text-red-500 mt-10">لا يوجد منتجات حالياً</p>
      ) : (
        <FilteredProductsList products={products} />
      )}
    </div>
  );
}
