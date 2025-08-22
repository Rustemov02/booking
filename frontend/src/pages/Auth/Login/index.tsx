import Input from "../../../components/input/Input";
import CloseEye from "../../../assets/svg/closeEye.svg?react";
import OpenEye from "../../../assets/svg/openEye.svg?react";
import Button from "../../../components/button/Button";
import apiRequest from "../../../api/apiRequest";
import { useEffect, useState } from "react";

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
      setError((prev) => ({ ...prev, ...newErrors }));
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
  const [error, setError] = useState<{ [key: string]: string }>({});

  const getError = (field: string) => {
    if (!field) return null;
    console.log(error[field]);
    return error[field];
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <h5 className="text-[20px] font-bold">Login</h5>
        <p className="text-[12px] font-semibold">Login to access account</p>
        <Input
          label="Email"
          error={getError("email")}
          placeholder="Testing"
          value={email || ""}
          onChange={(e) => setMail(e.target.value)}
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
          type="password"
          error={getError("password")}
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
        {getError("email") && <span>{getError("email")}</span>}
        <Button title="Login" onClick={handleLogin} />
      </div>
      <span className="text-[14px] text-[#000] font-normal">Or</span>
      <button onClick={() => {}}>Add Error Message</button>
      <button onClick={() => {}}>Get error</button>
    </>
  );
};

export default Login;
