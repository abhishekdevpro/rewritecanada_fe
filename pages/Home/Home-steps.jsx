"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import rewritecanada from "./Images/rewritecanada.png";
import Link from "next/link";

const Home_step = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleStep = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the token (you can adjust based on where the token is stored)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  const steps = [
    {
      title: "1. Choose a Template",
      description: [
        "Pick a professional resume template that suits your industry and role.",
        "20+ ATS-compliant templates selected by experts.",
      ],
    },
    {
      title: "2. Add Your Information",
      description: [
        "Contact details",
        "Summary or objective",
        "Work experience",
        "Education",
        "Skills and certifications",
      ],
    },
    {
      title: "3. Customize & Design",
      description: [
        "Adjust fonts, colors, and layout",
        "Add photo and links where required",
        "Highlight important achievements",
      ],
    },
    {
      title: "4. Review, Run AI & Export",
      description: [
        "Run AI Assist",
        "Auto-check and fix using AI",
        "Export as PDF",
        "Create unlimited resumes & cover letters",
      ],
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 bg-gray-50 p-8">
      {/* <div className="w-full md:w-1/2">
        <Image
          src={rewritecanada}
          alt="Resume Builder Tutorial"
          className="w-full rounded-lg shadow-lg h-[500px]"
        />
      </div> */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <Image
          src={rewritecanada}
          alt="Resume Builder Tutorial"
          className="w-full h-auto rounded-lg shadow-lg max-h-[500px] "
        />
      </div>

      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          How to Make a Resume — In 4 Simple Steps
        </h1>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-950 bg-white p-4 rounded-lg shadow-sm cursor-pointer"
              onClick={() => toggleStep(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-900">
                  {step.title}
                </h3>
                <span className="text-xl text-gray-600">
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </div>

              {openIndex === index && (
                <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
                  {step.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <Link href={isAuthenticated ? "/dashboard/resume-builder" : "/login2"}>
          <button className="mt-8 bg-blue-950 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors">
            Build my resume
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home_step;
