import React from "react";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";

const CoverLetterFooter = ({ className = "" }) => {
  return (
    <div className={`cover-letter-footer ${className}`}>
      <div className="flex items-center justify-center gap-2 py-2 text-xs text-gray-600 border-t border-gray-200 mt-4">
        <span>Supported by</span>
        <span className="font-semibold text-gray-800">Rewrite Canada.com</span>
        <Image
          src={logo}
          alt="Rewrite Canada Logo"
          width={16}
          height={16}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default CoverLetterFooter;
