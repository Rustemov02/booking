import { FC } from "react";

interface ButtonProps {
  title: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({ title, onClick, width, height , className }) => {
  const standartButtonStyle =
    "py-1 px-4 border-2 border-[#07689F] text-[#07689F] rounded-[4px] cursor-pointer w-full min-w-fit font-bold text-16";

  return (
    <>
      <button
        className={`${standartButtonStyle} ${className} w-[${width}px] h-[${height}px] `}
        onClick={onClick}
      >
        {title}
      </button>
    </>
  );
};

export default Button;
