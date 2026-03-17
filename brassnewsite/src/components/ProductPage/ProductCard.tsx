import { Product } from "@/Types/Product";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const handleAddtoCart = () => {
    toast.success("Product Added to Cart");
  };

  const variant = product?.variants?.[0];

  return (
    <div className="cursor-default p-4 inter text-white">
      <Link
        href={`/productsdetail/${product.Productid}`}
        className="overflow-hidden rounded-t-3xl rounded-lg bg-[#e4e198] block"
      >
        <Image
          src={variant?.images?.[0] || ""}
          alt=""
          width={300}
          height={300}
          className="h-86.5 overflow-hidden"
        />

        <div className="px-3 text-xl pt-2 font-semibold">{product.name}</div>

        <div className="p-2 text-white group">
          {product.details?.features?.[0]}...
          <span className="text-xs group-hover:text-[#889551] group-hover:underline transition-colors duration-500">See More</span>
        </div>

        <div className="flex py-3 justify-around">
          <button
            onClick={handleAddtoCart}
            className="cursor-pointer text-xl bg-[#889551] hover:shadow-[0_2px_5px_#000000af] text-white rounded-full p-3"
          >
            Add to Cart
          </button>

          <div className="w-[40%] text-center text-[#889551] relative">
            <div className="text-sm">MRP: ${variant?.mrp}</div>
            <div className="absolute w-[75%] border -rotate-8 -translate-2.5 translate-x-4"></div>
            <div className="text-xl">${variant?.price}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;