import ProductDetailsPage from "@/src/(components)/productDetPage/page.jsx";


async function getProduct(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productDetails/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();
    if (!json.success) return null;

    return json.data;
  } catch (err) {
    return null;
  }
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <p className="text-center text-red-500">المنتج غير موجود أو حدث خطأ أثناء التحميل</p>;
  }

  return <ProductDetailsPage product={product} />;
}
