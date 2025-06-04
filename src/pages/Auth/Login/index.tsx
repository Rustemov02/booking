import GuestHeader from "../../../components/header/GuestHeader";
import Input from "../../../components/input/Input";
import AuthLayout from "../Layout";
import CloseEye from "../../../assets/svg/closeEye.svg?react";
import OpenEye from "../../../assets/svg/openEye.svg?react";

const Login = () => {
  return (
    <div className="flex flex-col h-screen">
      <GuestHeader />{" "}
      {/* #FIXME: YOU SHOULD USE THIS HEADER IN THE MAIN LAYOUT */}
      <div className="h-full flex flex-row items-center">
        <AuthLayout>
          <div className="flex flex-col gap-4 w-full">
            <h5 className="text-[20px] font-bold">Login</h5>
            <p className="text-[12px] font-semibold">Login to access account</p>
            <Input label="Email" placeholder="Testing" />
            <Input
              type="password"
              label="Password"
              placeholder="********"
              icons={<CloseEye className="w-[20px] h-[20px]"/>}
            />
          </div>
        </AuthLayout>
      </div>
    </div>
  );
};

export default Login;
