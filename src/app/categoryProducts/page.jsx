import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CategoryProduct() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCategoryProduct`, {
    cache: 'no-store',
  });

  const data = await res.json();
  const productCategory = data?.data || [];

  return (
    <section className="py-12 bg-gray-50 flex justify-center w-full">
      <div className="max-w-7xl w-full px-4 text-center">
        {/* العنوان */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 capitalize">
          Featured Categories
        </h2>

        {/* الكروت */}
        <div className="flex flex-wrap justify-center gap-6">
          {productCategory.map((x) => (
            <Link
              key={x._id}
 href={`/categoryProducts/${x._id}`}
               className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22%] max-w-[250px]"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${x.images[0]}`}
                alt={x.name?.en || 'category'}
                className="w-full h-48 object-cover border-b border-gray-200 group-hover:opacity-90 transition-opacity duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">
                  {x.category}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
