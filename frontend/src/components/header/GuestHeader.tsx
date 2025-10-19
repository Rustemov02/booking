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
import { Heart, HelpCircle, User, LogOut, Settings } from "lucide-react";

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
    toast.success("Logout oldunuz!");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 w-full max-w-[1440px] mx-auto">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex-shrink-0 cursor-pointer"
          >
            <Logo className="w-[100px] sm:w-[120px] lg:w-[140px] transition-transform hover:scale-105" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <LanguageDropdown />

            {/* Help Icon */}
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Help"
            >
              <HelpCircle className="w-5 h-5 text-gray-700" />
            </button>

            {/* Favourites Icon */}
            {/* <button
              onClick={() => navigate("favourites")}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Favourites"
            >
              <Heart className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors" />
            </button> */}

            {/* Auth Buttons or User Menu */}
            {!roleName ? (
              <div className="flex items-center gap-2 ml-2">
                <Button
                  to="/login"
                  title="Sign In"
                  variant="primary"
                  className="text-sm px-4 py-2 bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 rounded-full transition-all"
                />
                <Button
                  to="/register"
                  title="Register"
                  variant="primary"
                  className="text-sm px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-all"
                />
              </div>
            ) : (
              <div className="relative" ref={clickedOutside}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 p-2 px-3 bg-white border border-gray-300 rounded-full hover:shadow-md transition-all"
                >
                  <MenuIcon className="w-4 h-4 text-gray-700" />
                  <User className="w-5 h-5 text-gray-700" />
                </button>

                {/* Dropdown Menu */}
                {menuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 overflow-hidden">
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => console.log("settings")}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Favourites */}
            <button
              onClick={() => navigate("favourites")}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Favourites"
            >
              <Heart className="w-5 h-5 text-gray-700" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 p-2 px-3 bg-white border border-gray-300 rounded-full hover:shadow-md transition-all"
              aria-label="Menu"
            >
              <User className="w-5 h-5 text-gray-700" />
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Side Modal */}
      <SideModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default GuestHeader;
