import { useEffect } from "react";
import useToggle from "../../hooks/useToggle";

const Switch = ({ onChange }: { onChange: (isActive: boolean) => void }) => {
  const [isToggled, toggle] = useToggle(false);

  useEffect(() => {
    onChange(isToggled);
  }, [isToggled]);

  return (
    <div
      // RETURN-HERE: you can use here twMerge
      onClick={toggle}
      className={`w-[35px] h-[24px] flex items-center ${
        isToggled ? "justify-end bg-blue-700" : "justify-start bg-gray-600"
      } transition-all duration-500  rounded-xl cursor-pointer`}
    >
      <div
        className="w-[24px] h-[24px] border bg-[#ffffff] rounded-full transform transition-transform duration-500"
        style={{
          transform: isToggled ? "translateX(3px)" : "translateX(-2px)",
          borderColor: isToggled ? "#1447e6" : "#4a5565",
        }}
      ></div>
    </div>
  );
};

export default Switch;
