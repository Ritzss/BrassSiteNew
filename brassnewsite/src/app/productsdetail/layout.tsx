import Footer from "@/components/Global/Footer";
import Navbar, { MobileNavbar } from "@/components/Navigation/Navbar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#f4f2dd] dark:bg-[#889551] text-black dark:text-black min-h-screen">
      {/* Navbar */}

      <div className="hidden md:block sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="block md:hidden sticky top-0 z-50">
        <MobileNavbar />
      </div>

      {/* BREADCRUMB

      <div className="flex items-center gap-2 text-3xl  p-2 opacity-70 mb-4 flex-wrap bg-[#f4f2dd]">
        <Link href="/" className="hover:opacity-100 transition-opacity">
          Home
        </Link>

        <ChevronRight size={30} />

        <span className="opacity-100 font-medium">Brass Collection</span>
      </div> */}
      {/* Main */}


      <div className="min-h-screen">{children}</div>

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default layout;
