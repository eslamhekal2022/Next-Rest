'use client';

import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function ImageUploader({ userDet }) {
  const [user, setUser] = useState(userDet);
  const [timestamp, setTimestamp] = useState(Date.now());
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/updateUserImage/${user._id || user.id}`,
        {
          method: 'POST',
          headers: {
            token: localStorage.getItem('token'),
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (data.success) {
        const updatedUser = { ...user, image: data.data.image };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setTimestamp(Date.now());
        toast.success('Image updated!');
      } else {
        toast.error('Error updating image');
      }
    } catch (err) {
      toast.error('Upload failed');
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />
      <img
        onClick={handleImageClick}
        src={
          user?.image
            ? user.image.startsWith('http')
              ? `${user.image}?t=${timestamp}`
              : `${process.env.NEXT_PUBLIC_API_URL}${user.image}?t=${timestamp}`
            : `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`
        }
        alt={user.name}
  className="h-32 w-32 rounded-full object-cover border-4 border-blue-400 hover:opacity-90 transition duration-200 cursor-pointer shadow-lg"
      />
    </>
  );
}
