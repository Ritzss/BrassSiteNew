/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  const [user, setUser] = useState<UserType | null>(() => {
    try {
      if (typeof window === "undefined") return null;

      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  /*
   * Handles hydration and navbar scroll state.
   *
   * The navbar starts slightly transparent so it can sit naturally
   * over the hero. Once the user scrolls, it becomes a stronger
   * glass panel with blur, border and shadow for readability.
   */
  useEffect(() => {
    const rafId = requestAnimationFrame(() => setMounted(true));

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      {/* =========================================================
          DESKTOP NAVBAR
          ========================================================= */}
      <header
        className={`
          fixed inset-x-0 top-0 z-100
          hidden md:block
          border-b
          transition-all duration-500
          ${
            scrolled
              ? `
                border-[#E4E198]/20
                bg-[#0E4001]/85
                shadow-[0_10px_35px_rgba(0,0,0,0.20)]
                backdrop-blur-xl
              `
              : `
                border-transparent
                bg-[#0E4001]/25
                backdrop-blur-md
              `
          }
        `}
      >
        <div
          className={`
            mx-auto flex h-18 items-center justify-between
            px-6 transition-all duration-500 lg:px-10
            ${scrolled ? "h-16" : "h-18"}
          `}
        >
          {/* Logo */}
          <Link
            href="/"
            className="
              shrink-0
              font-serif
              text-xl
              italic
              tracking-[0.14em]
              text-[#E4E198]
              transition
              duration-300
              hover:text-[#F4F2DD]
            "
          >
            &quot;brandName&quot;
          </Link>

          {/* Search */}
          <div className="flex flex-1 justify-center px-10">
            <div className="relative w-full max-w-md">
              <BiSearch
                size={18}
                className="
                  absolute left-0 top-1/2
                  -translate-y-1/2
                  text-[#E4E198]/80
                "
              />

              <input
                type="text"
                placeholder="Search products..."
                className="
                  w-full
                  border-b
                  border-[#E4E198]/30
                  bg-transparent
                  py-2.5
                  pl-7
                  pr-3
                  text-xs
                  tracking-wide
                  text-[#F4F2DD]
                  outline-none
                  placeholder:text-[#F4F2DD]/45
                  transition
                  focus:border-[#E4E198]
                "
              />
            </div>
          </div>

          {/* Navigation */}
          <nav
            className="
              flex
              items-center
              gap-6
              text-[10px]
              uppercase
              tracking-[0.16em]
              text-[#F4F2DD]
            "
          >
            <Link
              href="/#home"
              className="
                relative
                py-2
                transition
                hover:text-[#E4E198]
                after:absolute
                after:bottom-0
                after:left-0
                after:h-px
                after:w-0
                after:bg-[#E4E198]
                after:transition-all
                hover:after:w-full
              "
            >
              Home
            </Link>

            <Link
              href="/category"
              className="
                relative
                py-2
                transition
                hover:text-[#E4E198]
                after:absolute
                after:bottom-0
                after:left-0
                after:h-px
                after:w-0
                after:bg-[#E4E198]
                after:transition-all
                hover:after:w-full
              "
            >
              Category
            </Link>

            {!user ? (
              <Link
                href="/auth"
                className="
                  rounded-full
                  border
                  border-[#E4E198]/40
                  px-4
                  py-2
                  text-[#E4E198]
                  transition
                  hover:border-[#E4E198]
                  hover:bg-[#E4E198]
                  hover:text-[#0E4001]
                "
              >
                Login / Register
              </Link>
            ) : (
              <div className="flex items-center gap-5">
                {user.role !== "admin" && (
                  <span
                    className="
                      normal-case
                      tracking-normal
                      text-[#F4F2DD]/80
                    "
                  >
                    {user.name}
                  </span>
                )}

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="transition hover:text-[#E4E198]"
                  >
                    Admin
                  </Link>
                )}

                <button
                  type="button"
                  aria-label="Cart"
                  className="
                    rounded-full
                    p-2
                    transition
                    hover:bg-[#E4E198]/15
                    hover:text-[#E4E198]
                  "
                >
                  <FaCartArrowDown size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="transition hover:text-[#E4E198]"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* =========================================================
          MOBILE NAVBAR
          ========================================================= */}
      <header
        className={`
          fixed inset-x-0 top-0 z-100
          md:hidden
          border-b
          transition-all duration-500
          ${
            scrolled
              ? `
                border-[#E4E198]/20
                bg-[#0E4001]/90
                shadow-[0_8px_30px_rgba(0,0,0,0.22)]
                backdrop-blur-xl
              `
              : `
                border-[#E4E198]/10
                bg-[#0E4001]/55
                backdrop-blur-lg
              `
          }
        `}
      >
        <div className="flex h-17 items-center justify-between px-5">
          {/* Menu button */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menu}
            onClick={() => setMenu((value) => !value)}
            className="flex w-8 flex-col gap-1.5"
          >
            <span
              className={`
                block h-px w-7
                bg-[#E4E198]
                transition-all duration-300
                ${menu ? "translate-y-0.75 rotate-45" : ""}
              `}
            />

            <span
              className={`
                block h-px w-7
                bg-[#E4E198]
                transition-all duration-300
                ${menu ? "-translate-y-0.5 -rotate-45" : ""}
              `}
            />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="
              font-serif
              text-lg
              italic
              tracking-widest
              text-[#E4E198]
            "
          >
            &quot;brandName&quot;
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-3 text-[#F4F2DD]">
            <button
              type="button"
              aria-label="Search"
              className="
                rounded-full
                p-1.5
                transition
                hover:bg-[#E4E198]/15
                hover:text-[#E4E198]
              "
            >
              <BiSearch size={22} />
            </button>

            <button
              type="button"
              aria-label="Cart"
              className="
                rounded-full
                p-1.5
                transition
                hover:bg-[#E4E198]/15
                hover:text-[#E4E198]
              "
            >
              <FaCartArrowDown size={20} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`
            overflow-hidden
            border-t
            border-[#E4E198]/15
            bg-[#F4F2DD]/95
            text-[#0E4001]
            shadow-2xl
            backdrop-blur-xl
            transition-all
            duration-300
            ${
              menu
                ? "max-h-150 opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <nav className="flex flex-col">
            {[
              ["Home", "/"],
              ["Products", "/collection"],
              ["Bowls", "/category/bowls"],
              ["Bottles", "/category/bottles"],
              ["Plates", "/category/plates"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenu(false)}
                className="
                  border-b
                  border-[#0E4001]/10
                  px-5
                  py-4
                  text-sm
                  transition
                  hover:bg-[#E4E198]/30
                "
              >
                {label}
              </Link>
            ))}

            {!user ? (
              <Link
                href="/auth"
                onClick={() => setMenu(false)}
                className="
                  px-5
                  py-4
                  text-sm
                  font-medium
                "
              >
                Login / Register
              </Link>
            ) : (
              <>
                {user.role !== "admin" && (
                  <div
                    className="
                      border-b
                      border-[#0E4001]/10
                      px-5
                      py-4
                      text-sm
                      capitalize
                    "
                  >
                    {user.name}
                  </div>
                )}

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMenu(false)}
                    className="
                      border-b
                      border-[#0E4001]/10
                      px-5
                      py-4
                      text-sm
                    "
                  >
                    Admin
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    px-5
                    py-4
                    text-left
                    text-sm
                  "
                >
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