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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  clearError?: () => void;
}

const Input = ({
  type = "text",
  value,
  defaultValue,
  placeholder,
  name,
  label,
  style,
  onChange,
  icons,  
  error,
  clearError,
}: TypeInput) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    clearError?.();
  };
  return (
    <div style={style} className="flex flex-col gap-1 items-star w-full">
      <label className="text-[14px] text-[#000] font-normal">{label}</label>
      <div
        className={`flex flex-row items-center justify-between  px-2 py-3 w-full bg-[#fff] rounded-[10px] border border-[#A6A6A6] text-[#A6A6A6] ${
          error ? "border-2 border-[red]" : ""
        }`}
      >
        <input
          className={`outline-none bg-none placeholder:text-[#A6A6A6]`}
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {icons &&
          (Array.isArray(icons) ? (
            <>
              {icons.map((item) => {
                <span>{item}</span>;
              })}
            </>
          ) : (
            <span className="cursor-pointer">{icons}</span>
          ))}
      </div>
      <span className="text-[12px] text-[red]">{error && error}</span>
    </div>
  );
};

export default Input;
