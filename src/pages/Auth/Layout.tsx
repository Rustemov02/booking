import { ReactNode } from "react";
import Travel from "../../assets/images/travelPhoto.png";
import Facebook from "../../assets/svg/FacebookLayout.svg";
import Google from "../../assets/svg/Google.svg";
import Apple from "../../assets/svg/Apple.svg";
import { useLocation, useNavigate } from "react-router-dom";
import GuestHeader from "../../components/header/GuestHeader";

interface Props {
  children: ReactNode;
}
const AuthLayoutWrapper = ({ children }: Props) => {
  const icons = [Facebook, Google, Apple];
  const location = useLocation();
  const hasAccount = location.pathname === "/login";
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-start gap-15 h-screen">
      <GuestHeader />
      <div className="flex flex-row items-start gap-15 rounded-[16px] lg:w-[60%] w-4/5 max-w-[860px] mx-auto p-13  pr-32 border border-[#A6A6A6] bg-[#EFEFEF]">
        <div className="">
          <img
            src={Travel}
            alt="Travel"
            className="object-contain w-full h-full min-w-[320px] min-h-[300px]"
          />
        </div>
        <div className="flex flex-col  justify-between w-full items-center gap-4">
          {children}
          <div className="flex flex-row gap-4">
            {icons.map((item) => (
              <div className="rounded-[4px] border border-[#D9D9D9] bg-[#FFF] cursor-pointer hover:bg-[#D9D9D9] transition-all duration-300 w-fit py-2 px-4">
                <img src={item} />
              </div>
            ))}
          </div>
          <div>
            {!hasAccount ? (
              <div>
                Already have an account ?
                <span
                  onClick={() => navigate("/login")}
                  className="text-[#07689F]"
                >
                  {" "}
                  Login !
                </span>
              </div>
            ) : (
              <div className="text-center">
                Don't have an account in society ?
                <span
                  onClick={() => navigate("/register")}
                  className="text-[#07689F]"
                >
                  {" "}
                  Register !
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutWrapper;
