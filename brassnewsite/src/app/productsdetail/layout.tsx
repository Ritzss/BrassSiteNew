import Navbar, { MobileNavbar } from "@/components/Navigation/Navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
  <div className={`bg-[#f4f2dd] dark:text-black text-white`}>
    <div className="hidden md:block"><Navbar /></div>
    <div className="block md:hidden"><MobileNavbar/></div>
    <div>{children}</div>
  </div>
);
};

export default layout;
