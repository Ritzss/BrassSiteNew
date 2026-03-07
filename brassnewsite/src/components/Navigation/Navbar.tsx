"use client";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa6";

const Navbar = () => {
  return (
    <header
      className={`cursor-default lg:px-14 flex justify-center items-center gap-4 dark:bg-[#889551] dark:text-white text-black h-25`}
    >
      <span className="relative flex justify-center lg:p-2 font-extrabold border md:w-15 md:h-7 lg:w-30 lg:h-10">
        <div className="absolute">Logo</div>
      </span>
      <span className="lg:flex-1">
        <span className="relative md:p-1 lg:p-2 flex items-center bg-[#889551] dark:bg-[#f4f2dd] dark:text-[#889551] text-white rounded-lg md:w-60 lg:w-100">
          <span className="absolute">
            <BiSearch size={32} className="" />
          </span>{" "}
          <input
            type="text"
            className="w-full rounded-sm pl-8 outline-0 p-1"
            placeholder="Search"
          />{" "}
        </span>
      </span>
      <span className="lg:p-1.75 dark:text-[#f4f2dd] text-[#889551] flex justify-evenly items-center uppercase md:w-60 lg:w-100">
        <span className="text-lg">Home</span>
        <span className="text-lg">Products</span>
        <span className="cursor-pointer">
          <FaCartArrowDown size={42} />
        </span>
      </span>
    </header>
  );
};

const MobileNavbar = () => {
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <header
      className={`px-5 flex justify-evenly items-center gap-2 dark:bg-[#889551] dark:text-white text-black h-25`}
    >
      <span className="relative p-2 font-extrabold border w-15 h-8">
        <div className="absolute">Logo</div>
      </span>
      <span className="">
        <span className="relative p-1 flex items-center bg-[#889551] dark:text-[#889551] text-white rounded-lg md:w-60 lg:w-100">
          <span className="absolute text-white">
            <BiSearch size={32} className="" />
          </span>{" "}
          <input
            type="text"
            className="w-full rounded-sm pl-8 outline-0 p-1"
            placeholder="Search"
          />{" "}
        </span>
      </span>
      <span className="w-5 flex-col flex gap-1 " onClick={() => setMenu(!menu)}>
        <div
          className={`border w-full transition-all duration-900 ${menu ? "skew-y-45 translate-y-1" : "skew-y-0"}`}
        ></div>
        <div
          className={`border w-full transition-all duration-900 ${menu ? "-skew-y-45 -translate-y-0.5" : "skew-y-0"}`}
        ></div>
      </span>
      {menu && (
        <div className="cursor-pointer dark:text-[#889551] absolute bottom-0 top-20 z-2 bg-white w-full">
          <div className="border-b m-2">Home</div>
          <div className="border-b m-2">Products</div>
          <div className="border-b m-2">Cart</div>
        </div>
      )}
    </header>
  );
};

export { MobileNavbar };

export default Navbar;
