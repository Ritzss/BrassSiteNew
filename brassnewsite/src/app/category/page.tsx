/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
// import ProductCard from "@/components/UI/ProductCard";
import { similarProducts } from "@/Demo/data/similarProduct";
import ProductCard from "@/components/Pages/Product/ProductCard";
import MobileHomeExperience from "@/components/Home/mobileHomeExperience";

const getProductImage = (product: any) => {
  return product?.variants?.[0]?.images?.[0] || null;
};

const getProductCategory = (product: any) => {
  return product?.category || "Brassware";
};

const formatCategory = (category: string) => {
  return category
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export default function CategoryPage() {
  /*
   * FOR NOW:
   * Use the existing similarProducts demo dataset.
   *
   * Later this can be replaced with the IMS API without
   * changing the visual structure of this page.
   */
  const products = similarProducts || [];

  /*
   * Build categories from the existing products.
   */
  const categoryMap = new Map<string, any[]>();

  products.forEach((product: any) => {
    const category = getProductCategory(product);
    const key = category.toLowerCase();

    if (!categoryMap.has(key)) {
      categoryMap.set(key, []);
    }

    categoryMap.get(key)!.push(product);
  });

  const categories = Array.from(categoryMap.entries()).map(
    ([slug, categoryProducts]) => ({
      slug,
      name: formatCategory(slug),
      products: categoryProducts,
      image: "/Demo/Images/image2.png",
      count: `${categoryProducts.length}+ Items`,
    }),
  );

  /*
   * Use the first category as the large editorial block
   * and the next two as the smaller stacked blocks.
   */
  const mainCategory = categories[0];
  const secondaryCategories = categories.slice(1, 3);

  return (
    <>
      {/* Mobile app-style category experience */}
      <div className="block md:hidden">
        <MobileHomeExperience />
      </div>
    <div className="hidden md:block min-h-screen bg-[#F7F5EC] text-[#0E4001]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="mx-auto max-w-375 px-4 pt-5 sm:px-8 lg:px-12 bg-[linear-gradient(180deg,#0E4001_0%,#294F1E_10%,#627746_22%,#A5A36C_36%,#D6D39A_52%,#ECE8C5_70%,#F4F2DD_88%,#F4F2DD_100%)]">
        <div
          className="
            relative
            min-h-105
            overflow-hidden
            rounded-[30px]
            bg-[#F0EFE8]
            sm:min-h-120
          "
        >
          {/* Decorative circle */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-72
              w-72
              rounded-full
              border
              border-[#889551]/20
              bg-[#E4E198]/10
            "
          />

          {/* Hero content */}

          <div
            className="
              relative
              z-20
              flex
              min-h-105
              max-w-xl
              flex-col
              justify-center
              px-7
              py-14
              sm:min-h-120
              sm:px-12
              lg:px-16
            "
          >
            <span
              className="
                w-fit
                rounded-full
                bg-white
                px-4
                py-2
                text-[9px]
                font-medium
                uppercase
                tracking-[0.15em]
              "
            >
              Handcrafted Brass Collection
            </span>

            <h1
              className="
                mt-6
                font-serif
                text-4xl
                italic
                leading-[1.02]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Timeless brassware
              <br />
              for everyday living.
            </h1>

            <p
              className="
                mt-5
                max-w-lg
                text-sm
                leading-7
                text-[#0E4001]/55
              "
            >
              Discover handcrafted pieces designed to bring warmth,
              tradition and character to your everyday rituals.
            </p>

            <Link
              href="#products"
              className="
                mt-7
                flex
                w-fit
                items-center
                gap-3
                rounded-full
                bg-[#0E4001]
                px-6
                py-3.5
                text-[9px]
                uppercase
                tracking-[0.14em]
                text-[#F4F2DD]
                transition
                hover:bg-[#355B2A]
              "
            >
              Explore Collection
              <span>→</span>
            </Link>
          </div>

          {/* Hero product image */}

          {mainCategory?.image && (
            <div
              className="
                absolute
                bottom-0
                right-0
                hidden
                h-full
                w-[48%]
                lg:block
              "
            >
              <Image
                src={mainCategory.image}
                alt={mainCategory.name}
                fill
                priority
                className="
                  object-contain
                  object-bottom
                  p-10
                "
                sizes="48vw"
              />
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="mx-auto max-w-375 px-4 sm:px-8 lg:px-12">
        <div className="grid bg-white sm:grid-cols-3">
          {[
            {
              title: "Free Shipping",
              text: "Free delivery on selected orders",
              icon: "◌",
            },
            {
              title: "Flexible Payment",
              text: "Multiple secure payment options",
              icon: "¤",
            },
            {
              title: "Customer Support",
              text: "We're here whenever you need us",
              icon: "◎",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`
                flex
                items-center
                gap-4
                px-6
                py-7
                ${
                  index < 2
                    ? "border-b border-[#0E4001]/10 sm:border-b-0 sm:border-r"
                    : ""
                }
              `}
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E4E198]
                  text-lg
                "
              >
                {item.icon}
              </div>

              <div>
                <p className="text-sm font-medium">
                  {item.title}
                </p>

                <p className="mt-1 text-[10px] text-[#0E4001]/45">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CATEGORY MOSAIC
      ===================================================== */}

      {categories.length > 0 && (
        <section className="mx-auto max-w-375 px-4 py-16 sm:px-8 lg:px-12 ">
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
                Explore
              </p>

              <h2 className="mt-2 font-serif text-4xl italic sm:text-5xl">
                Shop by category
              </h2>
            </div>

            <span className="hidden text-[9px] uppercase tracking-[0.18em] text-[#889551] sm:block">
              {categories.length} Categories
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {/* =================================================
                LARGE CATEGORY
            ================================================= */}

            {mainCategory && (
              <Link
                href={`/category/${mainCategory.slug}`}
                className="group border rounded-4xl bg-[linear-gradient(180deg,#0E4001_0%,#294F1E_10%,#627746_22%,#A5A36C_36%,#D6D39A_52%,#ECE8C5_70%,#F4F2DD_88%,#F4F2DD_100%)]"
              >
                <article
                  className=" relative h-[] overflow-hidden rounded-[28px] bg-[#EEEDE7]"
                  style={{height:'50vh'}}
                >
                  {mainCategory.image && (
                    <Image
                      src={mainCategory.image}
                      alt={mainCategory.name}
                      fill
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                      sizes="50vw"
                    />
                  )}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-linear-to-r
                      from-[#F4F2DD]
                      via-[#F4F2DD]/80
                      to-transparent
                    "
                  />

                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-full
                      max-w-xs
                      flex-col
                      justify-end
                      p-8
                      sm:p-10
                    "
                  >
                    <span
                      className="
                        w-fit
                        rounded-full
                        bg-white
                        px-4
                        py-2
                        text-[9px]
                      "
                    >
                      {mainCategory.count}
                    </span>

                    <h3 className="mt-5 font-serif text-4xl italic">
                      {mainCategory.name}
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-[#0E4001]/50">
                      Discover our handcrafted collection of{" "}
                      {mainCategory.name.toLowerCase()}.
                    </p>

                    <span
                      className="
                        mt-7
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-[#0E4001]
                        text-[#E4E198]
                        transition-transform
                        duration-300
                        group-hover:rotate-45
                      "
                    >
                      →
                    </span>
                  </div>
                </article>
              </Link>
            )}

            {/* =================================================
                SECONDARY CATEGORIES
            ================================================= */}

            <div className="grid gap-5">
              {secondaryCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group border rounded-4xl bg-[linear-gradient(180deg,#0E4001_0%,#294F1E_10%,#627746_22%,#A5A36C_36%,#D6D39A_52%,#ECE8C5_70%,#F4F2DD_88%,#F4F2DD_100%)]"
                >
                  <article
                    className="
                      relative
                      min-h-64
                      overflow-hidden
                      rounded-[28px]
                      bg-[#EEEDE7]
                    "
                  >
                    {category.image && (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="
                          object-cover
                          object-right
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                        sizes="50vw"
                      />
                    )}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-linear-to-r
                        from-[#F4F2DD]
                        via-[#F4F2DD]/75
                        to-transparent
                      "
                    />

                    <div
                      className="
                        relative
                        z-10
                        flex
                        h-full
                        max-w-xs
                        flex-col
                        justify-end
                        p-7
                        sm:p-9
                      "
                    >
                      <span
                        className="
                          w-fit
                          rounded-full
                          bg-white
                          px-4
                          py-2
                          text-[9px]
                        "
                      >
                        {category.count}
                      </span>

                      <h3 className="mt-4 font-serif text-3xl italic">
                        {category.name}
                      </h3>

                      <p className="mt-2 text-[10px] text-[#0E4001]/50">
                        Explore the collection →
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* =================================================
              EXTRA CATEGORIES
          ================================================= */}

          {categories.length > 3 && (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categories.slice(3).map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group"
                >
                  <article
                    className="
                      relative
                      aspect-[1.15]
                      overflow-hidden
                      rounded-[24px]
                      bg-[#EEEDE7]
                    "
                  >
                    {category.image && (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-[#0E4001]/85 via-transparent to-transparent" />

                    <div className="absolute bottom-5 left-5 text-[#F4F2DD]">
                      <p className="text-[8px] uppercase tracking-[0.2em] text-[#E4E198]">
                        {category.count}
                      </p>

                      <h3 className="mt-1 font-serif text-2xl italic">
                        {category.name}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section
        id="products"
        className="mx-auto max-w-375 px-4 pb-20 sm:px-8 lg:px-12"
      >
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.28em]
                text-[#889551]
              "
            >
              Our Products
            </p>

            <h2 className="mt-2 font-serif text-4xl italic sm:text-5xl">
              Our Collection
            </h2>
          </div>

          <span className="text-[9px] uppercase tracking-[0.15em] text-[#0E4001]/40">
            {products.length} Products
          </span>
        </div>

        {/* =====================================================
            PRODUCT GRID

            Uses your existing ProductCard, so:
            - Real product data
            - Real images
            - Real variants
            - Real prices
            - Add to Cart works through AppContext
        ===================================================== */}

        {products.length > 0 ? (
          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {products.map((product: any) => (
              <ProductCard
                key={String(product.Productid)}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div
            className="
              rounded-[28px]
              border
              border-[#0E4001]/10
              bg-white
              px-6
              py-20
              text-center
            "
          >
            <p className="font-serif text-2xl italic">
              No products available.
            </p>
          </div>
        )}
      </section>

      {/* =====================================================
          EDITORIAL BANNER
      ===================================================== */}

      <section className="mx-auto max-w-375 px-4 pb-20 sm:px-8 lg:px-12">
        <div
          className="
            grid
            overflow-hidden
            rounded-[30px]
            bg-[#E8E6D9]
            lg:grid-cols-2
          "
        >
          <div className="relative min-h-80">
            {mainCategory?.image && (
              <Image
                src={mainCategory.image}
                alt="Brass collection"
                fill
                className="object-contain p-10"
              />
            )}
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-[#889551]
              "
            >
              Crafted for life
            </p>

            <h2 className="mt-3 font-serif text-4xl italic sm:text-5xl">
              Made to last.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#0E4001]/50">
              Traditional craftsmanship, timeless materials and pieces made
              for everyday rituals.
            </p>

            <Link
              href="#products"
              className="
                mt-7
                w-fit
                rounded-full
                bg-[#0E4001]
                px-6
                py-3.5
                text-[9px]
                uppercase
                tracking-[0.14em]
                text-[#F4F2DD]
              "
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}