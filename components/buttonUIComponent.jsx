// components/PrimaryButton.jsx
import React from "react";

const Button = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
                  hover:scale-105 hover:font-semibold transition duration-300 px-6 py-3 text-lg font-semibold  rounded-full shadow-md
                  disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
