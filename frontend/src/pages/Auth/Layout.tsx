import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GuestHeader from "../../components/header/GuestHeader";
import Button from "../../components/button/Button";
import Google from "../../assets/svg/Google.svg?react";

interface Props {
  children: ReactNode;
}

const AuthLayoutWrapper = ({ children }: Props) => {
  const location = useLocation();
  const hasAccount = location.pathname === "/login";
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <GuestHeader />

      {/* Main content */}
      <main className="flex flex-1 justify-center items-center px-4">
        <div className="w-full max-w-[420px] rounded-[12px] border border-neutral-500 p-7 bg-white shadow-sm">
          {/* Children (Login/Register form) */}
          <div>{children}</div>

          {/* Social login */}
          <div className="flex flex-col gap-4 w-full mt-5">
            <Button
              variant="primary"
              title="Continue with Google"
              icon={<Google />}
            />
          </div>

          {/* Switch to Login/Register */}
          <div className="mt-4 text-center text-sm">
            {!hasAccount ? (
              <>
                Already have an account?
                <span
                  onClick={() => navigate("/login")}
                  className="text-[#07689F] font-semibold cursor-pointer"
                >
                  {" "}Login
                </span>
              </>
            ) : (
              <>
                Don’t have an account?
                <span
                  onClick={() => navigate("/register")}
                  className="text-[#07689F] font-semibold cursor-pointer"
                >
                  {" "}Sign Up
                </span>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayoutWrapper;
