import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0E4001] text-[#F4F2DD]">
      {/* Decorative background elements */}
      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-80
          w-80
          rounded-full
          border
          border-[#E4E198]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-[-160px]
          h-96
          w-96
          rounded-full
          border
          border-[#889551]/20
        "
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        {/* =====================================================
            TOP BRAND SECTION
            ===================================================== */}
        <div className="grid gap-12 border-b border-[#E4E198]/15 pb-14 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-md">
            <Link
              href="/"
              className="
                font-serif
                text-3xl
                italic
                tracking-[0.12em]
                text-[#E4E198]
              "
            >
              &quot;brandName&quot;
            </Link>

            <p
              className="
                mt-6
                max-w-sm
                text-sm
                leading-7
                text-[#F4F2DD]/65
              "
            >
              Timeless brassware crafted for everyday rituals,
              meaningful gatherings and spaces that deserve a
              little more character.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#E4E198]" />
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.28em]
                  text-[#E4E198]
                "
              >
                Pure Brass
              </span>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3
              className="
                mb-6
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-[#E4E198]
              "
            >
              Information
            </h3>

            <nav className="flex flex-col gap-3 text-sm text-[#F4F2DD]/65">
              <Link
                href="/about"
                className="transition hover:text-[#E4E198]"
              >
                About Us
              </Link>

              <Link
                href="/support"
                className="transition hover:text-[#E4E198]"
              >
                Support
              </Link>

              <Link
                href="/contact"
                className="transition hover:text-[#E4E198]"
              >
                Contact
              </Link>

              <Link
                href="/location"
                className="transition hover:text-[#E4E198]"
              >
                Our Location
              </Link>
            </nav>
          </div>

          {/* Customer Care */}
          <div>
            <h3
              className="
                mb-6
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-[#E4E198]
              "
            >
              Customer Care
            </h3>

            <nav className="flex flex-col gap-3 text-sm text-[#F4F2DD]/65">
              <Link
                href="/return-policy"
                className="transition hover:text-[#E4E198]"
              >
                Return Policy
              </Link>

              <Link
                href="/shipping-policy"
                className="transition hover:text-[#E4E198]"
              >
                Shipping Policy
              </Link>

              <Link
                href="/information"
                className="transition hover:text-[#E4E198]"
              >
                Product Information
              </Link>

              <Link
                href="/collection"
                className="transition hover:text-[#E4E198]"
              >
                Shop Collection
              </Link>
            </nav>
          </div>
        </div>

        {/* =====================================================
            SOCIAL + BRAND STATEMENT
            ===================================================== */}
        <div
          className="
            flex
            flex-col
            gap-8
            border-b
            border-[#E4E198]/15
            py-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div className="flex items-center gap-3">
            {[
              {
                label: "LinkedIn",
                icon: <FaLinkedinIn size={13} />,
              },
              {
                label: "Facebook",
                icon: <FaFacebookF size={13} />,
              },
              {
                label: "Instagram",
                icon: <FaInstagram size={13} />,
              },
              {
                label: "X",
                icon: <FaXTwitter size={13} />,
              },
              {
                label: "Pinterest",
                icon: <FaPinterestP size={13} />,
              },
              {
                label: "YouTube",
                icon: <FaYoutube size={13} />,
              },
            ].map((social) => (
              <button
                key={social.label}
                type="button"
                aria-label={social.label}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#E4E198]/20
                  text-[#E4E198]
                  transition-all
                  duration-300
                  hover:border-[#E4E198]
                  hover:bg-[#E4E198]
                  hover:text-[#0E4001]
                "
              >
                {social.icon}
              </button>
            ))}
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-x-6
              gap-y-2
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-[#F4F2DD]/45
            "
          >
            <span>Traditional Craft</span>
            <span>Pure Brass</span>
            <span>Modern Living</span>
          </div>
        </div>

        {/* =====================================================
            BOTTOM
            ===================================================== */}
        <div
          className="
            flex
            flex-col
            gap-3
            pt-7
            text-[10px]
            uppercase
            tracking-[0.15em]
            text-[#F4F2DD]/40
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>© 2026 &quot;brandName&quot;. All rights reserved.</p>

          <p>
            Crafted with tradition.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;