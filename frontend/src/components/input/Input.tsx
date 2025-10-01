import { ReactNode, useState } from "react";

interface TypeInput {
  type?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
  errorMessage?: string;
  style?: React.CSSProperties;
  icons?: {
    open: ReactNode;
    close?: ReactNode;
  };
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
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    clearError?.();
  };

  const handleIconClick = () => {
    if (type === "password") {
      setShowPassword((prev) => !prev);
    }
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div style={style} className="flex flex-col gap-1 w-full">
      {label && (
        <label
          className={`text-[14px] font-semibold ${
            error ? "text-red-500" : "text-neutral-900"
          }`}
        >
          {label}
        </label>
      )}

      <div
        className={`flex items-center gap-2 px-3 py-2 w-full bg-white rounded-[10px] border ${
          error ? "border-red-500" : "border-[#A6A6A6]"
        } focus-within:border-[#4E46E5]`}
      >
        {icons && type === "password" && (
          <span
            className="cursor-pointer flex items-center"
            onClick={handleIconClick}
          >
            {showPassword ? icons.open : icons.close}
          </span>
        )}

        <input
          className="outline-none flex-1 bg-transparent text-neutral-900"
          type={inputType}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>

      {error && <span className="text-[12px] text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
