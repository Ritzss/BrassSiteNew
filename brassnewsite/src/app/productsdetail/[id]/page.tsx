import DetailPage from "@/components/ProductPage/DetailPage";
import { similarProducts } from "@/Demo/data/similarProduct";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  
  const correctedParams = await params;
  const product = similarProducts.find((p) => p.Productid === correctedParams.id);

  if (!product) return notFound();

  return (
    <div className="min-h-screen">
      <DetailPage product={product} similarProduct={similarProducts} />
    </div>
  );
}
