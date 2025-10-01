import { useState } from "react";
import toast from "react-hot-toast";
import apiRequest from "../../../api/apiRequest";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import CloseEye from "../../../assets/svg/closeEye.svg?react";
import OpenEye from "../../../assets/svg/openEye.svg?react";
import { ErrorState } from "../../../utils/errorHelpers";

const Register = () => {
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
    <form
      onSubmit={handleRegister}
      className="w-full max-w-[420px] flex flex-col gap-5"
    >
      {/* Title */}
      <h5 className="text-xl font-bold text-center">Register</h5>

      {/* Name inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          name="firstName"
          label="First Name"
          placeholder="First Name"
          onChange={(e) =>
            setFullNameData((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />
        <Input
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          onChange={(e) =>
            setFullNameData((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />
      </div>

      {/* Email + Passwords */}
      <Input
        label="Email"
        name="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setMail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="**********"
        icons={{
          open: <OpenEye className="w-5 h-5" />,
          close: <CloseEye className="w-5 h-5" />,
        }}
      />

      <Input
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        placeholder="**********"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        icons={{
          open: <OpenEye className="w-5 h-5" />,
          close: <CloseEye className="w-5 h-5" />,
        }}
      />

      {/* Agreement */}
      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={isAgree}
          onChange={() => setIsAgree(!isAgree)}
        />
        I agree to all the Terms and Privacy Policies
      </label>

      {/* Submit */}
      <Button title="Register now" type="submit" className="w-full" />
    </form>
  );
};

export default Register;
