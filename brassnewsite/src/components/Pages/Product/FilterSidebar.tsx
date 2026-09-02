/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";

type FiltersType = {
  category: string[];
  capacity: string[];
  finish: string[];
  features: string[];
  price: string[];
};

interface FilterSidebarProps {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  hideCategory?: boolean;
}

const filterOptions = {
  price: ["$0 - $25", "$25 - $50", "$50 - $100", "$100+"],
  category: ["Bowls", "Bottles", "Plates", "Glasses"],
  capacity: ["250", "500", "750", "1000"],
  finish: ["Hammered", "Matte", "Polished", "Antique"],
  features: ["Leak Proof", "Handcrafted", "Eco Friendly", "Ayurvedic"],
};

const sectionLabels: Record<keyof typeof filterOptions, string> = {
  price: "Price",
  category: "Category",
  capacity: "Capacity",
  finish: "Finish",
  features: "Features",
};

export default function FilterSidebar({
  filters,
  setFilters,
  hideCategory = false,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [draftFilters, setDraftFilters] = useState<FiltersType>(filters);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    price: true,
    category: true,
    capacity: false,
    finish: false,
    features: false,
  });

  /*
   * createPortal only works in the browser.
   * Waiting for mount prevents hydration mismatch.
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * Keep the temporary filter state synchronized
   * whenever the drawer is opened.
   */
  useEffect(() => {
    if (isOpen) {
      setDraftFilters(filters);
    }
  }, [isOpen, filters]);

  /*
   * Lock page scrolling while the filter drawer is open.
   */
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  /*
   * Allow ESC to close the drawer.
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

  const toggleFilter = (type: keyof FiltersType, value: string) => {
    setDraftFilters((current) => {
      const currentValues = current[type];

      const exists = currentValues.includes(value);

      return {
        ...current,
        [type]: exists
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  const clearAll = () => {
    setDraftFilters({
      category: [],
      capacity: [],
      finish: [],
      features: [],
      price: [],
    });
  };

  const applyFilters = () => {
    setFilters(draftFilters);
    setIsOpen(false);
  };

  const toggleSection = (section: string) => {
    setOpenSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  };

  const activeCount = Object.values(filters).reduce(
    (total, values) => total + values.length,
    0,
  );

  /*
   * IMPORTANT:
   * The drawer is rendered directly under <body>.
   *
   * This prevents parent elements such as:
   * - overflow-hidden
   * - transform
   * - backdrop-filter
   * - z-index stacking contexts
   *
   * from trapping the drawer underneath product images.
   */
  const drawer =
    mounted &&
    createPortal(
      <div
        className={`fixed inset-0 z-99999 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* BACKDROP */}
        <div
          className={` absolute inset-0 bg-[#0E4001]/30 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsOpen(false)}
        />

        {/* DRAWER */}
        <aside
          aria-hidden={!isOpen}
          className={` absolute right-0 top-0 flex h-dvh w-full max-w-97.5 flex-col bg-[#F4F2DD] shadow-[-20px_0_70px_rgba(14,64,1,0.25)] transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* HEADER */}
          <div className=" flex items-center justify-between border-b border-[#0E4001]/10 px-6 py-6">
            <div>
              <p className=" text-[9px] uppercase tracking-[0.2em] text-[#889551] ">
                Refine Collection
              </p>
              <h2 className=" mt-1 font-serif text-2xl italic text-[#0E4001] ">
                Filters
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close filters"
              className=" flex h-9 w-9 items-center justify-center rounded-full border border-[#0E4001]/10 text-[#0E4001] transition hover:bg-[#E4E198]/40"
            >
              <FiX size={16} />
            </button>
          </div>

          {/* FILTER CONTENT */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {(
              Object.keys(filterOptions) as Array<keyof typeof filterOptions>
            ).map((type) => {
              if (type === "category" && hideCategory) {
                return null;
              }

              const options = filterOptions[type];

              return (
                <div key={type} className=" border-b border-[#0E4001]/10 py-5 ">
                  <button
                    type="button"
                    onClick={() => toggleSection(type)}
                    className=" flex w-full items-center justify-between"
                  >
                    <span className=" text-[9px] font-medium uppercase tracking-[0.2em] text-[#0E4001] ">
                      {sectionLabels[type]}
                    </span>

                    <FiChevronDown
                      size={14}
                      className={` text-[#889551] transition-transform duration-200 ${openSections[type] ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openSections[type] && (
                    <div className="mt-4 space-y-3">
                      {options.map((option) => {
                        const checked = draftFilters[type].includes(option);

                        return (
                          <label
                            key={option}
                            className=" flex cursor-pointer items-center gap-3 text-sm text-[#0E4001]/70 "
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleFilter(type, option)}
                              className=" h-4 w-4 appearance-none rounded border border-[#0E4001]/20 bg-transparent checked:border-[#0E4001] checked:bg-[#0E4001] focus:ring-0"
                            />

                            <span>{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* FOOTER ACTIONS */}
          <div className=" border-t border-[#0E4001]/10 bg-[#F4F2DD] px-6 py-5">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={clearAll}
                className=" text-[9px] uppercase tracking-[0.15em] text-[#889551] transition hover:text-[#0E4001]"
              >
                Clear All
              </button>

              <button
                type="button"
                onClick={applyFilters}
                className=" rounded-full bg-[#0E4001] px-6 py-3 text-[9px] uppercase tracking-[0.15em] text-[#F4F2DD] transition hover:bg-[#1a560b]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </aside>
      </div>,
      document.body,
    );

  return (
    <>
      {/* FILTER BUTTON ONLY */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className=" flex items-center gap-2 rounded-full border border-[#0E4001]/10 bg-white/60 px-4 py-2.5 text-[9px] uppercase tracking-[0.15em] text-[#0E4001] transition hover:bg-[#E4E198]/30"
      >
        <FiFilter size={12} />
        Filter
        {activeCount > 0 && (
          <span className=" flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0E4001] px-1 text-[8px] text-white">
            {activeCount}
          </span>
        )}
      </button>

      {/* PORTALED DRAWER */}
      {drawer}
    </>
  );
}
