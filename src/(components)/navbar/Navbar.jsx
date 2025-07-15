"use client";
import { useMemo } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/src/context/CartContext";
import { useUser } from "@/src/context/userContext";
import { useSelector } from "react-redux";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBox,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdFastfood } from "react-icons/md";

export default function Navbar() {
  const { countCart, countWishList } = useCart();
  const { countUsers } = useUser();
  const reduxUser = useSelector((x) => x.user.user);
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadingTarget, setLoadingTarget] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    setToken(localStorage.getItem("token"));
  }
}, []);

const isPrivileged = useMemo(() => {
  return user && (user.role === "admin" || user.role === "moderator");
}, [user]);

  useEffect(() => {
    if (reduxUser) {
      setUser(reduxUser);
    } else if (typeof window !== "undefined") {
      const localUser = localStorage.getItem("user");
      if (localUser) setUser(JSON.parse(localUser));
    }
  }, [reduxUser]);

  useEffect(() => {
    if (loadingTarget) setLoadingTarget("");
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    router.push(query.trim() ? `/search?query=${query}` : `/`);
  };

  return (
    <>
      <nav className="bg-[#F9A303] text-black shadow-md fixed top-0 left-0 w-full z-50 h-[64px]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo/El-Mister.jpg"
              alt="logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <h1 className="text-xl font-bold">El-Mister</h1>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded-md px-3 py-1 text-sm w-60 focus:outline-none border"
            />
          </div>

          <div className="hidden md:flex items-center gap-5 text-lg">
            {token && (
              <>
                <IconLink href="/allProducts" icon={<MdFastfood />} isLoading={loadingTarget === "/allProducts"} />
                <BadgeIcon href="/cart" icon={<FaShoppingCart />} count={countCart} isLoading={loadingTarget === "/cart"} />
                <BadgeIcon href="/WishList" icon={<FaHeart />} count={countWishList} isLoading={loadingTarget === "/WishList"} />
              </>
            )}
            {token && isPrivileged && (
              <BadgeIcon href="/allUsers" icon={<FaUser />} count={countUsers} isLoading={loadingTarget === "/allUsers"} />
            )}
            {token && (
              <IconLink href="/meOrder" icon={<FaBox />} isLoading={loadingTarget === "/meOrder"} />
            )}
            {token && isPrivileged && <AdminButton />}
            {token && user && <UserAvatar user={user} />}
            {token ? (
              <button onClick={handleLogout} className="hover:text-red-600 text-sm">Logout</button>
            ) : (
              <Link href="/login" className="hover:text-blue-700 text-sm">Login</Link>
            )}
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden text-2xl">
            <FaBars />
          </button>
        </div>
      </nav>

      <div className="h-[64px]" />

      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-lg z-50 p-6 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={() => setMenuOpen(false)} className="text-2xl mb-6">
          <FaTimes />
        </button>

        <div className="flex flex-col gap-4 text-base">
          <MobileLink label="Products" href="/allProducts" icon={<MdFastfood />} />
          <MobileLink label="Cart" href="/cart" icon={<FaShoppingCart />} count={countCart} />
          <MobileLink label="Wishlist" href="/WishList" icon={<FaHeart />} count={countWishList} />
          {isPrivileged && <MobileLink label="Users" href="/allUsers" icon={<FaUser />} count={countUsers} />}
          {token && <MobileLink label="My Orders" href="/meOrder" icon={<FaBox />} />}
          {isPrivileged && <MobileLink label="Admin" href="/adminPanel" icon={<FaUser />} />}
          {token && user?._id && (
            <MobileLink label="Profile" href={`/userDet/${user._id}`} icon={<FaUser />} />
          )}
          {token ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:underline"
            >
              🚪 Logout
            </button>
          ) : (
            <MobileLink label="Login" href="/login" icon={<FaUser />} />
          )}
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

// ====== Components تحت ======

function IconLink({ href, icon, isLoading }) {
  return (
    <Link href={href} className="relative hover:text-orange-600">
      {isLoading ? <span className="animate-pulse">⏳</span> : icon}
    </Link>
  );
}

function BadgeIcon({ href, icon, count, isLoading }) {
  return (
    <Link href={href} className="relative hover:text-orange-600">
      {isLoading ? <span className="animate-pulse">⏳</span> : icon}
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {count}
      </span>
    </Link>
  );
}

function AdminButton() {
  return (
    <Link
      href="/adminPanel"
      className="bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800"
    >
      Admin Panel
    </Link>
  );
}

function UserAvatar({ user }) {
  if (!user?._id) return null;

  const avatarUrl = user?.image
    ? user.image.startsWith("http")
      ? user.image
      : `${process.env.NEXT_PUBLIC_API_URL}${user.image}`
    : `https://ui-avatars.com/api/?name=${user?.name || "User"}&background=random&color=fff`;

  return (
    <Link href={`/userDet/${user._id}`}>
      <img
        src={avatarUrl}
        alt={user?.name || "User"}
        title={user?.name}
        className="h-10 w-10 rounded-full border cursor-pointer object-cover"
      />
    </Link>
  );
}

function MobileLink({ href, icon, label, count }) {
  return (
    <Link href={href} className="flex items-center gap-3 hover:text-orange-600">
      <div className="relative text-xl">
        {icon}
        {typeof count === "number" && (
          <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
            {count}
          </span>
        )}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
