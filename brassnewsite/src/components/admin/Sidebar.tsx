"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  MessageSquare,
  Video,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
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

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <aside className="w-72 min-h-screen bg-[#889551] text-[#f4f2dd] p-6 hidden md:flex flex-col justify-between">

      <div>

        <h1 className="text-3xl font-bold mb-10">
          BRASS ADMIN
        </h1>

        <nav className="flex flex-col gap-3">

          {links.map((link) => {

            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#e4e198] hover:text-[#889551] transition"
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}

        </nav>

      </div>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#e4e198] text-[#889551] font-semibold"
      >
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}