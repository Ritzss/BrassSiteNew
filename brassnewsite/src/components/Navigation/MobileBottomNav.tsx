"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  ShoppingBag,
  UserRound,
  LayoutGrid,
} from "lucide-react";

const navigationItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Shop",
    href: "/category",
    icon: LayoutGrid,
  },
  {
    label: "Search",
    href: "/search",
    icon: Search,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: ShoppingBag,
  },
  {
    label: "Account",
    href: "/account",
    icon: UserRound,
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="
        fixed inset-x-0 bottom-0 z-[9999]
        border-t border-[#E4E198]/20
        bg-[#0E4001]/95
        backdrop-blur-xl
        md:hidden
      "
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex min-w-[58px] flex-col items-center justify-center
                gap-1 rounded-2xl px-2 py-1.5
                transition-all duration-200
                ${
                  isActive
                    ? "text-[#E4E198]"
                    : "text-[#F4F2DD]/55"
                }
              `}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.2 : 1.7}
              />

              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}