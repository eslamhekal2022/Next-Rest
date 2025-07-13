import ClientSideProductList from "./ClientSideProductList.jsx";


// ✅ تحسين الـ SEO
export const metadata = {
  title: "قائمة الطعام | كل منتجات مطعمك",
  description: "استعرض جميع وجباتنا من بيتزا، برجر، مكرونة والمزيد بأفضل الأسعار وجودة عالية.",
};

export default async function AllProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiUrl}/getAllProducts`,{
  next: { revalidate: 1800 },
});

    if (!res.ok) {
      throw new Error("فشل في تحميل المنتجات");
    }

    const json = await res.json();

    // تحقق إن البيانات فعلاً Array
    const products = Array.isArray(json.data) ? json.data : [];

    const categories = ["pizza", "burger", "pasta"];

    return (
      <ClientSideProductList
        products={products}
        categories={categories}
        apiUrl={apiUrl}
      />
    );
  } catch (error) {
    console.error("حدث خطأ:", error);
    return (
      <div className="text-center text-red-500 mt-10">
        فشل في تحميل قائمة المنتجات، حاول مرة أخرى لاحقًا.
      </div>
    );
  }
}
