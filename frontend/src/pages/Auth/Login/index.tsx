import { Input } from "../../../components/input/Input";
import CloseEye from "../../../assets/svg/closeEye.svg?react";
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

  // No unused selector
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
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500">
          Login to access your booking account
        </p>
      </div>

      <div className="space-y-4">
        <Input
          name="email"
          label="Email Address"
          error={getError(errors, "email") || undefined}
          clearError={() => setErrors((prev) => clearError(prev, "email"))}
          value={email || ""}
          onChange={(e) => setMail(e.target.value)}
          icons={<Mail className="w-5 h-5 text-gray-400" />}
          placeholder="email@example.com"
        />
        <Input
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
          type="password"
          error={getError(errors, "password") || undefined}
          clearError={() => setErrors((prev) => clearError(prev, "password"))}
          label="Password"
          placeholder="••••••••"
          icons={<CloseEye className="w-5 h-5 text-gray-400" />}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600 cursor-pointer group">
            <input
              type="checkbox"
              checked={isRemember}
              onChange={() => setIsRemember(!isRemember)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="group-hover:text-gray-900 transition-colors">Keep me logged in</span>
          </label>
          <button className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors">
            Forgot password?
          </button>
        </div>

        <Button
          title="Login"
          variant="default"
          onClick={handleLogin}
          className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
        >
          Sign In
        </Button>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
