import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import CloseEye from "../../../assets/svg/closeEye.svg?react";
import apiRequest from "../../../api/apiRequest";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setMail] = useState("bunyamin");
  const [password, setPassword] = useState("tester");

  const handleRegister = async () => {
    try {
      const res = await apiRequest({
        method: "POST",
        url: "/auth/register",
        data: { email, password },
      });

      console.log("Register data : ", res);
    } catch (err) {
      console.log("ERROR : ", err);
    }
  };


  

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <h5 className="text-[20px] font-bold">Register</h5>

        <div className="w-full flex flex-row items-center justify-between gap-[10px]">
          <Input label="First Name" placeholder="First Name" />
          <Input label="Last Name" placeholder="Last Name" />
        </div>
        <div>
          <Input label="Email" placeholder="Your email" />
          <Input
            type="password"
            label="Password"
            placeholder="**********"
            icons={<CloseEye className="w-[20px] h-[20px]" />}
          />
          <Input
            type="password"
            label="Confirm Password"
            placeholder="**********"
            icons={<CloseEye className="w-[20px] h-[20px]" />}
          />
        </div>
        <div className="flex flex-row items-center justify-between ">
          <span className="flex flex-row items-center gap-2 justify-between text-[14px] text-[#121]">
            <input type="checkbox" className="cursor-pointer " />I agree to all
            the Terms and Privacy Policies
          </span>
        </div>
        <Button title="Register now" onClick={handleRegister} />
      </div>
      <span className="text-[14px] text-[#000] font-normal">Or</span>
    </>
  );
};

export default Register;
