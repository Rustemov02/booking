import { FC, JSX, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  title: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
  to?: string;
  variant?: string;
  size?: string;
  icon?: ReactNode | JSX.Element;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: FC<ButtonProps> = ({
  title,
  onClick,
  className,
  variant = "standart",
  size = "standart",
  icon,
  to,
  type,
}) => {
  const sizeStylesStandart =
    "rounded-[4px] py-2 px-4 text-bold text-[16px]/[22px]";
  const sizeStylesSmall = "h-[22px] rounded-[4px]";
  const standart =
    "bg-[#4E46E5] border border-[#07689F]  text-[#FFF]  hover:bg-[#FFF] hover:text-[#07689F] hover:border hover:border-[#07689F]";
  const primary =
    "bg-transparent border-1 border-[#07689F] text-[#07689F] hover:bg-[#07689F] hover:border-[#07689F] hover:text-[#FFF]";

  const variantStyles = variant === "standart" ? standart : primary;
  const sizeStyles = size === "standart" ? sizeStylesStandart : sizeStylesSmall;
  const navigate = useNavigate();
  const handleClickButton = () => {
    if (to) {
      navigate(`${to}`);
    }

    onClick?.();
  };

  return (
    <div
      onClick={handleClickButton}
      className={`${variantStyles} ${sizeStyles} w-full text-center cursor-pointer transition-all duration-500`}
    >
      <button
        type={type}
        className={` ${className}  w-full flex flex-row items-center gap-3 ${
          icon ? "justify-center" : "justify-center"
        }`}
      >
        {icon && <span className="w-[24px] h-[24px]"> {icon}</span>}
        <p>{title} </p>
      </button>
    </div>
  );
};

export default Button;
