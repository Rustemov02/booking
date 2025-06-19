import { useState } from "react";
import HamburgerMenu from "../../assets/svg/HamburgerMenu";
import Logo from "../../assets/svg/Logo.svg";
import Button from "../button/Button";
import LanguageDropdown from "../langMenu/Dropdown";
import Search from "../search/Search";
import SideModal from "../modal/sideModal";
import { useLocation} from "react-router-dom";
import Sun from "../../assets/svg/sun.svg?react";

const GuestHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  console.log(location.pathname);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <div className="flex flex-row items-center justify-between px-4 py-5 gap-4 w-full max-w-[1220px] mx-auto">
        <div>
          <img src={Logo} alt="Logo" className="w-[80px] md:w-[130px]" />
        </div>
        <span className="hidden md:block">
          <LanguageDropdown />
        </span>
        {!isAuthPage && (
          <div className="w-1/2 md:block hidden">
            <Search />
          </div>
        )}

        {!isAuthPage && (
          <div className="flex-1 items-center gap-2 hidden md:flex">
            <Button
              to="/login"
              title="Sign In"
              variant="primary"
              className="grid-cols-1 " 
            /> 
            <Button
              to="/register"
              title="Register"  
              variant="primary"
              className="grid-cols-1 "
            />
          </div>
        )} 

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
