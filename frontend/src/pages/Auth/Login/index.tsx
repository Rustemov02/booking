import Input from "../../../components/input/Input";
import CloseEye from "../../../assets/svg/closeEye.svg?react";
import OpenEye from "../../../assets/svg/openEye.svg?react";
import Button from "../../../components/button/Button";
import apiRequest from "../../../api/apiRequest";
import { useEffect, useState } from "react";
import { clearError, getError, ErrorState } from "../../../utils/errorHelpers";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { setUser } from "../../../store/user_store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Mail from "../../../assets/svg/mail.svg?react";

const Login = () => {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state);
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

      const {
        userId,
        accessToken,
        refreshToken,
        firstName,
        lastName,
        roleName,
      } = res;

      const userData = {
        userId,
        accessToken,
        refreshToken,
        firstName,
        lastName,
        roleName,
      };

      if (isRemember) {
        dispatch(setUser(userData));

        localStorage.setItem("authState", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("authState", JSON.stringify(userData));
      }

      navigate("/");
      toast.success("Əməliyyat uğurludur");
    } catch (err) {
      console.log("LOGIN ERRROR : ", err);
      toast.error("Əməliyyat uğursuzdur");
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
        <div>
          <p className="!text-[26px] font-bold text-neutral-900">
            Let's get you back on track
          </p>
          <p className="text-[14px] font-normal text-neutral-500">
            Login to access account
          </p>
        </div>
        <Input
          name="email"
          label="Email"
          error={getError(errors, "email")}
          clearError={() => setErrors((prev) => clearError(prev, "email"))}
          value={email || ""}
          onChange={(e) => setMail(e.target.value)}
          icons={<Mail className="w-5 h-5" />}
        />
        <Input
          name="password"
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
          <span className="flex flex-row items-center gap-2 justify-between text-[14px] text-[#747474]">
            <input
              type="checkbox"
              onClick={() => setIsRemember(!isRemember)}
              className="cursor-pointer"
            />
            Keep me logged in
          </span>
          <p className="text-[#4E46E5] text-[14px] font-semibold">
            Forgot password?
          </p>
        </div>

        {getError(errors, "email") && <span>{getError(errors, "email")}</span>}
        <div className="mt-3">
          <Button title="Login" variant="outline" onClick={handleLogin} />
        </div>
      </div>
    </>
  );
};

export default Login;
