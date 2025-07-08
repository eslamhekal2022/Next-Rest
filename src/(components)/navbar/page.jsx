'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

export const Navbar = () => {
  const links = [
    { path: "/", link: "home" },
    { path: "/about", link: "about" },
    { path: "/contact", link: "contact" },
    { path: "/allProducts", link: "allProducts" },
    { path: "/allUsers", link: "allUsers" },
  ];
  

  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full border-b-2 border-black-900" style={{ backgroundColor: "#F9A303ff" }}>
      <div className="h-[10vh] w-full flex justify-center items-center">
        <div className="w-[90%] md:w-[95%] lg:w-[80%] h-full flex justify-between items-center px-4">

        <Link href={"/"} >
          <div className="flex items-center gap-4">
            <img
              src="/logo/El-Mister.jpg"
              alt="Logo"
              className="h-10 w-auto rounded object-contain"
            />
            <h1 className="text-black text-lg md:text-xl font-bold">EL-Mister</h1>
          </div>
          </Link>

          <div className="hidden md:flex gap-4 text-black">
            {links.map((x, i) => (
              <Link
                key={i}
                href={x.path}
                className={`capitalize px-2 py-1 transition ${
                  pathname === x.path
                    ? 'bg-black text-white'
                    : 'hover:text-blue-500'
                }`}
              >
                {x.link}
              </Link>
            ))}
          </div>

          {/* زر الموبايل */}
          <div className="md:hidden">
             <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full px-6 py-4 shadow-md">
          {links.map((x, i) => (
            <Link
              key={i}
              href={x.path}
              className={`block capitalize py-2 text-black border-b ${
                pathname === x.path ? 'bg-black text-white p-1' : 'hover:text-blue-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {x.link}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
