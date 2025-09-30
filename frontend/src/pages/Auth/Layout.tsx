import { ReactNode } from "react";
import Travel from "../../assets/images/travelPhoto.png";
import Facebook from "../../assets/svg/FacebookLayout.svg";
import Google from "../../assets/svg/Google.svg?react";
import Apple from "../../assets/svg/Apple.svg";
import { useLocation, useNavigate } from "react-router-dom";
import GuestHeader from "../../components/header/GuestHeader";
import Button from "../../components/button/Button";
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
      {/* <div className="flex flex-row items-start gap-15 rounded-[16px]  max-w-[860px] mx-auto p-13  pr-32 border border-[#A6A6A6] bg-[#EFEFEF]">
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
                  className="text-[#07689F] cursor-pointer"
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
                  className="text-[#07689F] cursor-pointer"
                >
                  {" "}
                  Register !
                </span>
              </div>
            )}
          </div>
        </div>
      </div> */}

      <div className="border w-auto mx-auto rounded-[12px] border-neutral-500 p-7 flex flex-col justify-between items-center bg-white ">
        <div>{children}</div>

        <div className="flex flex-col gap-4">
          <Button
            variant="primary"
            title="Continue with Google"
            icon={<Google />}
          />

          {!hasAccount ? (
            <div>
              Already have an account ?
              <span
                onClick={() => navigate("/login")}
                className="text-[#07689F] font-semibold cursor-pointer"
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
                className="text-[#07689F] font-semibold cursor-pointer"
              >
                {" "}
                Register !
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutWrapper;
