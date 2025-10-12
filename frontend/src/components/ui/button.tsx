import * as React from "react";
import { cn } from "./utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "ghost"
    | "outline"
    | "destructive"
    | "secondary"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50";

  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    outline: "border border-gray-300 hover:bg-gray-50 rounded-lg",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    link: "text-blue-600 underline-offset-4 hover:underline",
  };

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-xs",
    lg: "h-11 px-6 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
