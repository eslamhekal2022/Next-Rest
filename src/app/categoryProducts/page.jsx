// app/categoryProducts/page.jsx
import Link from "next/link";

// ✅ خليه ديناميكي لو الـ API بيتغير
export const dynamic = "force-dynamic";

// ✅ SEO Metadata
export const metadata = {
  title: "التصنيفات | مطعمك المفضل",
  description: "استعرض التصنيفات المميزة مثل البيتزا، البرجر، المكرونة والمزيد بأفضل جودة وأسعار.",
};

export default async function CategoryProduct() {
  let productCategory = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCategoryProduct`, {
      cache: "no-store",
    });

    const data = await res.json();
    productCategory = data?.data || [];
  } catch (err) {
    console.error("❌ Error fetching categories:", err);
  }

  return (
    <section className="py-12 bg-gray-50 flex justify-center w-full">
      <div className="max-w-7xl w-full px-4 text-center">
        {/* 🟠 العنوان */}
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-10">
          التصنيفات المميزة 🍽️
        </h2>

        {/* ✅ لو مفيش بيانات */}
        {productCategory.length === 0 ? (
          <p className="text-lg text-gray-500">
            لا توجد تصنيفات متاحة حاليًا. برجاء المحاولة لاحقًا.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {productCategory.map((cat) => (
              <Link
                key={cat._id}
                href={`/categoryProducts/${cat._id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22%] max-w-[250px]"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${cat.images?.[0] || "/fallback.jpg"}`}
                  alt={cat.category || "category"}
                  className="w-full h-44 object-cover border-b border-gray-200 group-hover:opacity-90 transition-opacity duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 capitalize">
                    {cat.category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
