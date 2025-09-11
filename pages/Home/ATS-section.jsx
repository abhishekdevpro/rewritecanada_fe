import { File, FileText, Rocket } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import Button from "../../components/buttonUIComponent";
import Image from "next/image";
import ats from "../../public/assets/ats-sec.png";
const ATSResumeSection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the token (you can adjust based on where the token is stored)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  return (
    <div className="relative w-full min-h-[180px] bg-white py-6 md:py-12 rounded-xl flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:justify-between bg-white shadow-2xl rounded-lg overflow-hidden">
          {/* Image Section */}
          <div className="flex justify-start lg:justify-start p-4 lg:p-0">
            <Image
              src={ats}
              height={150}
              width={150}
              className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
              alt="ATS Optimized Resume"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-4 md:space-y-6 p-4 lg:p-6 lg:my-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-mainColor text-center lg:text-left">
              Resumes optimized for applicant tracking systems (ATS)
            </h1>

            <p className="text-mainColor text-base md:text-lg max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
              Enhance resumes and cover letters are vigorously tested against
              major ATS systems to ensure complete parsability
            </p>
          </div>

          {/* Button Section */}
          <div className="flex justify-center items-center p-4 lg:p-6">
            <Link
              href={isAuthenticated ? "/dashboard/resume-builder" : "/login2"}
            >
              <Button className="bg-mainColor text-white w-full sm:w-auto px-6 py-3 text-sm md:text-base">
                Build an ATS-Friendly Resume
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSResumeSection;
