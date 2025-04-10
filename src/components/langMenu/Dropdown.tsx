import { useState } from "react";
import styles from './menu.module.css'

import Az from "../../assets/flags/flagAz.svg";
import En from "../../assets/flags/flagEn.svg";
import Ru from "../../assets/flags/flagRu.svg";

const LanguageDropdown = () => {
  const flagData = [Az, En, Ru];
  const [selectedLang, setSelectedLang] = useState(En);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickImg = (lang : string) => {
    setSelectedLang(lang)
    setIsOpen(false)
  }

  return (
    <div>
      <div className="w-fit cursor-pointer relative" onClick={()=>setIsOpen(!isOpen)}>
        <img src={selectedLang} alt="flag" />
      </div>

      <div  className={`${styles.languageList} ${isOpen ? styles.active : ""} `}>
        {flagData.map((item) => (
           item !== selectedLang ? (
             <img src={item} className="cursor-pointer" onClick={()=>handleClickImg(item)} />
           ) : ""
           
        ))}
      </div>
    </div>
  );
};

export default LanguageDropdown;
