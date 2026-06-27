export default function OrderSuccess({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Order Placed Successfully 🎉
        </h1>

        <p className="mt-4">
          Order Number:
          <span className="font-semibold">
            {searchParams.id}
          </span>
        </p>
      </div>
    </div>
  );
}