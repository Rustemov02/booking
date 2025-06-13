import { ReactNode } from "react";

interface TypeInput {
  type?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
  errorMessage?: string;
  style?: any;
  icons?: ReactNode | ReactNode[];
}

const Input = ({
  type = "text",
  value,
  defaultValue,
  placeholder,
  name,
  label,
  errorMessage,
  style,
  icons,
}: TypeInput) => {
  console.log(typeof icons);
  return (
    <div style={style} className="flex flex-col gap-1 items-star">
      <label className="text-[14px] text-[#000] font-normal">{label}</label>
      <div className="flex flex-row items-center justify-between  px-2 py-3 w-full bg-[#fff] rounded-[10px] border border-[#A6A6A6] text-[#A6A6A6]">
        <input
          className=" outline-none bg-none placeholder:text-[#A6A6A6]"
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
        {icons &&
          (Array.isArray(icons) ? (
            <>
              {icons.map((item) => {
                <span>{item}</span>;
              })}
            </>
          ) : (
            <span className='cursor-pointer'>{icons}</span>
          ))}
      </div>
      <span>{errorMessage}</span>
    </div>
  );
};

export default Input;
