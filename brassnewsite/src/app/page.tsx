import Footer from "@/components/Global/Footer";
import HomeSlider from "@/components/Home/HomeSlider";
import Navbar, { MobileNavbar } from "@/components/Navigation/Navbar";
import PipeSection from "@/components/UI/CurvedCarousel";
import Image from "next/image";
import Link from "next/link";
// import Image from "next/image";

export default function Home() {
  return (
    <div
      className={`bg-[#f4f2dd] dark:bg-[#889551] dark:text-black text-black sticky top-2.5`}
    >
      <div className="hidden md:block sticky top-0 z-20">
        <Navbar />
      </div>
      <div className="block md:hidden">
        <MobileNavbar />
      </div>

      {/* Slider */}
      <div id="bestseller" className="">
        <HomeSlider />
      </div>

      {/* Why choose brass */}
      <div
        id="bestseller"
        className="min-h-screen flex flex-col justify-evenly dark:text-white"
      >
        <div className="  flex-col  flex  items-center">
          <div className="text-4xl inter">Why choose Brass?</div>
          <div className="inter  text-2xl">
            Discover the health benefits and timeless elegance of brass bottles
          </div>
        </div>
        <div className=" flex mx-40 gap-5">
          <div className="w-1/3 flex justify-center items-center ">
            <div className=" dark:bg-[#e4e198] bg-[#889551] rounded-2xl h-100 flex flex-col justify-center items-center  gap-7">
              <Image
                src={"/Assets/Icons/whiteplant.png"}
                alt=""
                width={120}
                height={40}
                className="hidden md:block"
              />
              <div className="text-4xl font-bold inter dark:text-[#889551] text-[#0E4001]">
                Ayurvedic Benefits
              </div>
              <div className="text-center text-lg  text-white">
                Brass naturally balances the three doshas and improves overall
                health according to Ayurvedic principles.
              </div>
            </div>
          </div>
          <div className="w-1/3 flex justify-center items-center ">
            <div className="dark:bg-[#e4e198] bg-[#889551] rounded-2xl h-100 flex flex-col justify-center items-center  gap-7">
              <Image
                src={"/Assets/Icons/whiteantibacterial.png"}
                alt=""
                width={120}
                height={40}
                className="hidden md:block rotate-90"
              />
              <div className="text-3xl font-bold inter dark:text-[#889551] text-[#0E4001]">
                Anti-bacterial
              </div>
              <div className="text-center text-lg text-white">
                Brass naturally balances the three doshas and improves overall
                health according to Ayurvedic principles.
              </div>
            </div>
          </div>
          <div className="w-1/3 flex justify-center items-center ">
            <div className="dark:bg-[#e4e198] bg-[#889551] rounded-2xl h-100 flex flex-col justify-center items-center  gap-7">
              <Image
                src={"/Assets/Icons/whiteecology.png"}
                alt=""
                width={120}
                height={40}
                className="hidden md:block"
              />
              <div className="text-3xl font-bold inter dark:text-[#889551] text-[#0E4001]">
                Eco-Friendly
              </div>
              <div className="text-center text-lg text-white">
                Brass naturally balances the three doshas and improves overall
                health according to Ayurvedic principles.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category */}
      <div
        id="category"
        className="flex flex-col px-auto mb-10 bg-[#e4e198] h-150"
      >
        <div className="flex h-15 mt-10">
          <div className="text-5xl w-full text-center inter dark:text-white text-black">
            Category
          </div>
        </div>
        <div className=" flex flex-1">
          <div className=" w-1/3">
            <Image
              alt=""
              src="/Demo/Images/image.png"
              width={320}
              height={320}
              className="mx-auto my-2 rounded-3xl"
            />
            <div className="text-5xl text-center inter dark:text-[#889551] text-[#889551] shadow-[3.2px_3.2px_7px_#0009] mx-auto rounded-xl w-[40%] bg-white hover:bg-[#fff9]">
              <Link href={`/productsdetail`}>Bowls</Link>
            </div>
          </div>
          <div className="w-1/3">
            <Image
              alt=""
              src="/Demo/Images/image.png"
              width={320}
              height={320}
              className="mx-auto my-2 rounded-3xl"
            />
            <div className="text-5xl text-center inter dark:text-[#889551] text-[#889551] shadow-[3.2px_3.2px_7px_#0009] mx-auto rounded-xl w-[40%] bg-white hover:bg-[#fff9]">
              <Link href={`/productsdetail`}>Bottles</Link>
            </div>
          </div>
          <div className=" w-1/3">
            <Image
              alt=""
              src="/Demo/Images/image.png"
              width={320}
              height={320}
              className="mx-auto my-2 rounded-3xl"
            />
            <div className="text-5xl text-center inter dark:text-[#889551] text-[#889551] shadow-[3.2px_3.2px_7px_#0009] mx-auto rounded-xl w-[40%] bg-white hover:bg-[#fff9]">
              <Link href={`/productsNdetail`}>Plates</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bestseller */}
      <div id="bestseller" className="min-h-screen">
        <div className="text-5xl text-center inter dark:text-white text-black mb-40 ">
          Bestsellers
        </div>
        <PipeSection />
        <div
          id="bestsellerText"
          className="text-4xl dark:text-[#ffffff] text-[#889551] text-center inter mt-25"
        >
          <div>Start Your Wellness Journey</div>
          <div className="text-xl dark:text-[#e4e198] text-black">
            Join thousands of satisfied customers who have embraced the ancient
            wisdom of brass bottles.
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-15 ">
        <button className="dark:bg-[#e4e198] bg-[#889551] hover:bg-[#9c9b66] text-white text-3xl p-5 rounded-tl-3xl rounded-br-3xl w-70 inter shadow-[1px_3px_5px_0_#000] tracking-widest">
          Explore Now
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

// /* Bestsellers */

// position: absolute;
// width: 351px;
// height: 77px;
// left: calc(50% - 351px/2 + 9.5px);
// top: 2141px;

// font-family: 'Inter';
// font-style: normal;
// font-weight: 700;
// font-size: 64px;
// line-height: 77px;

// color: #000000;
