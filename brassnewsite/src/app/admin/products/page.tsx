export default function ProductsPage() {

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <h1 className="text-4xl font-bold text-[#889551] dark:text-[#f4f2dd]">
          Products
        </h1>

        <button className="bg-[#889551] text-[#f4f2dd] px-5 py-3 rounded-xl font-semibold">
          Add Product
        </button>

      </div>

      <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-6 overflow-x-auto border border-[#889551]">

        <table className="w-full">

          <thead>
            <tr className="text-left border-b border-[#889551]">
              <th className="pb-4">Product</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Price</th>
              <th className="pb-4">Stock</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b border-[#889551]/30">
              <td className="py-4">Brass Bowl</td>
              <td>Kitchen</td>
              <td>$12.00</td>
              <td>24</td>
              <td className="flex gap-3 py-4">
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}