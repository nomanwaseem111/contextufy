"use client";

import Image from "next/image";
import { Loader } from "../Loader/page";

export default function Button({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  fullWidth = true,
  icon: Icon = null,
  iconPosition = "left",
  iconClassName = "",
  loading = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-3 px-4 rounded-md font-medium text-white bg-emerald-400 hover:bg-emerald-500 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {Icon && iconPosition === "left" && (
        <Image src={Icon} alt="Icon" className={`h-5 w-5 ${iconClassName}`} />
      )}

      {loading ? <Loader /> : children}

      {Icon && iconPosition === "right" && (
        <Image src={Icon} alt="Icon" className={`h-5 w-5 ${iconClassName}`} />
      )}
    </button>
  );
}
