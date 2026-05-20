"use client";

import { ChevronDown } from "lucide-react";

export type FiltersType = {
  category: string[];
  capacity: string[];
  finish: string[];
  features: string[];
  price: string[];
};

type Props = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
};

const filterSections = [
  {
    key: "price",
    title: "Price",
    options: ["$0 - $25", "$25 - $50", "$50 - $100", "$100+"],
  },
  {
    key: "category",
    title: "Category",
    options: ["bottles", "glasses", "plates", "bowls"],
  },
  {
    key: "capacity",
    title: "Capacity",
    options: ["250", "500", "750", "1000"],
  },
  {
    key: "finish",
    title: "Finish",
    options: ["Hammered", "Matte", "Polished", "Antique"],
  },
  {
    key: "features",
    title: "Features",
    options: ["Leak Proof", "Handcrafted", "Eco Friendly", "Ayurvedic"],
  },
];

const FilterSidebar = ({ filters, setFilters }: Props) => {
  const handleChange = (section: keyof FiltersType, value: string) => {
    setFilters((prev) => {
      const exists = prev[section].includes(value);

      return {
        ...prev,

        [section]: exists
          ? prev[section].filter((item) => item !== value)
          : [...prev[section], value],
      };
    });
  };

  return (
    <aside className="hidden ml-5 rounded-2xl lg:block w-70 border-r border-black/10 sticky top-17.5 h-[calc(100vh-70px)] overflow-y-auto px-5 py-6 bg-[#ece8c9] dark:bg-[#f4f2dd] [&::-webkit-scrollbar]:hidden">
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>

      {filterSections.map((section) => (
        <div key={section.key} className="mb-6 border-b border-black/10 pb-4">
          <button className="flex justify-between items-center w-full font-medium text-lg mb-3">
            {section.title}

            <ChevronDown size={18} />
          </button>

          <div className="space-y-2 text-sm">
            {section.options.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters[section.key as keyof FiltersType].includes(
                    item,
                  )}
                  onChange={() =>
                    handleChange(section.key as keyof FiltersType, item)
                  }
                />

                {item}
              </label>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
};

export default FilterSidebar;
