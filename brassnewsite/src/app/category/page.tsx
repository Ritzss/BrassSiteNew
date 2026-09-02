import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Bowls",
    slug: "bowls",
    image: "/Demo/Images/image.png",
    description: "Timeless brass bowls for everyday dining.",
  },
  {
    name: "Bottles",
    slug: "bottles",
    image: "/Demo/Images/image.png",
    description: "Traditional brassware for daily hydration.",
  },
  {
    name: "Plates",
    slug: "plates",
    image: "/Demo/Images/image.png",
    description: "Elegant serving pieces with classic character.",
  },
  {
    name: "Glasses",
    slug: "glasses",
    image: "/Demo/Images/image.png",
    description: "Simple brass forms for everyday rituals.",
  },
];

export default function CategoryPage() {
  return (
    <main
      className="
    min-h-screen
    text-[#0E4001]
    bg-[linear-gradient(180deg,#0E4001_0%,#294F1E_10%,#627746_22%,#A5A36C_36%,#D6D39A_52%,#ECE8C5_70%,#F4F2DD_88%,#F4F2DD_100%)]
  "
    >
      {/* =========================================================
          CATEGORY HERO
      ========================================================= */}
      <section className="px-4 pt-6 sm:px-8 lg:px-12">
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-[#0E4001]
            px-6
            py-16
            text-[#F4F2DD]
            shadow-[0_30px_80px_rgba(14,64,1,0.18)]
            sm:px-10
            sm:py-20
            lg:px-16
            lg:py-24
          "
        >
          {/* Decorative circle */}
          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              border
              border-[#E4E198]/20
              bg-[#E4E198]/10
            "
          />

          {/* Decorative circle */}
          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              left-1/3
              h-80
              w-80
              rounded-full
              border
              border-[#889551]/30
              bg-[#889551]/10
            "
          />

          <div className="relative z-10 max-w-2xl">
            <p className="mb-4 text-[9px] uppercase tracking-[0.3em] text-[#E4E198]">
              Explore
            </p>

            <h1
              className="
                font-serif
                text-5xl
                italic
                leading-none
                sm:text-6xl
                lg:text-7xl
              "
            >
              Our Categories
            </h1>

            <p
              className="
                mt-6
                max-w-lg
                text-sm
                leading-6
                text-[#F4F2DD]/60
              "
            >
              Discover handcrafted brassware designed to bring timeless
              character to everyday rituals.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORY COLLECTION
      ========================================================= */}
      <section className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          {/* Section heading */}
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.28em]
                  text-[#889551]
                "
              >
                The Collection
              </p>

              <h2
                className="
                  mt-2
                  font-serif
                  text-3xl
                  italic
                  sm:text-4xl
                "
              >
                Find your brassware.
              </h2>
            </div>

            <span
              className="
                hidden
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-[#889551]
                sm:block
              "
            >
              04 Categories
            </span>
          </div>

          {/* Category cards */}
          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group"
              >
                <article>
                  {/* Image container */}
                  <div
                    className="
                      relative
                      aspect-[0.82]
                      overflow-hidden
                      rounded-[28px]
                      border
                      border-[#0E4001]/10
                      bg-[#E4E198]/40
                    "
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        25vw
                      "
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                    />

                    {/* Number */}
                    <div
                      className="
                        absolute
                        left-4
                        top-4
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#F4F2DD]/30
                        bg-[#0E4001]/70
                        text-[9px]
                        text-[#E4E198]
                        backdrop-blur-md
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Glass information panel */}
                    <div
                      className="
                        absolute
                        inset-x-3
                        bottom-3
                        rounded-[22px]
                        border
                        border-[#F4F2DD]/20
                        bg-[#0E4001]/70
                        p-5
                        text-[#F4F2DD]
                        backdrop-blur-xl
                      "
                    >
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <h3
                            className="
                              font-serif
                              text-2xl
                              italic
                            "
                          >
                            {category.name}
                          </h3>

                          <p
                            className="
                              mt-1
                              text-[10px]
                              leading-5
                              text-[#F4F2DD]/55
                            "
                          >
                            {category.description}
                          </p>
                        </div>

                        {/* Arrow */}
                        <span
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#E4E198]
                            text-[#0E4001]
                            transition-transform
                            duration-300
                            group-hover:-rotate-45
                          "
                        >
                          ↗
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
