import Footer from "@/components/Global/Footer";
import Navbar, { MobileNavbar } from "@/components/Navigation/Navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
  <div className={`bg-[#f4f2dd] dark:bg-[#889551] dark:text-black text-black sticky top-2.5`}>
    <div className="hidden md:block"><Navbar /></div>
    <div className="block md:hidden"><MobileNavbar/></div>
    <div className="min-h-screen">{children}</div>
    <div><Footer /></div>
  </div>
);
};

export default layout;
