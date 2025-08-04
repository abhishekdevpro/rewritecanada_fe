import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import template1 from "./template/template1.png";
import template2 from "./template/template2.png";
import template3 from "./template/template3.png";
import template4 from "./template/template4.png";
import template5 from "./template/template5.png";
import template6 from "./template/template6.png";
import template7 from "./template/template7.png";
import template8 from "./template/template8.png";
import template9 from "./template/template9.png";
import template10 from "./template/template10.png";
import template11 from "./template/template11.png";
import template12 from "./template/template12.png";
import template13 from "./template/template13.png";
import template14 from "./template/template14.png";
import template15 from "./template/template15.png";
import template16 from "./template/template16.png";
import template17 from "./template/template17.png";
import template18 from "./template/template18.png";
import template19 from "./template/template19.png";
import template20 from "./template/template20.png";
import template21 from "./template/template21.png";
import template22 from "./template/template22.png";
import template23 from "./template/template23.png";
import template24 from "./template/template24.png";
import template25 from "./template/template25.png";
import template26 from "./template/template26.png";
import template27 from "./template/template27.png";
import { BASE_URL } from "../Constant/constant";
import axios from "axios";
import Link from "next/link";
const TemplateSelector = ({
  selectedTemplate,
  setSelectedTemplate,
  selectedPdfType,
  setSelectedPdfType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [templateId, setTemplateId] = useState(selectedTemplate);
  const [userData, setUserData] = useState(null);
  // Default PDF type

  const allTemplates = [
    // { key: "template1", imageUrl: template1, pdfType: 1 },
    { key: "template2", imageUrl: template2, pdfType: 3 },
    { key: "template3", imageUrl: template3, pdfType: 3 },
    // { key: "template4", imageUrl: template4, pdfType: 1 },
    // { key: "template5", imageUrl: template5, pdfType: 3 },
    { key: "template6", imageUrl: template6, pdfType: 2 },
    // { key: "template7", imageUrl: template7, pdfType: 2 },
    // { key: "template8", imageUrl: template8, pdfType: 2 },
    // { key: "template9", imageUrl: template9, pdfType: 1 },
    // { key: "template10", imageUrl: template10, pdfType: 3 },
    // { key: "template11", imageUrl: template11, pdfType: 2 },
    // { key: "template12", imageUrl: template12, pdfType: 3 },
    // { key: "template13", imageUrl: template13, pdfType: 3 },
    // { key: "template14", imageUrl: template14, pdfType: 3 },
    // { key: "template15", imageUrl: template15, pdfType: 3 },
    // { key: "template16", imageUrl: template16, pdfType: 2 },
    // { key: "template17", imageUrl: template17, pdfType: 4 },
    // { key: "template18", imageUrl: template18, pdfType: 2 },
    // { key: "template19", imageUrl: template19, pdfType: 1 },
    // { key: "template20", imageUrl: template20, pdfType: 1 },
    // { key: "template21", imageUrl: template21, pdfType: 2 },
    // { key: "template22", imageUrl: template22, pdfType: 3 },
    // { key: "template23", imageUrl: template23, pdfType: 2 },
    // { key: "template24", imageUrl: template24, pdfType: 3 },
    // { key: "template25", imageUrl: template25, pdfType: 1 },
    { key: "template26", imageUrl: template26, pdfType: 3 },
    // { key: "template27", imageUrl: template27, pdfType: 3 },
    // { key: "template28", imageUrl: template21, pdfType: 2 },
  ];

  const templates = allTemplates;
  const isBasicUser = userData?.plan_id === 1;
  const [showUpgradeMessage, setShowUpgradeMessage] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Unauthorized. Please log in.");
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/user/user-profile`, {
          headers: { Authorization: token },
        });

        if (response.data?.status === "success") {
          const user = response.data.data;
          setUserData(user);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setStatus("Inactive");
      }
    };

    fetchUserProfile();
  }, []);
  useEffect(() => {
    const selectedIndex = templates.findIndex(
      (template) => template.key === selectedTemplate
    );
    if (selectedIndex !== -1) {
      setCurrentIndex(selectedIndex);
      setSelectedPdfType(templates[selectedIndex].pdfType);
    }
  }, [selectedTemplate]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // const handleTemplateClick = (template) => {
  //   setSelectedTemplate(template.key);
  //   setTemplateId(template.key);
  //   setSelectedPdfType(template.pdfType);
  //   closeModal();
  // };
  const handleTemplateClick = (template) => {
    const templateIndex = templates.findIndex((t) => t.key === template.key);
    if (isBasicUser && templateIndex > 1) {
      setShowUpgradeMessage(true);
      setTimeout(() => setShowUpgradeMessage(false), 2500);
      return;
    }

    setSelectedTemplate(template.key);
    setTemplateId(template.key);
    setSelectedPdfType(template.pdfType);
    closeModal();
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? templates.length - 3 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === templates.length - 3 ? 0 : prevIndex + 1
    );
  };

  const getDisplayedTemplates = () => {
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(templates.length, currentIndex + 2);
    return templates.slice(start, end);
  };
  const scrollRef = React.useRef(null);

  const scrollContainer = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 250;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className=" ">
      <div className="flex flex-col md:flex-row gap-2 m-2">
        <button
          onClick={openModal}
          className="flex items-center gap-2 rounded-lg border-2 border-teal-600 px-5 py-2 bg-white text-teal-600 font-medium 
    transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-blue-50 hover:text-teal-6000"
        >
          <FileText size={18} />
          <span className="hidden md:inline">
            {templateId.charAt(0).toUpperCase() + templateId.slice(1) ||
              "Template1"}
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/75 p-4 ">
          <div className="bg-gradient-to-b from-white to-blue-100 rounded-xl p-6 w-full max-w-5xl relative shadow-2xl ">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-lg font-bold mb-4 text-center border rounded-3xl py-2 text-white bg-blue-950">
              Select a Template
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-4 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {templates.map((template, index) => {
                const isLocked = isBasicUser && index > 1;

                {
                  showUpgradeMessage && (
                    <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-[9999]">
                      Please upgrade your plan to use this template.
                    </div>
                  );
                }
                return (
                  <div
                    key={template.key}
                    onClick={() => handleTemplateClick(template)}
                    className={`cursor-pointer transition-transform duration-200 ${
                      template.key === templateId
                        ? "scale-105"
                        : "hover:scale-105"
                    } ${isLocked ? "opacity-50 pointer-events-auto" : ""}`}
                  >
                    <div
                      className={`rounded-xl p-2 border-2 relative transition-colors duration-300 ${
                        template.key === templateId
                          ? "border-teal-600 bg-blue-100"
                          : "border-transparent hover:border-blue-300"
                      }`}
                    >
                      <div className="relative w-full h-full aspect-[3/4] overflow-hidden rounded-lg shadow-md">
                        <Image
                          src={template.imageUrl}
                          alt={template.key}
                          fill
                          className="object-fill"
                        />
                        {isLocked && (
                          <Link href={"/payment"}>
                            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center text-center text-sm font-semibold text-red-600 px-2">
                              🔒 Upgrade to use
                            </div>
                          </Link>
                        )}
                      </div>
                      <div
                        className={`text-center mt-2 font-medium ${
                          template.key === templateId
                            ? "text-teal-600"
                            : "text-gray-600"
                        }`}
                      >
                        {template.key}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {isBasicUser && (
              <div className="text-center mt-6">
                <Link href={"/payment"}>
                  <button className="bg-blue-950 hover:bg-blue-950 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition">
                    Upgrade Your Plan to Unlock All Templates
                  </button>
                </Link>
              </div>
            )}
            <button
              onClick={closeModal}
              className="w-full sm:w-auto px-6 py-2.5 my-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
