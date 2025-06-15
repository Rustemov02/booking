import Input from "../../../components/input/Input";
import AuthLayout from "../Layout";
import CloseEye from "../../../assets/svg/closeEye.svg?react";
import OpenEye from "../../../assets/svg/openEye.svg?react";
import Button from "../../../components/button/Button";

const Login = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-4 w-full">
        <h5 className="text-[20px] font-bold">Login</h5>
        <p className="text-[12px] font-semibold">Login to access account</p>
        <Input label="Email" placeholder="Testing" />
        <Input
          type="password"
          label="Password"
          placeholder="********"
          icons={<CloseEye className="w-[20px] h-[20px]" />}
        />
        <div className="flex flex-row items-center justify-between">
          <span className="flex flex-row items-center gap-2 justify-between text-[14px] text-[#121]">
            <input type="checkbox" />
            Remember Me
          </span>
          <p className="text-[#07689F] text-[14px]">Forgot password?</p>
        </div>
        <Button title="Login" />
      </div>
      <span className="text-[14px] text-[#000] font-normal">Or</span>
    </AuthLayout> 
  );
};

export default Login;
