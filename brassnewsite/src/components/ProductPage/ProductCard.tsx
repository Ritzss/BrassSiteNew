import { Product } from "@/Types/Product"
import Image from "next/image";
import { toast } from "sonner";

const ProductCard = ({product}:{product?:Product[]}) => {
  const handleAddtoCart = ()=>{
    toast.success("Product Added to Cart")
  };
  return (
    <div className="cursor-default p-4">
      {product?.map((prod, ind) => {
      const variant = prod?.variants?.[0];
        return (
          <div key={ind} className="overflow-hidden rounded-lg bg-[#e4e198]">
            <Image src={variant?.images?.[0] || ""} alt="" width={300} height={300} className="border overflow-hidden"/>
            <div className="px-3 pt-2 font-semibold">{prod.name}</div>
            <div className="p-2 w-70 line-clamp-">{prod.D_discription?.substring(0, 50)}...See More</div>
            <div className="flex py-3 justify-around">
              <button onClick={handleAddtoCart} className="cursor-pointer text-xl bg-[#889551] hover:shadow-[0_2px_5px_#000000af] text-white rounded-full p-3 text-center ">
              Add to Cart
            </button>
            <div className="w-[40%] text-center text-[#889551] relative">
              <div className="text-sm">MRP:${variant?.mrp}</div>
              <div className="absolute w-[75%] border -rotate-8 -translate-2.5 translate-x-4"></div>
              <div className="text-xl">${variant?.price}</div>
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard