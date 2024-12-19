import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "outline";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
}

const variantClasses = {
  primary:
    "bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition duration-300 transform hover:scale-105",
  secondary: "w-full bg-cream font-semibold text-gray-800 py-2 px-4 rounded-lg mb-6 font-medium relative overflow-hidden ",
  outline: "border border-blue-100 text-black",
};

const defaultStyles =
  "px-4 py-2 rounded-md  flex items-center justify-center";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        variantClasses[variant] +
        " " +
        `${className}` +
        " " +
        defaultStyles +
        `${fullWidth ? " w-full flex justify-center items-center" : ""} ${
          loading ? "opacity-45	" : ""
        }`
      }
      style={{ backgroundColor: "rgb(242, 232, 207)", willChange: "auto", transform: "none" }}

      disabled={loading}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}

      {text}
    </button>
  );
}
