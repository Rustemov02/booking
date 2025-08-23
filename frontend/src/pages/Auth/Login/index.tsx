import Input from "../../../components/input/Input";
import CloseEye from "../../../assets/svg/closeEye.svg?react";
import OpenEye from "../../../assets/svg/openEye.svg?react";
import Button from "../../../components/button/Button";
import apiRequest from "../../../api/apiRequest";
import { useEffect, useState } from "react";
import { clearError, getError, ErrorState } from "../../../utils/errorHelpers";

const Login = () => {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);

  const handleLogin = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors["email"] = "Email daxil edilməyib";
    }
    if (!password) {
      newErrors["password"] = "Şifrə daxil edilməyib";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    try {
      const res = await apiRequest({
        method: "POST",
        url: "/auth/login",
        data: { email, password },
      });

      if (isRemember) {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
      } else {
        sessionStorage.setItem("refreshToken", res.refreshToken);
        sessionStorage.setItem("accessToken", res.accessToken);
      }
    } catch (err) {
      console.log("LOGIN ERRROR : ", err);
    }
  };
  const [errors, setErrors] = useState<ErrorState>({});

  // const getError = (field: string) => {
  //   if (!field) return null;
  //   console.log(error[field]);
  //   return error[field];
  // };

  // const clearError = (field: string) => {
  //   setError((prev) => {
  //     const updated = { ...prev };
  //     delete updated[field];
  //     return updated;
  //   });
  // };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <h5 className="text-[20px] font-bold">Login</h5>
        <p className="text-[12px] font-semibold">Login to access account</p>
        <Input
          label="Email"
          error={getError(errors, "email")}
          clearError={() => setErrors((prev) => clearError(prev, "email"))}
          placeholder="Testing"
          value={email || ""}
          onChange={(e) => setMail(e.target.value)}
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
          type="password"
          error={getError(errors, "password")}
          clearError={() => setErrors((prev) => clearError(prev, "password"))}
          label="Password"
          placeholder="********"
          icons={<CloseEye className="w-[20px] h-[20px]" />}
        />
        <div className="flex flex-row items-center justify-between">
          <span className="flex flex-row items-center gap-2 justify-between text-[14px] text-[#121]">
            <input
              type="checkbox"
              onClick={() => setIsRemember(!isRemember)}
              className="cursor-pointer"
            />
            Remember Me
          </span>
          <p className="text-[#07689F] text-[14px]">Forgot password?</p>
        </div>
        {getError(errors, "email") && <span>{getError(errors, "email")}</span>}
        <Button title="Login" onClick={handleLogin} />
      </div>
      <span className="text-[14px] text-[#000] font-normal">Or</span>
    </>
  );
};

export default Login;
