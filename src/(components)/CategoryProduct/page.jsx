"use client";
import Link from "next/link";
import { useProduct } from "@/context/productContext";

export default function CategoryProduct() {
  const { productCategory } = useProduct();

  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productCategory?.map((x) => (
            <Link
              href={`/GetCategories/${x._id}`}
              key={x._id}
              className="bg-white shadow rounded-xl overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${x.images[0]}`}
                alt={x.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{x.category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
