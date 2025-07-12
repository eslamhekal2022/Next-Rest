import ImageUploader from './ImageUploader.jsx';
import { notFound } from 'next/navigation';

async function getUser(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getuser/${id}`, {
      cache: 'no-store',
    });
    const json = await res.json();
    if (!json.success) return null;
    return json.data;
  } catch {
    return null;
  }
}

export default async function UserDetailsPage({ params }) {
  const userDet = await getUser(params.id);

    if (!userDet) return notFound();

  return (
    <div className="user-details-container flex flex-col items-center gap-4 mt-6">
      <ImageUploader userDet={userDet} />
      <h1 className="user-name text-xl font-bold">{userDet.name}</h1>
    </div>
  );
}
