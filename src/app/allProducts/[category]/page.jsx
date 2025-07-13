import FilteredClientProductList from "../FilteredClientProductList";

export async function generateStaticParams() {
  return [
    { category: "pizza" },
    { category: "burger" },
    { category: "pasta" },
  ];
}

export default async function FilteredProductsPage({ params }) {
  const { category } = params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/getProductsCat/${category}`, {
    cache: "no-store",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const data = await res.json();
  const products = data.data;

  return (
    <FilteredClientProductList
      category={category}
      products={products}
      apiUrl={apiUrl}
    />
  );
}
