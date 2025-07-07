import GetFilterCat from "../../GetFilterCat/[category]/page.jsx";


async function getProduct(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productDetails/${id}`, {
    cache: "no-store"
  });

  if (!res.ok) return null;
  const json = await res.json();
  return json?.data;
}

export default async function GetCategoriesPage({ params }) {
  const data = await getProduct(params.id);

  if (!data?.category) {
    return <p className="text-center mt-10 text-red-600">لم يتم العثور على تصنيف.</p>;
  }

  return (
    <div className="p-4">
      <GetFilterCat category={data.category} />
    </div>
  );
}
