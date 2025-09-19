import React from "react";
import Image from "next/image";
import logo from "../../public/assets/logo.png";

const CommonFooter = ({ className = "" }) => {
  return (
    <div className={`resume-footer ${className}`}>
      <div className="flex items-center justify-center gap-2 py-2 text-xs text-gray-600 border-t border-gray-200 mt-4">
        <span>Supported by</span>
        <span className="font-semibold text-gray-800">Rewrite Canada.ca</span>
        {/* <Image
          src={logo}
          alt="Rewrite Canada Logo"
          width={50}
          height={50}
          className="object-contain"
        /> */}
        <img
          src="https://rewritecanada.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.079b0be2.png&w=1080&q=75" // direct from public folder
          alt="Rewrite Canada Logo"
          width={50}
          height={50}
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default CommonFooter;
