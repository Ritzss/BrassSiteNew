import Footer from "@/components/Global/Footer";
import Navbar from "@/components/Navigation/Navbar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#F4F2DD] text-[#0E4001]">
      {/* Desktop navigation */}
      <div className="sticky top-0 z-50 hidden md:block">
        <Navbar />
      </div>

      {/* Page content */}
      <main className="min-h-screen">{children}</main>

      {/* Global footer */}
      <Footer />
    </div>
  );
};

export default Layout;