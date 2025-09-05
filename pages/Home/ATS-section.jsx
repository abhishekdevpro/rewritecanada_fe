import { File, FileText, Rocket } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import Button from "../../components/buttonUIComponent";
import Image from "next/image";
import ats from "../../public/assets/ats_sec_iocn.png";
const ATSResumeSection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the token (you can adjust based on where the token is stored)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  return (
    <div className="relative w-full min-h-[180px] bg-white py-12 rounded-xl  flex items-center justify-between   ">
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="flex justify-between bg-white shadow-2xl p-4">
          <div className="">
            <Image src={ats} height={200} width={200} />
          </div>
          <div className="space-y-6 my-12">
            <h1 className="text-4xl font-bold text-mainColor mb-4">
              Resumes optimized for applicant tracking systems (ATS)
            </h1>

            <p className="text-mainColor text-lg max-w-2xl">
              Enhance resumes and cover letters are vigorously tested against
              major ATS systems to ensure complete parsability
            </p>
          </div>
          <div className="mx-auto flex justify-center items-center">
            <Link
              href={isAuthenticated ? "/dashboard/resume-builder" : "/login2"}
            >
              <Button className="bg-mainColor text-white">
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
