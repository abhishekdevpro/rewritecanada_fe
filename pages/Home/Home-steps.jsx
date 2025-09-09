"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import homestep1 from "../../public/assets/home-step1.png";
import homestep2 from "../../public/assets/home-step2.png";
import homestep3 from "../../public/assets/home-step3.png";
import homestep4 from "../../public/assets/home-step4.png";
import multiColor from "../../public/assets/colors_icons.png";
import Link from "next/link";
import Button from "../../components/buttonUIComponent";

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
  const images = [homestep1, homestep2, homestep3, homestep4];
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 bg-white p-8 max-w-7xl mx-auto">
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <div className="w-full mb-4 py-2 px-4 bg-gradient-to-r from-[#488877] to-[#FFFFFF] ">
          <p className="text-lg font-semibold text-white">
            Simple 4 Steps AI Enabled Process
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`homestep${index + 1}`}
              height={300}
              width={320}
              className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <Image
          src={multiColor}
          alt="homestep4"
          className="rounded-lg mb-4 "
          height={100}
          width={150}
        />
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">
          How to Make a Resume — In 4 Simple Steps
        </h1>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="border-l-4 border-mainColor bg-white p-4 rounded-lg shadow-md cursor-pointer"
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
          <Button className="mt-8 bg-mainColor text-white ">
            Build my resume
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home_step;
