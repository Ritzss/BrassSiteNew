export default function Topbar() {

  return (
    <header className="h-20 bg-[#e4e198] dark:bg-[#5f6b35] flex items-center justify-between px-6 border-b border-[#889551]">

      <div>
        <h2 className="text-2xl font-bold text-[#889551] dark:text-[#f4f2dd]">
          Admin Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">

        <div className="w-11 h-11 rounded-full bg-[#889551] text-[#f4f2dd] flex items-center justify-center font-bold">
          A
        </div>

      </div>

    </header>
  );
}