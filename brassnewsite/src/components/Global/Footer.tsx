import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const Information = ["About Us", "Support", "Connect", "Shop"];

  const customerCare = [
    "Return Policy",
    "Shipping Policy",
    "Information",
    "Location",
  ];

  const socialIcons = [
    {
      name: "LinkedIn",
      element: <FaLinkedin />,
      color: "hover:text-[#0077B5]",
    },
    {
      name: "Facebook",
      element: <FaFacebook />,
      color: "hover:text-[#1877F2]",
    },
    {
      name: "Instagram",
      element: <FaInstagram />,
      color: "hover:text-[#E4405F]",
    },
    { 
      name: "Twitter",
      element: <FaXTwitter />,
      color: "hover:text-black" 
    },
    {
      name: "Pinterest",
      element: <FaPinterest />,
      color: "hover:text-[#BD081C]",
    },
    { 
      name: "Youtube",
      element: <FaYoutube />,
      color: "hover:text-[#FF0000]" 
    },
  ];

  return (
    <footer className="min-h-[50vh] cursor-default mt-50 bg-[#889551] dark:bg-[#e4e198] ">
      <div className="h-90 w-[90%] mx-auto flex justify-between text-[#f4f2dd] dark:text-[#889551]">
        {/* Information */}
        <div className="md:w-[28%]">
          {Information.map((item, ind) => {
            return (
              <div
                key={ind}
                className="text-[#f4f2dd] dark:text-[#889551] hover:underline text-2xl flex justify-center m-2 py-4"
              >
                {item}
              </div>
            );
          })}
        </div>
        {/* Customer Care */}
        <div className="md:w-[28%]">
          {customerCare.map((item, ind) => {
            return (
              <div
                key={ind}
                className="text-[#f4f2dd] dark:text-[#889551] hover:underline text-2xl flex justify-center m-2 py-4"
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      {/* Social Icons */}
      <div className="flex justify-center gap-3 text-5xl py-2">
        {socialIcons?.map((sIcons, ind) => {
          return (
            <span
              key={ind}
              className={`text-[#f4f2dd] dark:text-[#889551] transition-colors ${sIcons.color}`}
            >
              {sIcons.element}
            </span>
          );
        })}
      </div>
      <div className="flex w-[90%] text-center mx-auto justify-center text-xl border-t-3 text-[#f4f2dd] dark:text-[#889551]">
        &copy; 2026 &quot;BrandName&quot; . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
