export default function VideosPage() {

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <h1 className="text-4xl font-bold text-[#889551] dark:text-[#f4f2dd]">
          Videos
        </h1>

        <button className="bg-[#889551] text-[#f4f2dd] px-5 py-3 rounded-xl font-semibold">
          Add Video
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="aspect-video rounded-2xl overflow-hidden border border-[#889551]">

          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            allowFullScreen
          />

        </div>

      </div>

    </div>
  );
}