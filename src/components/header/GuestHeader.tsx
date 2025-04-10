import HamburgerMenu from "../../assets/svg/HamburgerMenu";
import Logo from "../../assets/svg/Logo.svg";
import Button from "../button/Button";
import LanguageDropdown from "../langMenu/Dropdown";
import Search from "../search/Search";

const GuestHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between px-4 py-6 gap-4 w-full max-w-[1220px]  ">
      <div>
        <img src={Logo} alt="Logo" className="w-[80px] md:w-[130px] h-[130px]" />
      </div>
      <span className="hidden md:block">
        <LanguageDropdown />
      </span>
      <div className="w-1/2 sm:block hidden">
        <Search />
      </div>

      <div className="flex-1 items-center gap-2 hidden md:flex">
        <Button title="Sign In" className="grid-cols-1" />
        <Button title="Register" className="grid-cols-1 " />
      </div>

      <div className="flex md:hidden">
        <HamburgerMenu size={40}/>
      </div>
    </div>
  );
};

export default GuestHeader;
