import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  title: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
  to?: string;
}

const Button: FC<ButtonProps> = ({
  title,
  onClick,
  width,
  height,
  className,
  to,
}) => {
  const standartButtonStyle =
    "py-1 px-4 border border-[#07689F] text-[#07689F] rounded-[4px] cursor-pointer w-full min-w-fit font-bold text-16";

  const navigate = useNavigate();

  const handleClickButton = () => {
    if (to) {
      navigate(`${to}`);
    }

    onClick;
  };
  return (
    <div className={`${standartButtonStyle}`}>
      <button
        className={`${standartButtonStyle} ${className} w-[${width}px] h-[${height}px] `}
        onClick={handleClickButton}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
