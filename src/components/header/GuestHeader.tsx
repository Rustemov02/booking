import {useState } from "react";
import HamburgerMenu from "../../assets/svg/HamburgerMenu";
import Logo from "../../assets/svg/Logo.svg";
import Button from "../button/Button";
import LanguageDropdown from "../langMenu/Dropdown";
import Search from "../search/Search";
import SideModal from "../modal/sideModal";
// import SideModal from "../modal/sideModal";

const GuestHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-row items-center justify-between px-4 py-6 gap-4 w-full max-w-[1220px] m-auto">
        <div>
          <img
            src={Logo}
            alt="Logo"
            className="w-[80px] md:w-[130px] h-[130px]"
          />
        </div>
        <span className="hidden md:block">
          <LanguageDropdown />
        </span>
        <div className="w-1/2 md:block hidden">
          <Search />
        </div>

        <div className="flex-1 items-center gap-2 hidden md:flex">
          <Button title="Sign In" className="grid-cols-1 " />
          <Button title="Register" className="grid-cols-1 " />
        </div>

        <div className="flex md:hidden">
          <div
            onClick={() => {
              setIsOpen(true);
            }}
            className={`transition-all duration-700  `}
          >
            <HamburgerMenu size={40} />
          </div>
        </div>
      </div>

      <SideModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default GuestHeader;
