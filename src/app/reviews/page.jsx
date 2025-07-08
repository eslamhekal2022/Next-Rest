import Image from "next/image";

async function getAllReviews() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAllReview`,{
  next: { revalidate: 3600 }, 
});

  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
}

export default async function ReviewUsers() {
  const reviews = await getAllReviews();

  if (reviews.length === 0) {
    return <p className="text-center text-gray-500 mt-10">لا توجد تقييمات حالياً.</p>;
  }

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Testimonials</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow rounded-lg p-6 relative border border-gray-200"
          >
            <img
              className="w-16 h-16 rounded-full mx-auto mb-4"
              src={
                review.userId?.image
                  ? review.userId.image.startsWith("http")
                    ? review.userId.image
                    : `${process.env.NEXT_PUBLIC_API_URL}${review.userId.image}`
                  : `https://ui-avatars.com/api/?name=${review.userId?.name || 'User'}&background=random&color=fff`
              }
              alt={review.userId?.name || 'User'}
            />

            <h3 className="text-lg font-semibold text-center">{review.userId?.name}</h3>
            <p className="text-center text-yellow-500 mt-1">Rating: {review.rating} ⭐</p>
            <p className="mt-3 text-gray-600 italic">“{review.comment}”</p>
          </div>
        ))}
      </div>
    </div>
  );
}
