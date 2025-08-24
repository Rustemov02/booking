import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import CloseEye from "../../../assets/svg/closeEye.svg?react";
import apiRequest from "../../../api/apiRequest";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getError, clearError, ErrorState } from "../../../utils/errorHelpers";

const Register = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<ErrorState>({});

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log("Form data : ", formData);
    const values = Object.fromEntries(formData.entries());

    console.log(values);

    const newErrors: ErrorState = {};

    if (!isAgree) {
      return toast("You must accept the agreement !", {
        icon: "🤨",
      });
    }

    if (password !== confirmPassword) {
      return toast.error("Şifrələr uyğun gəlmir !");
    }

    try {
      const res = await apiRequest({
        method: "POST",
        url: "/auth/register",
        data: { email, password },
      });

      console.log("Register data : ", res);
    } catch (err: any) {
      console.log("ERROR : ", err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <div className="flex flex-col gap-4 w-full">
          <h5 className="text-[20px] font-bold">Register</h5>
          <div className="w-full flex flex-row items-center justify-between gap-[10px]">
            <Input
              name="firstName"
              label="First Name"
              placeholder="First Name"
              onChange={() => {}}
            />
            <Input
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              onChange={() => {}}
            />
          </div>
          <div>
            <Input
              label="Email"
              name="email"
              placeholder="Your email"
              value={email || ""}
              onChange={(e) => setMail(e.target.value)}
            />
            <Input
              type="text"
              name="password"
              label="Password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              icons={<CloseEye className="w-[20px] h-[20px]" />}
            />
            <Input
              type="text"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="**********"
              value={confirmPassword || ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icons={<CloseEye className="w-[20px] h-[20px]" />}
            />
          </div>
          <div className="flex flex-row items-center justify-between ">
            <span className="flex flex-row items-center gap-2 justify-between text-[14px] text-[#121]">
              <input
                type="checkbox"
                className="cursor-pointer "
                checked={isAgree}
                onChange={() => setIsAgree(!isAgree)}
              />
              I agree to all the Terms and Privacy Policies
            </span>
          </div>
          <Button title="Register now" type="submit" />
        </div>
      </form>
      <span className="text-[14px] text-[#000] font-normal">Or</span>
    </>
  );
};

export default Register;
