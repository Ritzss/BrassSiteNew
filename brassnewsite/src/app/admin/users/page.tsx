export default function UsersPage() {

  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold text-[#889551] dark:text-[#f4f2dd]">
        Users
      </h1>

      <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-6 border border-[#889551]">

        <div className="space-y-4">

          <div className="flex justify-between bg-[#f4f2dd] dark:bg-[#889551] p-4 rounded-xl">
            <span>ritanshu@gmail.com</span>
            <span>Customer</span>
          </div>

          <div className="flex justify-between bg-[#f4f2dd] dark:bg-[#889551] p-4 rounded-xl">
            <span>admin@gmail.com</span>
            <span>Admin</span>
          </div>

        </div>

      </div>

    </div>
  );
}