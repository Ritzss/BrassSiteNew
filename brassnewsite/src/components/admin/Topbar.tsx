"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface StoredUser {
  name?: string;
  email?: string;
  role?: string;
}

export default function Topbar() {
  const [user, setUser] = useState<StoredUser | null>(
    null,
  );

  /* =========================================================
    LOAD CURRENT USER
  ========================================================= */

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(
        "Failed to load admin user:",
        error,
      );
    }
  }, []);

  const displayName =
    user?.name ||
    user?.email?.split("@")[0] ||
    "Admin";

  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "A";

  return (
    <header
      className="
        sticky
        top-0
        z-40
        border-b
        border-[#0E4001]/[0.08]
        bg-[#F4F2DD]/85
        backdrop-blur-2xl
      "
    >
      <div
        className="
          flex
          h-[72px]
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ===================================================
            LEFT
        =================================================== */}

        <div className="flex items-center gap-3">
          <div>
            <p className="text-[7px] uppercase tracking-[0.28em] text-[#889551]">
              Administration
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <h2
                className="
                  font-serif
                  text-xl
                  italic
                  leading-none
                  text-[#0E4001]
                  sm:text-2xl
                "
              >
                Store Overview
              </h2>

              <ChevronRight
                size={13}
                className="text-[#889551]"
              />
            </div>
          </div>
        </div>

        {/* ===================================================
            RIGHT
        =================================================== */}

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Store status */}

          <div
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-[#0E4001]/10
              bg-white/45
              px-3
              py-2
              backdrop-blur-md
              sm:flex
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#889551]" />

            <span className="text-[7px] uppercase tracking-[0.15em] text-[#0E4001]/50">
              Store Live
            </span>
          </div>

          {/* Notification */}

          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[#0E4001]/10
              bg-white/50
              text-[#0E4001]
              backdrop-blur-md
              transition
              hover:bg-[#E4E198]/60
            "
          >
            <Bell
              size={16}
              strokeWidth={1.5}
            />

            {/* Notification indicator */}

            <span
              className="
                absolute
                right-2
                top-2
                h-1.5
                w-1.5
                rounded-full
                bg-[#889551]
              "
            />
          </button>

          {/* Divider */}

          <div className="hidden h-7 w-px bg-[#0E4001]/10 sm:block" />

          {/* User */}

          <div className="flex items-center gap-2.5">
            <div className="hidden text-right sm:block">
              <p className="text-[10px] font-medium text-[#0E4001]">
                {displayName}
              </p>

              <div className="mt-0.5 flex items-center justify-end gap-1">
                <ShieldCheck
                  size={9}
                  className="text-[#889551]"
                />

                <p className="text-[7px] uppercase tracking-[0.12em] text-[#0E4001]/35">
                  {user?.role || "Administrator"}
                </p>
              </div>
            </div>

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[#0E4001]
                font-serif
                text-sm
                italic
                text-[#E4E198]
                shadow-[0_8px_20px_rgba(14,64,1,0.15)]
              "
            >
              {initials}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}