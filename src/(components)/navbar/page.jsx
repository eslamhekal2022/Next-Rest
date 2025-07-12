'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/src/context/CartContext';
import { useUser } from '@/src/context/userContext';
import { useSelector } from 'react-redux';
import { MdRestaurantMenu } from 'react-icons/md';
import { FaHeart, FaShoppingCart, FaUser, FaBox, FaSpinner } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { countCart, countWishList } = useCart();
  const { countUsers } = useUser();
  const reduxUser = useSelector((x) => x.user.user);

  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadingTarget, setLoadingTarget] = useState('');

  const isPrivileged = user?.role === 'admin' || user?.role === 'moderator';

  useEffect(() => {
    if (reduxUser) {
      setUser(reduxUser);
    } else if (typeof window !== 'undefined') {
      const localUser = localStorage.getItem('user');
      if (localUser) {
        setUser(JSON.parse(localUser));
      }
    }
  }, [reduxUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    router.push(query.trim() ? `/search?query=${query}` : '/');
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      router.push(query ? `/search?query=${query}` : '/');
    }
  };

  const handleNavigate = (path, target) => {
    setLoadingTarget(target);
    router.push(path);
  };



const router = useRouter();
const pathname = usePathname();



useEffect(() => {
  if (loadingTarget) {
    setLoadingTarget('');
  }
}, [pathname]);

  const token = typeof window !== 'undefined' && localStorage.getItem('token');

  return (
    <nav className="bg-[#F9A303] text-black shadow-md sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="/logo/El-Mister.jpg"
            alt="logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h1 className="text-xl font-bold">Pizza-Place</h1>
        </Link>

        {/* Search */}
        <div className="hidden md:block w-1/3">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            className="w-full px-4 py-2 rounded-full text-sm text-gray-800 focus:outline-none"
          />
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-lg relative">
          {token && (
            <>
              <button className='cursor-pointer' onClick={() => handleNavigate('/allProducts', 'menu')}>
                {loadingTarget === 'menu' ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <MdRestaurantMenu className="hover:text-white cursor-pointer" />
                )}
              </button>

              <button onClick={() => handleNavigate('/cart', 'cart')} className="relative cursor-pointer">
                {loadingTarget === 'cart' ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaShoppingCart />
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
                      {countCart}
                    </span>
                  </>
                )}
              </button>

              <button onClick={() => handleNavigate('/WishList', 'wish')} className="relative cursor-pointer">
                {loadingTarget === 'wish' ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaHeart />
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
                      {countWishList}
                    </span>
                  </>
                )}
              </button>
            </>
          )}

          {token && isPrivileged && (
            <Link href="/allUsers" className="relative">
              <FaUser />
              <span className="cursor-pointer absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
                {countUsers}
              </span>
            </Link>
          )}

          {token && <Link href="/meOrder"><FaBox /></Link>}

          {token && isPrivileged && (
            <Link href="/adminPanel">
              <button className="cursor-pointer bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800">
                Admin Panel
              </button>
            </Link>
          )}

          {token && user && (
            <Link href={`/userDet/${user.id || user._id}`}>
              <img
                src={
                  user.image
                    ? user.image.startsWith('http')
                      ? user.image
                      : `${process.env.NEXT_PUBLIC_API_URL}${user.image}`
                    : `https://ui-avatars.com/api/?name=${user?.name}&background=random&color=fff`
                }
                alt="User"
                className="h-8 w-8 rounded-full border"
              />
            </Link>
          )}

          {token ? (
            <button onClick={handleLogout} className=" cursor-pointertext-sm hover:text-red-600">
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className=" cursor-pointertext-sm hover:text-blue-700">Login</button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 mb-3 rounded-full border text-sm"
          />

          <div className="flex flex-col gap-3 text-black text-base">
            <Link href="/allProducts">All Products</Link>
            <Link href="/cart">Cart ({countCart})</Link>
            <Link href="/WishList">Wishlist ({countWishList})</Link>
            {isPrivileged && <Link href="/AllUser">Users ({countUsers})</Link>}
            {token && <Link href="/meOrder">My Orders</Link>}
            {isPrivileged && <Link href="/adminPanel">Admin Panel</Link>}
            {token && user && <Link href={`/userDet/${user.id || user._id}`}>Profile</Link>}
            {token ? (
              <button onClick={handleLogout} className="text-left text-red-600">
                Logout
              </button>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
