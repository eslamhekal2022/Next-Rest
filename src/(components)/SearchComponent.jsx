'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import GetFilterCat from '../app/GetFilterCat/[category]/page.jsx';

export default function SearchComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query && query.trim()) {
        try {
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/searchProducts?query=${query}`);
          setProducts(data.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      } else {
        setProducts([]);
      }
    };

    fetchData();
  }, [query]);

  const uniqueCategories = [...new Set(products.map(product => product.category))];

  return (
    <div className="p-4">
      {products.length > 0 ? (
        <GetFilterCat category={uniqueCategories} />
      ) : (
        <p className="text-gray-600">No products found</p>
      )}
    </div>
  );
}
