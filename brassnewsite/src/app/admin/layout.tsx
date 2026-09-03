import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F2DD] text-[#0E4001]">
      <div className="flex min-h-screen">
        {/* Desktop navigation */}
        <Sidebar />

        {/* Main application area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          {/* 
            Children already contain their own page-level
            semantic elements, so this remains a div rather
            than nesting another <main>.
          */}
          <div className="min-w-0 flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}