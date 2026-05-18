"use client";

import Link from "next/link";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa6";

const Navbar = () => {
  return (
    <header className="hidden md:flex items-center justify-between px-8 lg:px-14 h-24 dark:bg-[#889551] dark:text-white">

      {/* LOGO */}
      <Link
        href="/"
        className="text-2xl font-extrabold tracking-wide"
      >
        LOGO
      </Link>

      {/* SEARCH */}
      <div className="flex-1 flex justify-center px-6">

        <div className="relative w-full max-w-[500px]">

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
      <nav className="flex items-center gap-8 uppercase font-medium">

        <Link
          href="/"
          className="hover:text-[#f4f2dd] transition"
        >
          Home
        </Link>

        <Link
          href="#category"
          className="hover:text-[#f4f2dd] transition"
        >
          Products
        </Link>

        <button className="hover:scale-110 transition">
          <FaCartArrowDown size={30} />
        </button>

      </nav>

    </header>
  );
};

const MobileNavbar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <header className="md:hidden relative dark:bg-[#889551] text-white">

      {/* TOP BAR */}
      <div className="h-20 px-5 flex items-center justify-between">

        {/* MENU BUTTON */}
        <button
          onClick={() => setMenu(!menu)}
          className="flex flex-col gap-1"
        >

          <span
            className={`block w-7 h-[2px] bg-white transition-all duration-300 ${
              menu ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />

          <span
            className={`block w-7 h-[2px] bg-white transition-all duration-300 ${
              menu ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />

        </button>

        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-extrabold"
        >
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
        className={`absolute top-20 left-0 w-full bg-white text-[#889551] overflow-hidden transition-all duration-300 ${
          menu ? "max-h-60 py-4" : "max-h-0"
        }`}
      >

        <nav className="flex flex-col">

          <Link
            href="/"
            className="px-5 py-4 border-b border-gray-200"
          >
            Home
          </Link>

          <Link
            href="#category"
            className="px-5 py-4 border-b border-gray-200"
          >
            Products
          </Link>

          <button className="text-left px-5 py-4">
            Cart
          </button>

        </nav>

      </div>

    </header>
  );
};

export { MobileNavbar };

export default Navbar;