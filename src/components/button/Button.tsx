import { FC } from "react";

interface ButtonProps {
  title: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ title, onClick, width, height }) => {
  const standartButtonStyle =
    "py-2 px-4 border border-primary-500 rounded-[4px] cursor-pointer w-full";

  return (
    <>
      <button
        className={standartButtonStyle}
        style={{ width: `${width}px`, height: `${height}px` }}
        onClick={onClick}
      >
        {title}
      </button>
    </>
  );
};

export default Button;
