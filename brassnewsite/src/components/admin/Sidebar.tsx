"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Video,
  BarChart3,
  Settings,
  LogOut,
  Home,
  ArrowUpRight,
} from "lucide-react";

/* =========================================================
   NAVIGATION
========================================================= */

const links = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    name: "Videos",
    href: "/admin/videos",
    icon: Video,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  /* =========================================================
     LOGOUT
  ========================================================= */

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  /* =========================================================
     ACTIVE ROUTE
  ========================================================= */

  const isActive = (href: string) => {
    /*
     * Dashboard needs an exact match so that /admin/users
     * does not also highlight Dashboard.
     */
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside
      className="
        relative
        hidden
        min-h-screen
        w-[260px]
        shrink-0
        overflow-hidden
        bg-[#0E4001]
        text-[#F4F2DD]
        md:flex
        md:flex-col
      "
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-28
          -top-24
          h-72
          w-72
          rounded-full
          border
          border-[#E4E198]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-28
          h-72
          w-72
          rounded-full
          bg-[#889551]/10
          blur-3xl
        "
      />

      <div className="relative z-10 flex min-h-screen flex-col p-5">
        {/* ===================================================
            BRAND
        =================================================== */}

        <div className="mb-10 px-2 pt-2">
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[#E4E198]/25
                bg-[#E4E198]/10
                font-serif
                text-sm
                italic
                text-[#E4E198]
              "
            >
              B
            </div>

            <div>
              <p
                className="
                  font-serif
                  text-lg
                  italic
                  leading-none
                  text-[#F4F2DD]
                "
              >
                Brass
              </p>

              <p
                className="
                  mt-1
                  text-[7px]
                  uppercase
                  tracking-[0.28em]
                  text-[#E4E198]/55
                "
              >
                Administration
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            NAVIGATION LABEL
        =================================================== */}

        <div className="mb-3 px-3">
          <p className="text-[7px] uppercase tracking-[0.28em] text-[#F4F2DD]/30">
            Workspace
          </p>
        </div>

        {/* ===================================================
            NAVIGATION
        =================================================== */}

        <nav className="flex flex-col gap-1.5">
          {links.map((link, index) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  group
                  relative
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  px-3
                  py-3
                  transition-all
                  duration-300
                  ${
                    active
                      ? "bg-[#F4F2DD] text-[#0E4001] shadow-[0_10px_30px_rgba(0,0,0,0.14)]"
                      : "text-[#F4F2DD]/60 hover:bg-white/[0.06] hover:text-[#F4F2DD]"
                  }
                `}
              >
                {/* Active indicator */}

                {active && (
                  <span
                    className="
                      absolute
                      left-0
                      top-1/2
                      h-6
                      w-0.5
                      -translate-y-1/2
                      rounded-full
                      bg-[#889551]
                    "
                  />
                )}

                {/* Number */}

                <span
                  className={`
                    w-5
                    text-[7px]
                    ${
                      active
                        ? "text-[#889551]"
                        : "text-[#F4F2DD]/20"
                    }
                  `}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}

                <Icon
                  size={17}
                  strokeWidth={1.5}
                  className={`
                    shrink-0
                    ${
                      active
                        ? "text-[#0E4001]"
                        : "text-[#E4E198]/70"
                    }
                  `}
                />

                {/* Label */}

                <span className="flex-1 text-[10px] font-medium">
                  {link.name}
                </span>

                {/* Active arrow */}

                {active && (
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.5}
                    className="text-[#889551]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ===================================================
            BOTTOM AREA
        =================================================== */}

        <div className="mt-auto">
          {/* Brand statement */}

          <div
            className="
              mb-4
              rounded-2xl
              border
              border-[#E4E198]/10
              bg-white/[0.035]
              p-4
            "
          >
            <p className="font-serif text-sm italic text-[#E4E198]">
              Pure Brass.
            </p>

            <p className="mt-1 text-[7px] uppercase tracking-[0.16em] text-[#F4F2DD]/30">
              Traditional craft · Modern living
            </p>
          </div>

          {/* Logout */}

          <button
            type="button"
            onClick={logout}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-2xl
              border
              border-[#E4E198]/10
              bg-[#E4E198]
              px-4
              py-3.5
              text-[#0E4001]
              transition-all
              duration-300
              hover:bg-[#F4F2DD]
            "
          >
            <LogOut
              size={17}
              strokeWidth={1.5}
            />

            <span className="text-[9px] font-semibold uppercase tracking-[0.12em]">
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}