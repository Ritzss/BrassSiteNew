import Footer from "@/components/Global/Footer";
import Navbar from "@/components/Navigation/Navbar";

import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#f4f2dd] dark:bg-[#889551] text-black dark:text-black min-h-screen">

      {/* Navbar */}
      <div className="hidden md:block sticky top-0 z-10">
        <Navbar />
      </div>

      {/* Main */}
      <div className="min-h-screen">
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default layout;