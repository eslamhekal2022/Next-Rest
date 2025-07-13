import Image from "next/image";

async function getAllReviews() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAllReview`, {
    cache: "no-store", // علشان دايمًا نجيب الجديد
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
}

export default async function ReviewUsers() {
  const reviews = await getAllReviews();

  if (reviews.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        لا توجد تقييمات حالياً.
      </p>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* العنوان */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
          آراء العملاء 💬
        </h2>

        {/* الشبكة */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => {
            const user = review.userId;
            const userImage = user?.image
              ? user.image.startsWith("http")
                ? user.image
                : `${process.env.NEXT_PUBLIC_API_URL}${user.image}`
              : `https://ui-avatars.com/api/?name=${user?.name || "User"}&background=random&color=fff`;

            return (
              <div
                key={review._id}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 transition hover:shadow-xl"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={userImage}
                    alt={user?.name || "User"}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />

                  <h3 className="mt-3 text-lg font-semibold text-gray-800">
                    {user?.name || "مستخدم"}
                  </h3>
                  <p className="text-yellow-500 text-sm mt-1">
                    ⭐ {review.rating} / 5
                  </p>

                  <p className="mt-4 text-gray-600 italic leading-relaxed">
                    “{review.comment}”
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
