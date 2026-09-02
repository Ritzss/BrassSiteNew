"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronDown } from "react-icons/fi";

export type SortOption = "featured" | "price-low" | "price-high" | "name";

interface SortDropdownProps {
  sort: SortOption;
  setSort: (value: SortOption) => void;
}

const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  "price-low": "Price: Low to High",
  "price-high": "Price: High to Low",
  name: "Name",
};

export default function SortDropdown({ sort, setSort }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [position, setPosition] = useState({
    top: 0,
    right: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * Calculate the dropdown position from the button.
   * Because the dropdown is portaled to <body>, it needs
   * explicit coordinates instead of absolute positioning.
   */
  const updatePosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleResize = () => updatePosition();
    const handleScroll = () => updatePosition();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  /*
   * Close when clicking outside the dropdown/button.
   */
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      const dropdown = document.getElementById("sort-dropdown");

      if (buttonRef.current?.contains(target) || dropdown?.contains(target)) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  /*
   * ESC closes the dropdown.
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const dropdown =
    mounted &&
    isOpen &&
    createPortal(
      <div
        id="sort-dropdown"
        className="
          fixed
          z-[99998]
          w-48
          overflow-hidden
          rounded-2xl
          border
          border-[#0E4001]/10
          bg-[#F4F2DD]
          p-1
          shadow-[0_15px_40px_rgba(14,64,1,0.18)]
        "
        style={{
          top: position.top,
          right: position.right,
        }}
      >
        {(Object.entries(sortLabels) as [SortOption, string][]).map(
          ([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setSort(value);
                setIsOpen(false);
              }}
              className={`
              w-full
              rounded-xl
              px-4
              py-3
              text-left
              text-[9px]
              uppercase
              tracking-[0.12em]
              transition
              ${
                sort === value
                  ? "bg-[#E4E198]/40 text-[#0E4001]"
                  : "text-[#0E4001]/60 hover:bg-[#E4E198]/25"
              }
            `}
            >
              {label}
            </button>
          ),
        )}
      </div>,
      document.body,
    );

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (!isOpen) {
            updatePosition();
          }

          setIsOpen((current) => !current);
        }}
        className="
          flex
          items-center
          gap-2
          rounded-full
          border
          border-[#0E4001]/10
          bg-[#E4E198]
          px-4
          py-2.5
          text-[9px]
          uppercase
          tracking-[0.15em]
          text-[#0E4001]
          transition
          hover:bg-[#d8d47f]
        "
      >
        {sortLabels[sort]}

        <FiChevronDown
          size={13}
          className={`
            transition-transform
            duration-200
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {dropdown}
    </>
  );
}
