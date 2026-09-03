import Footer from "@/components/Global/Footer";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import VideosSection from "@/components/Home/VideosSection";
import HomeSlider from "@/components/Home/HomeSlider";
import Navbar from "@/components/Navigation/Navbar";
import CurvedCarousel from "@/components/UI/CurvedCarousel";
import { similarProducts } from "@/Demo/data/similarProduct";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  {
    number: "01",
    title: "Ayurvedic Benefits",
    icon: "/Assets/Icons/whiteplant.png",
    alt: "Plant",
    text: "Brass naturally balances the three doshas and improves overall health according to Ayurvedic principles.",
  },
  {
    number: "02",
    title: "Anti-Bacterial",
    icon: "/Assets/Icons/whiteantibacterial.png",
    alt: "Anti-Bacterial",
    text: "Brass naturally balances the three doshas and improves overall health according to Ayurvedic principles.",
  },
  {
    number: "03",
    title: "Eco-Friendly",
    icon: "/Assets/Icons/whiteecology.png",
    alt: "Eco-Friendly",
    text: "Brass is a durable, reusable material that brings traditional utility into a more sustainable everyday routine.",
  },
];

export default function Home() {
  const bestSellerProducts = similarProducts.slice(0, 7);
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4F2DD] text-[#0E4001]">
      {/* =========================================================
          HERO
          Uses the reference-style large canvas composition while
          retaining the original green + brass brand identity.
          ========================================================= */}
      <section
        id="home"
        className="
          relative overflow-hidden
          bg-[linear-gradient(180deg,#0E4001_0%,#315A22_24%,#889551_55%,#C8C98C_78%,#E4E198_90%,#F4F2DD_100%)]
          pb-24 pt-3 sm:pb-32
        "
      >
        {/* Soft brass/green atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-52 -top-56 h-175 w-175 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(228,225,152,.22) 0%, transparent 68%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-56 top-[25%] h-180 w-180 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(14,64,1,.34) 0%, transparent 68%)",
          }}
        />

        {/* =========================================================
    FLOATING GLASS NAVBAR
    ========================================================= */}
        <div className="sticky top-4 z-50 px-4 sm:px-8 lg:px-14">
          <div
            className="
    h-20
      mx-auto
      max-w-400
      overflow-hidden
      rounded-full
      border
      border-[#E4E198]/25
      bg-[#0E4001]/85
      shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)]
      backdrop-blur-xl
    "
          >
            <Navbar />
          </div>
        </div>

        <div className="relative mx-auto mt-9 max-w-400 px-4 sm:mt-14 sm:px-8 lg:mt-16 lg:px-14">
          <div className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-[#F4F2DD]/75">
            <span className="h-px w-8 bg-[#E4E198]/70" />
            &quot;brandName&quot; / Brass Collection
          </div>

          <div className="relative">
            {/* Large visual canvas. HomeSlider remains the actual
                functional hero rather than being replaced. */}
            <div
              className="
                relative z-10 ml-0 overflow-hidden rounded-4xl
                border border-[#E4E198]/25
                bg-[#0E4001]/20
                shadow-[0_55px_120px_-45px_rgba(14,64,1,.75)]
                sm:rounded-[2.75rem]
                lg:ml-[11%]
              "
            >
              <HomeSlider />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-wrap justify-between gap-3 border-t border-[#E4E198]/20 bg-[#0E4001]/25 px-5 py-4 backdrop-blur-md sm:px-8">
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#F4F2DD]/85">
                  Pure Brass / Everyday Wellness
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#E4E198]/75">
                  Traditional craft / Modern living
                </span>
              </div>
            </div>

            {/* Editorial copy overlaps the hero canvas on desktop. */}
            <div className="relative z-20 mt-8 max-w-xl text-[#F4F2DD] lg:absolute lg:left-0 lg:top-20 lg:mt-0 lg:w-[36%]">
              <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-[#E4E198]/75">
                The &quot;brandName&quot; Edit
              </p>

              <h1 className="font-serif text-[2.8rem] italic leading-[0.94] sm:text-6xl lg:text-[4.4rem]">
                Timeless
                <br />
                brass.
                <br />
                Modern ritual.
              </h1>

              <p className="mt-6 max-w-sm text-sm leading-7 text-[#F4F2DD]/80 sm:text-[15px]">
                Discover the character of brass through thoughtfully designed
                pieces made for everyday living, dining and wellness.
              </p>

              <Link
                href="/collection"
                className="group mt-8 inline-flex items-center gap-4 border-b border-[#E4E198]/55 pb-2 text-[10px] uppercase tracking-[0.22em] transition-colors hover:border-[#E4E198]"
              >
                Explore collection
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-8 right-5 z-30 hidden h-24 w-24 items-center justify-center rounded-full border border-[#E4E198]/45 bg-[#E4E198]/10 text-center font-serif text-sm italic text-[#F4F2DD]/85 backdrop-blur-md sm:flex"
            >
              <span>
                pure
                <br />
                brass
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY CHOOSE BRASS
          ========================================================= */}
      <section
        id="benefits"
        className="bg-[#F4F2DD] px-5 py-24 sm:px-8 sm:py-32 lg:px-14"
      >
        <div className="mx-auto max-w-375">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#0E4001]/55">
                01 / Why brass
              </p>

              <h2 className="mt-4 font-serif text-4xl italic leading-tight text-[#0E4001] sm:text-5xl">
                Why choose
                <br />
                brass?
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-[#0E4001]/65 sm:text-base">
              Discover the health benefits and timeless elegance of brass
              bottles through three qualities at the heart of the collection.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-4xl border border-[#0E4001]/10 bg-[#0E4001]/10 md:grid-cols-3">
            {benefits.map((item) => (
              <article
                key={item.number}
                className="
                  group relative min-h-87.5 overflow-hidden
                  bg-[#889551] p-7
                  transition-colors duration-500 hover:bg-[#0E4001]
                  sm:p-9
                "
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E4E198]/80">
                    {item.number}
                  </span>

                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={72}
                    height={72}
                    className="h-35 w-100 object-contain opacity-90 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105"
                  />
                </div>

                <div className="absolute bottom-8 left-7 right-7 sm:left-9 sm:right-9">
                  <h3 className="font-serif text-2xl italic text-[#F4F2DD]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[#F4F2DD]/80">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORY
          Existing routes are preserved.
          ========================================================= */}
      <section
        id="category"
        className="bg-[#E4E198] px-5 py-24 sm:px-8 sm:py-32 lg:px-14"
      >
        <div className="mx-auto max-w-375">
          <div className="mb-14 flex items-end justify-between gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#0E4001]/55">
                02 / Discover
              </p>

              <h2 className="mt-3 font-serif text-4xl italic text-[#0E4001] sm:text-5xl">
                Shop by category
              </h2>
            </div>

            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-[#0E4001]/50 sm:block">
              Three ways in
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
            <Link
              href="/category/bowls"
              className="group relative min-h-130 overflow-hidden rounded-4xl bg-[#0E4001] shadow-[0_30px_70px_-40px_rgba(14,64,1,.65)]"
            >
              <Image
                src="/Demo/Images/image.png"
                alt="Bowls"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#0E4001]/90 via-[#0E4001]/15 to-transparent" />

              <div className="absolute bottom-8 left-8 text-[#F4F2DD] sm:bottom-10 sm:left-10">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#E4E198]/80">
                  Collection 01
                </span>

                <h3 className="mt-2 font-serif text-5xl italic sm:text-6xl">
                  Bowls
                </h3>

                <span className="mt-5 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]">
                  View collection
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </div>
            </Link>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Link
                href="/category/bottles"
                className="group relative min-h-62.5 overflow-hidden rounded-4xl bg-[#889551]"
              >
                <Image
                  src="/Demo/Images/image.png"
                  alt="Bottles"
                  fill
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#0E4001]/80 to-transparent" />

                <div className="absolute bottom-6 left-7 text-[#F4F2DD]">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E4E198]/80">
                    Collection 02
                  </span>
                  <h3 className="mt-1 font-serif text-4xl italic">Bottles</h3>
                </div>
              </Link>

              <Link
                href="/category/plates"
                className="group relative min-h-62.5 overflow-hidden rounded-4xl bg-[#889551]"
              >
                <Image
                  src="/Demo/Images/image.png"
                  alt="Plates"
                  fill
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#0E4001]/80 to-transparent" />

                <div className="absolute bottom-6 left-7 text-[#F4F2DD]">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E4E198]/80">
                    Collection 03
                  </span>
                  <h3 className="mt-1 font-serif text-4xl italic">Plates</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BESTSELLERS
          ========================================================= */}
      <section
        id="bestseller"
        className="bg-[#F4F2DD] px-5 py-24 sm:px-8 sm:py-32 lg:px-14"
      >
        <div className="mx-auto max-w-375">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#0E4001]/55">
                03 / The edit
              </p>

              <h2 className="mt-3 font-serif text-4xl italic text-[#0E4001] sm:text-5xl">
                Bestsellers
              </h2>
            </div>

            <span className="text-[10px] uppercase tracking-[0.2em] text-[#0E4001]/45">
              Curated favourites
            </span>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-[#0E4001]/10 bg-[#E4E198] py-10 sm:py-2">
            <CurvedCarousel products={bestSellerProducts} />
          </div>

          <div className="mx-auto mt-14 max-w-2xl text-center">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#0E4001]/55">
              Begin here
            </p>

            <h3 className="mt-3 font-serif text-3xl italic text-[#0E4001] sm:text-4xl">
              Start Your Wellness Journey
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#0E4001]/60">
              Join thousands of satisfied customers who have embraced the
              ancient wisdom of brass bottles.
            </p>

            <Link
              href="/collection"
              className="
                group mt-7 inline-flex items-center gap-4
                rounded-full bg-[#0E4001] px-7 py-3
                text-[10px] uppercase tracking-[0.2em] text-[#E4E198]
                shadow-[0_12px_25px_-15px_rgba(14,64,1,.7)]
                transition duration-300
                hover:bg-[#889551] hover:shadow-lg
              "
            >
              Explore now
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>
        </div>
       </section>

      {/* =========================================================
          TESTIMONIALS
          Reads active testimonials directly from MongoDB.
          ========================================================= */}
      <TestimonialsSection />

      {/* =========================================================
          VIDEOS
          Reads active videos directly from MongoDB.
          ========================================================= */}
      <VideosSection />

      <Footer />
    </main>
  );
}
