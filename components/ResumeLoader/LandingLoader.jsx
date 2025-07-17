// components/Loader.js
import React from "react";

const LandingLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-[#00b38d] border-gray-300"></div>
    </div>
  );
};

export default LandingLoader;
