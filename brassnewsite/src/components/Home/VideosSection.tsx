import connectDB from "@/lib/connectDB";
import Video from "@/models/Video";
import Image from "next/image";
import Link from "next/link";

function getEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    // Standard YouTube URL:
    // https://www.youtube.com/watch?v=VIDEO_ID
    if (parsed.hostname.includes("youtube.com")) {
      const videoId =
        parsed.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // Already an embed URL.
      if (
        parsed.pathname.startsWith("/embed/")
      ) {
        return url;
      }
    }

    // Short YouTube URL:
    // https://youtu.be/VIDEO_ID
    if (
      parsed.hostname === "youtu.be"
    ) {
      const videoId =
        parsed.pathname.slice(1);

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return url;
  } catch {
    return url;
  }
}

export default async function VideosSection() {
  await connectDB();

  const videos = await Video.find({
    active: true,
  })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  if (!videos.length) {
    return null;
  }

  return (
    <section className="bg-[#0E4001] px-5 py-24 text-[#F4F2DD] sm:px-8 sm:py-32 lg:px-14">
      <div className="mx-auto max-w-375">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#E4E198]/70">
              05 / Watch
            </p>

            <h2 className="mt-3 font-serif text-4xl italic sm:text-5xl">
              The brass story.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#F4F2DD]/60">
            Explore our craft, products and the traditions
            behind the collection.
          </p>
        </div>

        {/* Videos */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {videos.map((video, index) => (
            <article
              key={String(video._id)}
              className={`
                group overflow-hidden rounded-[28px]
                border border-[#E4E198]/15
                bg-[#355B2A]
                ${index === 0 ? "lg:row-span-2" : ""}
              `}
            >
              <div
                className={`
                  relative overflow-hidden
                  ${index === 0
                    ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[600px]"
                    : "aspect-video"
                  }
                `}
              >
                {video.thumbnail ? (
                  <>
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-[#0E4001]/30" />

                    <Link
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${video.title}`}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E4E198] text-xl text-[#0E4001] shadow-[0_15px_40px_rgba(0,0,0,.25)] transition-transform duration-300 group-hover:scale-110">
                        <span className="ml-1">
                          ▶
                        </span>
                      </span>
                    </Link>
                  </>
                ) : (
                  <iframe
                    src={getEmbedUrl(
                      video.videoUrl,
                    )}
                    title={video.title}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>

              <div className="border-t border-[#E4E198]/10 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-xl italic">
                    {video.title}
                  </h3>

                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#E4E198]/50">
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}