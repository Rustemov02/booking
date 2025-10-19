import { useEffect, useState, useRef } from "react";
import Az from "../../assets/flags/flagAz.svg";
import En from "../../assets/flags/flagEn.svg";
import { useTranslation } from "react-i18next";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"az" | "en" | "ru">(
    (localStorage.getItem("lang") as "az" | "en" | "ru") || "en"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "az", flag: Az },
    { code: "en", flag: En },
    // { code: "ru", flag: Ru },
  ];

  // Dili dəyiş və yadda saxla
  useEffect(() => {
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("lang", selectedLang);
  }, [selectedLang, i18n]);

  // i18n.language dəyişəndə komponent yenilənsin
  useEffect(() => {
    setSelectedLang(i18n.language as "az" | "en" | "ru");
  }, [i18n.language]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLang = (lang: "az" | "en" | "ru") => {
    setSelectedLang(lang);
    setIsOpen(false);
  };

  const currentFlag =
    languages.find((l) => l.code === selectedLang)?.flag || Az;

  return (
    <div className="relative w-[40px]" ref={dropdownRef}>
      {/* Current Flag */}
      <div
        className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-blue-500 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={currentFlag}
          alt="Selected Language"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 z-50 animate-slideDown">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-blue-50 transition ${
                selectedLang === lang.code ? "bg-blue-50" : ""
              }`}
              onClick={() => handleSelectLang(lang.code as "az" | "en" | "ru")}
            >
              <img
                src={lang.flag}
                alt={lang.code}
                className="w-6 h-6 rounded-full"
              />
              <span className="capitalize text-gray-700 font-medium">
                {lang.code}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LanguageDropdown;
