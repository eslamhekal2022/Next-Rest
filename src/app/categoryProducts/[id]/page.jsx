import GetFilterCat from "../../GetFilterCat/[category]/page.jsx";


// 🧠 Helper function لجلب بيانات المنتج
async function getProductById(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productDetails/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json?.data;
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    return null;
  }
}

// 🧾 صفحة تصفية حسب التصنيف الموجود في المنتج
export default async function GetCategoriesPage({ params }) {
  const product = await getProductById(params.id);

  if (!product?.category) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-red-600 font-semibold">
          ❌ لم يتم العثور على التصنيف لهذا المنتج.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <GetFilterCat category={product.category} />
    </div>
  );
}
