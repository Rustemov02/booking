import React, { useEffect, useState } from "react";
import {
  Heart,
  HelpCircle,
  Home,
  Hotel,
  Menu,
  MenuIcon,
  Settings,
  User,
  X,
} from "lucide-react";
import Modal from "../../components/modal/sideModal";
import { useNavigate } from "react-router-dom";
import LanguageDropdown from "../langMenu/Dropdown";
import useClickOutSide from "../../hooks/useClickOutside";
import { ToastMessage } from "../../utils/message";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Dialog from "../dialog/Dialog";
const HotelHeader: React.FC = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const lang = localStorage.getItem("lang");
  const clickedOutside = useClickOutSide(() => {
    setMenuOpen(false);
  });

  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  useEffect(() => {
    const isFirstEntry = localStorage.getItem("is_first_entry");

    if (isFirstEntry === null) {
      setHelpDialogOpen(true);
      localStorage.setItem("is_first_entry", "false");
    }
  }, []);
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Hotel className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-gray-900">
              Hotels.com
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {/* Language selector */}
            {/* <button className="flex items-center cursor-pointer gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Globe size={18} className="text-gray-600" />
              <span className="text-sm font-medium">English</span>
            </button> */}
            <LanguageDropdown />

            {/* Help Icon */}
            <button
              className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Help"
              onClick={() => setHelpDialogOpen(true)}
            >
              <HelpCircle className="w-5 h-5 text-gray-700" />
            </button>

            <div className="relative" ref={clickedOutside}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="cursor-pointer flex items-center gap-2 p-2 px-3 bg-white border border-gray-300 rounded-full hover:shadow-md transition-all"
              >
                <MenuIcon className="w-4 h-4 text-gray-700" />
                <User className="w-5 h-5 text-gray-700" />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl z-50 shadow-lg border border-gray-200 py-2 overflow-hidden">
                  <button
                    onClick={() => ToastMessage(t("notAvailableYet"))}
                    className=" cursor-pointer w-full text-left px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => ToastMessage(t("notAvailableYet"))}
                    className=" cursor-pointer w-full text-left px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
              )}
            </div>

            {/* Sign in button */}
            {/* <button
              onClick={() => navigate("/login")}
              className="px-4 lg:px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              Sign in
            </button> */}

            {/* Register button */}
            {/* <button className="px-4 lg:px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
              Register
            </button> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl md:hidden overflow-y-auto"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-red-50 to-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                        <Hotel className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-bold text-gray-900">Hotels.com</span>
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 hover:bg-white/80 rounded-full transition-colors"
                    >
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 p-4 space-y-1">
                    <button
                      onClick={() => {
                        navigate("/hotel");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all group"
                    >
                      <div className="p-2 bg-gray-50 group-hover:bg-red-100 rounded-lg transition-colors">
                        <Home className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
                      </div>
                      <span className="font-medium">{t("nav.home")}</span>
                    </button>

                    <button
                      onClick={() => {
                        navigate("/hotel/favourites");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all group"
                    >
                      <div className="p-2 bg-gray-50 group-hover:bg-red-100 rounded-lg transition-colors">
                        <Heart className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
                      </div>
                      <span className="font-medium">{t("nav.favourites")}</span>
                    </button>

                    <button
                      onClick={() => {
                        ToastMessage(t("notAvailableYet"));
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all group"
                    >
                      <div className="p-2 bg-gray-50 group-hover:bg-red-100 rounded-lg transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{t("nav.profile")}</span>
                    </button>

                    <button
                      onClick={() => {
                        ToastMessage(t("notAvailableYet"));
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all group"
                    >
                      <div className="p-2 bg-gray-50 group-hover:bg-red-100 rounded-lg transition-colors">
                        <Settings className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{t("nav.settings")}</span>
                    </button>

                    <div className="my-4 border-t border-gray-100 pt-4 px-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        {t("nav.language")}
                      </p>
                      <div className="flex items-center gap-3">
                        <LanguageDropdown />
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {localStorage.getItem("lang") || "en"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-5 border-t border-gray-100 space-y-3">
                    <button
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-3 text-gray-700 font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      {t("nav.signin")}
                    </button>
                    <button
                      onClick={() => {
                        navigate("/register");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-200 transition-all active:scale-[0.98]"
                    >
                      {t("nav.register")}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <Dialog open={helpDialogOpen} onClose={() => setHelpDialogOpen(false)}>
        <div className="h-auto min-h-[250px] flex items-center justify-center pl-8 pr-15 py-3">
          {lang === "az" ? (
            <p className="font-semibold text-center text-[23px]">
              Səhifə hazırda inkişaf mərhələsindədir 🌱 <br /> Yaxın zamanda
              yeni funksiyalar əlavə olunacaq.
              <br /> Hazırkı mərhələdə bəzi texniki çətinliklər və kiçik buglar
              müşahidə oluna bilər. <br />
              Anlayışınız və dəstəyiniz üçün təşəkkür edirik 💙
            </p>
          ) : (
            <p className="font-semibold text-center text-[23px]">
              The page is currently under development 🌱 <br /> New features
              will be added soon to enhance your experience.
              <br /> At this stage, you may encounter some minor bugs or
              technical issues.
              <br /> Thank you for your understanding and support 💙
            </p>
          )}
        </div>
      </Dialog>
    </header>
  );
};

export default HotelHeader;
