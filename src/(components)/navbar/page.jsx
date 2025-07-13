"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/src/context/CartContext';
import { useUser } from '@/src/context/userContext';
import { useSelector } from 'react-redux';
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBox,
  FaSpinner,
} from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';

export default function Navbar() {
  const { countCart, countWishList } = useCart();
  const { countUsers } = useUser();
  const reduxUser = useSelector((x) => x.user.user);

  const [user, setUser] = useState(null);
  // const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadingTarget, setLoadingTarget] = useState('');

  const router = useRouter();
  const pathname = usePathname();

  const isPrivileged = user?.role === 'admin' || user?.role === 'moderator';
  const token = typeof window !== 'undefined' && localStorage.getItem('token');

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

  useEffect(() => {
    if (loadingTarget) {
      setLoadingTarget('');
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    router.push('/login');
  };

  // const handleSearchChange = (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);
  //   router.push(query.trim() ? `/search?query=${query}` : '/');
  // };

  // const handleSearchKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     const query = e.target.value.trim();
  //     router.push(query ? `/search?query=${query}` : '/');
  //   }
  // };

  const handleNavigate = (path, target) => {
    setLoadingTarget(target);
    router.push(path);
  };

  return (
    <nav className="bg-[#F9A303] text-black shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo/El-Mister.jpg" alt="logo" className="h-10 w-10 rounded-full object-cover" />
          <h1 className="text-xl font-bold">Pizza-Place</h1>
        </Link>

        {/* Desktop Search */}
        // <div className="hidden md:block w-1/3">
        //   <input
        //     type="text"
        //     placeholder="Search for products..."
        //     value={searchQuery}
        //     onChange={handleSearchChange}
        //     onKeyDown={handleSearchKeyDown}
        //     className="w-full px-4 py-2 rounded-full text-sm text-gray-800 focus:outline-none"
        //   />
        // </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5 text-lg">
          {token && (
            <>
              <IconButton onClick={() => handleNavigate('/allProducts', 'menu')} icon={<MdFastfood />} loading={loadingTarget === 'menu'} />
              <BadgeIcon path="/cart" count={countCart} icon={<FaShoppingCart />} loading={loadingTarget === 'cart'} />
              <BadgeIcon path="/WishList" count={countWishList} icon={<FaHeart />} loading={loadingTarget === 'wish'} />
            </>
          )}

          {token && isPrivileged && <BadgeIcon path="/allUsers" count={countUsers} icon={<FaUser />} />}
          {token && <IconLink path="/meOrder" icon={<FaBox />} />}
          {token && isPrivileged && <AdminButton />}

          {token && user && <UserAvatar user={user} />}

          {token ? (
            <button onClick={handleLogout} className="hover:text-red-600 text-sm">Logout</button>
          ) : (
            <Link href="/login" className="hover:text-blue-700 text-sm">Login</Link>
          )}
        </div>

        {/* Mobile Menu */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl">
          ☰
        </button>
      // </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white text-black space-y-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-full border text-sm"
          />

          <MobileLink href="/allProducts" label="All Products" />
          <MobileLink href="/cart" label={`Cart (${countCart})`} />
          <MobileLink href="/WishList" label={`Wishlist (${countWishList})`} />
          {isPrivileged && <MobileLink href="/allUsers" label={`Users (${countUsers})`} />}
          {token && <MobileLink href="/meOrder" label="My Orders" />}
          {isPrivileged && <MobileLink href="/adminPanel" label="Admin Panel" />}
          {token && user && <MobileLink href={`/userDet/${user._id}`} label="Profile" />}
          {token ? (
            <button onClick={handleLogout} className="text-left text-red-600">Logout</button>
          ) : (
            <MobileLink href="/login" label="Login" />
          )}
        </div>
      )}
    </nav>
  );
}

function IconButton({ onClick, icon, loading }) {
  return (
    <button onClick={onClick} className="relative cursor-pointer">
      {loading ? <FaSpinner className="animate-spin" /> : icon}
    </button>
  );
}

function BadgeIcon({ path, count, icon, loading }) {
  return (
    <Link href={path} className="relative">
      {loading ? <FaSpinner className="animate-spin" /> : icon}
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
        {count}
      </span>
    </Link>
  );
}

function IconLink({ path, icon }) {
  return <Link href={path}>{icon}</Link>;
}

function AdminButton() {
  return (
    <Link href="/adminPanel">
      <button className="bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800">Admin Panel</button>
    </Link>
  );
}

function UserAvatar({ user }) {
  const src = user.image?.startsWith('http')
    ? user.image
    : `${process.env.NEXT_PUBLIC_API_URL}${user.image}`;
  return (
    <Link href={`/userDet/${user._id}`}>
      <img
        src={user.image ? src : `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`}
        alt="User"
        className="h-8 w-8 rounded-full border"
      />
    </Link>
  );
}

function MobileLink({ href, label }) {
  return <Link href={href} className="block hover:text-orange-500">{label}</Link>;
}
