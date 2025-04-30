import { useState } from "react";

const Switch = ({ onChange }: { onChange: (isActive: boolean) => void }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    const newToggleStatus = !toggle;
    setToggle(newToggleStatus);
    onChange(newToggleStatus);
  };
  return (
    <div
      // RETURN-HERE: you can use here twMerge
      onClick={handleToggle}
      className={`w-[35px] h-[24px] flex items-center ${
        toggle ? "justify-end bg-blue-700" : "justify-start bg-gray-600"
      } transition-all duration-500  rounded-xl cursor-pointer`}
    >
      <div
        className="w-[24px] h-[24px] border bg-[#ffffff] rounded-full transform transition-transform duration-500"
        style={{
          transform: toggle ? "translateX(3px)" : "translateX(-2px)",
          borderColor: toggle ? "#1447e6" : "#4a5565",
        }}
      ></div>
    </div>
  );
};

export default Switch;
