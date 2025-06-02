import Amex from "../../assets/images/Amex.png";
import MasterCard from "../../assets/images/Master Card.png";
import PayPal from "../../assets/images/Paypal.png";
import Visa from "../../assets/images/Visa Card.png";
import Instagram from "../../assets/svg/_Instagram.svg";
import Linkedin from "../../assets/svg/_Linkedin.svg";
import Telegram from "../../assets/svg/_Telegram.svg";
import Twitter from "../../assets/svg/_Twitter.svg";
import Facebook from "../../assets/svg/Facebook.svg";
import Mail from "../../assets/svg/mail.svg?react";

const Footer = () => {
  const footerListData = [
    {
      title: "About Us",
      items: [
        "Our Story",
        "Work With Us",
        "Press & Media",
        "Privacy & Security",
      ],
    },
    {
      title: "We Offer",
      items: [
        "Trip Sponsorship",
        "Last Minutes Flights",
        "Best Deals",
        "AI-Driven Search",
      ],
    },
    {
      title: "Headquarters",
      items: ["England", "France", "Canada", "Iceland"],
    },
    {
      title: "Travel Blogs",
      items: [
        "Bali Travel Guide",
        "Sri Travel Guide",
        "Peru Travel Guide",
        "Swiss Travel Guide",
      ],
    },
    {
      title: "Activities",
      items: ["Tour Leading", "Cruising & Sailing", "Camping", "Kayaking"],
    },
    {
      title: "Service",
      items: ["Report Error", "Ask Online", "Travel Insurance"],
    },
  ];

  const paymentMethod = [Amex, MasterCard, PayPal, Visa];
  const socialMedia = [Instagram, Linkedin, Twitter, Facebook, Telegram];

  return (
    <div className="py-12  flex flex-row ">
      <div className="max-w-[1220px] mx-auto w-full px-4 space-y-12">
        <div className="flex flex-row justify-between">
          {footerListData.map((section) => (
            <div className="flex flex-col gap-4">
              <p className="text-[16px] font-bold">{section.title}</p>
              <ul className="space-y-2 ">
                {section.items.map((item) => (
                  <li className="text-[16px] font-normal text-[#000] cursor-pointer opacity-70 hover:opacity-100">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* PAYMENT */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-4">
            {paymentMethod.map((item) => (
              <img src={item} alt="payment" />
            ))}
          </div>

          <div className="flex flex-row items-center space-x-8">
            {socialMedia.map((item) => (
              <img src={item} alt="social" />
            ))}
          </div>

          <div>
            <label className="text-[14px] text-[#000]">Email</label>
            <div className="rounded-[4px] flex flex-row items-start justify-start overflow-hidden border-[0.5px] border-[#A6A6A6]">
              <div className="flex flex-row items-start p-2 space-x-4  ">
                <span>
                  <Mail />
                </span>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="text-[#A6A6A6] placeholder-[#A6A6A6] border-none outline-none"
                />
              </div>
              <span className="bg-[#07689F] text-[#FFF] flex items-center py-2 px-4 h-10">
                Subscribe
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
