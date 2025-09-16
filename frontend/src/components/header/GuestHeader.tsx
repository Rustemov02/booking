import { useState } from "react";
import HamburgerMenu from "../../assets/svg/HamburgerMenu";
import Button from "../button/Button";
import LanguageDropdown from "../langMenu/Dropdown";
import SideModal from "../modal/sideModal";
import { useLocation, useNavigate } from "react-router-dom";
import FavouritesIcon from "../../assets/svg/like.svg?react";
import Logo from "@/assets/images/logo.svg?react";
import Question from "@/assets/svg/question.svg?react";
import Profile from "@/assets/svg/profile.svg?react";
import Menu from "@/assets/svg/menu.svg?react";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import MenuIcon from "@/assets/svg/menu.svg?react";
import useClickOutSide from "../../hooks/useClickOutside";
import { useDispatch } from "react-redux";
import { logout } from "../../store/user_store";
import toast from "react-hot-toast";

const GuestHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const roleName = useSelector(
    (state: RootState) => state.userReducer.roleName
  );

  const clickedOutside = useClickOutSide(() => {
    setMenuOpen(false);
  });

  const handleLogout = () => {
    navigate("/login");
    dispatch(logout());
    toast.success("Logout oldunuz !");
  };
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

          {!roleName ? (
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
          ) : (
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              ref={clickedOutside}
              className="relative cursor-pointer bg-white py-1 px-2 rounded-xl"
            >
              <MenuIcon className="w-6 cursor-pointer transition duration-500 " />

              <div
                className={`${
                  menuOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                } flex flex-col items-start absolute top-[35px] p-2 z-50 rounded-xl right-[6px] w-[100px] bg-white`}
              >
                <p className="py-1 px-2 cursor-pointer hover:bg-[#F6F7F9] rounded-sm w-full">
                  Profile
                </p>
                <p
                  onClick={() => console.log("setting")}
                  className="py-1 px-2 cursor-pointer hover:bg-[#F6F7F9] rounded-sm w-full"
                >
                  Settings
                </p>
                <p
                  onClick={handleLogout}
                  className="py-1 px-2 cursor-pointer hover:bg-[#F6F7F9] rounded-sm w-full"
                >
                  Logout
                </p>
              </div>
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
