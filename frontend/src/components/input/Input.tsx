import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icons?: React.ReactNode | { open: React.ReactNode; close: React.ReactNode };
  clearError?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icons, clearError, className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";
    const currentType = isPassword ? (showPassword ? "text" : "password") : type;

    const renderIcons = () => {
      if (!icons) return null;

      if (React.isValidElement(icons)) {
        return (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {icons}
          </div>
        );
      }

      if (typeof icons === "object" && ("open" in icons || "close" in icons)) {
        const iconObj = icons as { open: React.ReactNode; close: React.ReactNode };
        return (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center hover:text-gray-700 transition-colors"
          >
            {showPassword ? iconObj.open : iconObj.close}
          </button>
        );
      }

      return null;
    };

    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>
        )}
        <div className="relative group">
          <input
            type={currentType}
            ref={ref}
            onFocus={() => clearError?.()}
            className={`w-full h-11 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm 
              placeholder:text-gray-400
              focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all
              group-hover:border-gray-300
              ${error ? "border-red-500 focus:border-red-500 focus:ring-red-50/50" : ""}
              ${icons ? "pr-11" : ""}
              ${className || ""}`}
            {...props}
          />
          {renderIcons()}
        </div>
        {error && (
          <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
