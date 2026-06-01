interface Props {
  title: string;
  value: string;
}

export default function StatCard({
  title,
  value,
}: Props) {

  return (
    <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-6 shadow-lg border border-[#889551]">

      <h3 className="text-[#889551] dark:text-[#f4f2dd] text-lg font-medium">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-4 text-[#889551] dark:text-[#f4f2dd]">
        {value}
      </p>

    </div>
  );
}