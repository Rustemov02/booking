import { useState } from "react";
import IncreaseIcon from "../../assets/svg/add.svg?react";
import DecreaseIcon from "../../assets/svg/remove.svg?react";

const Counter = ({
  count,
  onChange,
}: {
  count: number;
  onChange: (value: number) => void;
}) => {
  const [currentNumb, setCurrentNumb] = useState<number>(count || 0);

  const handleDecrease = () => {
    const newValue = currentNumb - 1;
    if (newValue < 0) return;
    setCurrentNumb(newValue);
    onChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = currentNumb + 1;
    setCurrentNumb(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-row items-center justify-between w-full max-w-25 rounded-sm py-2 px-1 bg-white ">
      <DecreaseIcon
        onClick={handleDecrease}
        className={`w-[25px] h-[25px] border rounded-full transition-all duration-300 ${
          currentNumb === 0
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100 cursor-pointer"
        }`}
      />
      <span className="text-[16px] w-[18px] text-center text-[#222222] select-none">
        {currentNumb}
      </span>
      <IncreaseIcon
        onClick={handleIncrease}
        className={`cursor-pointer w-[25px] h-[25px] border rounded-full transition-all duration-500 opacity-70 hover:opacity-100 `}
      />
    </div>
  );
};

export default Counter;
