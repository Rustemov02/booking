import { useEffect, useState } from "react";
import styles from "./menu.module.css";

import Az from "../../assets/flags/flagAz.svg";
import En from "../../assets/flags/flagEn.svg";
import Ru from "../../assets/flags/flagRu.svg";
import { useTranslation } from "react-i18next";

const LanguageDropdown = () => {
  const [selectedLang, setSelectedLang] = useState(
    (localStorage.getItem("lang") as "az" | "en" | "ru") || "az"
  );
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const languages = [
    {
      code: "az",
      flag: Az,
    },
    {
      code: "en",
      flag: En,
    },
    {
      code: "ru",
      flag: Ru,
    },
  ];

  useEffect(() => {
    i18n.changeLanguage(selectedLang);
  }, [selectedLang]);

  const handleClickImg = (lang: string) => {
    setSelectedLang(lang as "az" | "en" | "ru");
    setIsOpen(false);
  };

  const currentFlag = (() => {
    switch (selectedLang) {
      case "az":
        return Az;
      case "en":
        return En;
      case "ru":
        return Ru;
      default:
        return Az;
    }
  })();


  return (
    <div>
      <div
        className="w-[24px] cursor-pointer relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img alt="image" src={currentFlag} />
      </div>

      <div className={`${styles.languageList} ${isOpen ? styles.active : ""}`}>
        {languages.map((item) => (
          <img
            key={item.code}
            src={item.flag}
            className="cursor-pointer"
            onClick={() => handleClickImg(item.code)}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageDropdown;
