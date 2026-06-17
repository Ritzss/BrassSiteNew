"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa6";

type UserType = {
  name: string;
  email: string;
  role: "admin" | "customer";
};

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserType | null>(() => {
    try {
      if (typeof window === "undefined") return null;
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [menu, setMenu] = useState<boolean>(false);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (!mounted) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <header className="hidden md:flex items-center justify-between px-8 lg:px-14 h-15 dark:bg-[#889551] bg-[#f4f2dd] dark:text-white">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-extrabold tracking-wide">
          LOGO
        </Link>

        {/* SEARCH */}
        <div className="flex-1 flex justify-center px-6">
          <div className="relative w-full max-w-125">
            <BiSearch
              size={24}
              className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-[#889551] text-[#F4F2DD]"
            />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full dark:bg-[#f4f2dd] bg-[#889551] dark:text-[#889551] text-[#F4F2DD] rounded-full py-3 pl-12 pr-4 outline-none"
            />
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="flex items-center gap-5 font-medium">
          <Link href="/#home" className="dark:hover:text-[#f4f2dd] hover:text-[#889551] transition">
            Home
          </Link>
          <Link
            href="/productsdetail"
            className="dark:hover:text-[#f4f2dd] hover:text-[#889551] transition"
          >
            Products
          </Link>
          {!user ? (
            <Link href="/auth" className="hover:text-[#f4f2dd] transition">
              Login / Register
            </Link>
          ) : (
            <div className="flex items-center gap-5">
              {user.role!=='admin' && <span className="capitalize">{user.name}</span>}
              {user.role === "admin" && (
                <Link href="/admin" className="hover:text-[#f4f2dd]">
                  Admin
                </Link>
              )}
              <button className="hover:scale-110 transition">
                <FaCartArrowDown size={22} />
              </button>
              <button
                onClick={handleLogout}
                className="hover:text-red-300 transition"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* MOBILE NAVBAR */}
      <header className="md:hidden relative dark:bg-[#889551] bg-[#f4f2dd] text-white">
        {/* TOP BAR */}
        <div className="h-20 px-5 flex items-center justify-between">
          {/* MENU BUTTON */}
          <button
            onClick={() => setMenu(!menu)}
            className="flex flex-col gap-1"
          >
            <span
              className={`block w-7 h-0.5 bg-white transition-all duration-300 ${
                menu ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-7 h-0.5 bg-white transition-all duration-300 ${
                menu ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
          {/* LOGO */}
          <Link href="/" className="text-xl font-extrabold">
            LOGO
          </Link>
          {/* ICONS */}
          <div className="flex items-center gap-3">
            <button>
              <BiSearch size={28} />
            </button>
            <button>
              <FaCartArrowDown size={28} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`absolute top-20 left-0 w-full bg-white text-[#889551] overflow-hidden transition-all duration-300 z-50 ${
            menu ? "max-h-96 py-4" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col">
            <Link href="/" className="px-5 py-4 border-b border-gray-200">
              Home
            </Link>
            <Link
              href="/productsdetail"
              className="px-5 py-4 border-b border-gray-200"
            >
              Products
            </Link>
            <button className="text-left px-5 py-4 border-b border-gray-200">
              Cart
            </button>
            {!user ? (
              <Link href="/auth" className="px-5 py-4 border-b border-gray-200">
                Login / Register
              </Link>
            ) : (
              <>
                <div className="px-5 py-4 border-b border-gray-200 capitalize">
                  {user.name}
                </div>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="px-5 py-4 border-b border-gray-200"
                  >
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="text-left px-5 py-4">
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
