import { useState } from "react";
import HamburgerMenu from "../../assets/svg/HamburgerMenu";
import Button from "../button/Button";
import LanguageDropdown from "../langMenu/Dropdown";
import Search from "../search/Search";
import SideModal from "../modal/sideModal";
import { useLocation, useNavigate } from "react-router-dom";
import Sun from "../../assets/svg/sun.svg?react";
import FavouritesIcon from "../../assets/svg/like.svg?react";
import Logo from "@/assets/images/logo.svg?react";
import Question from "@/assets/svg/question.svg?react";
import Profile from "@/assets/svg/profile.svg?react";
import Menu from "@/assets/svg/menu.svg?react";

const GuestHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <section
        className={`flex flex-row items-center justify-between px-4 py-2 gap-4 w-full max-w-[1220px] mx-auto `}
      >
        <div>
          <Logo className="w-[120px]" />
          {/* <img src={logo} alt="Logo" className="w-[80px] md:w-[130px]" /> */}
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden md:block">
            <LanguageDropdown />
          </span>

          <Question className="w-[24px]" />
          <span>
            <FavouritesIcon
              onClick={() => navigate("favourites")}
              style={{ fill: "transparent", cursor: "pointer" }}
            />
          </span>

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
              className={`transition-all duration-700 flex items-center  gap-2`}
            >
              <Profile className="w-6" />
              <Menu className="w-6" />
            </div>
          </div>
        </div>
      </section>

      <SideModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default GuestHeader;
