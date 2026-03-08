import apiRequest from "../../../api/apiRequest";
import Button from "../../../components/button/Button";
import { Input } from "../../../components/input/Input";
import CloseEye from "../../../assets/svg/closeEye.svg?react";
import OpenEye from "../../../assets/svg/openEye.svg?react";

import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const [isAgree, setIsAgree] = useState(false);
  const [fullNameData, setFullNameData] = useState({
    firstName: "",
    lastName: "",
  });
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAgree) {
      return toast("You must accept the agreement !", { icon: "🤨" });
    }
    if (password !== confirmPassword) {
      return toast.error("Şifrələr uyğun gəlmir !");
    }

    try {
      const res = await apiRequest({
        method: "POST",
        url: "/auth/register",
        data: { email, password, ...fullNameData },
      });
      console.log("Register data : ", res);
    } catch (err: any) {
      console.log("ERROR : ", err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100 mt-10 mb-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-500">Join our community and start booking today</p>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            name="firstName"
            label="First Name"
            placeholder="John"
            onChange={(e) =>
              setFullNameData((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
          />
          <Input
            name="lastName"
            label="Last Name"
            placeholder="Doe"
            onChange={(e) =>
              setFullNameData((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
        </div>

        <Input
          label="Email Address"
          name="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setMail(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="password"
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icons={{
              open: <OpenEye className="w-5 h-5 text-gray-400" />,
              close: <CloseEye className="w-5 h-5 text-gray-400" />,
            }}
          />

          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icons={{
              open: <OpenEye className="w-5 h-5 text-gray-400" />,
              close: <CloseEye className="w-5 h-5 text-gray-400" />,
            }}
          />
        </div>

        <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer group">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            checked={isAgree}
            onChange={() => setIsAgree(!isAgree)}
          />
          <span className="group-hover:text-gray-900 transition-colors">
            {t("agreeTerms")}
            <button type="button" className="text-blue-600 font-semibold hover:underline">
              Terms
            </button>{" "}
            and{" "}
            <button type="button" className="text-blue-600 font-semibold hover:underline">
              Privacy Policies
            </button>
          </span>
        </label>

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
        >
          Register Now
        </Button>

        <div className="text-center mt-2">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => (window.location.href = "/login")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
