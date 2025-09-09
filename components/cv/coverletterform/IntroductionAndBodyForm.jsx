import React, { useContext, useState } from "react";
import { useTranslation } from "next-i18next";
import { CoverLetterContext } from "../../context/CoverLetterContext";
import dynamic from "next/dynamic";
import { Plus, X } from "lucide-react";
// adjust based on your button component
import axios from "axios";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const IntroductionAndBodyForm = () => {
  const { t } = useTranslation();
  const { coverLetterData, setCoverLetterData } =
    useContext(CoverLetterContext);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const sectionTitles = t("coverLetterSection.sections", {
    returnObjects: true,
  });

  const handleBodyChange = (index, value) => {
    setCoverLetterData((prevData) => {
      const updatedBody = [...prevData.body];
      updatedBody[index] = value;
      return { ...prevData, body: updatedBody };
    });
  };

  const handleAIAssist = async (index) => {
    setLoadingIndex(index);
    setActiveIndex(index);
    setSelectedSuggestionIndex(0); // default to the first suggestion

    const { personalDetails } = coverLetterData;
    const { letterDetails } = coverLetterData;

    let endpoint = "";
    let payload = {};

    if (index === 0) {
      endpoint =
        "https://api.rewritecanada.ca/api/user/aisummery-section1-coverletter";
      payload = {
        name: personalDetails.name,
        target_role: personalDetails.position,
        company_name: letterDetails.companyName,
        location: personalDetails.address,
      };
    } else if (index === 1) {
      endpoint =
        "https://api.rewritecanada.ca/api/user/aisummery-section2-coverletter";
      payload = {
        target_role: personalDetails.position,
      };
    } else if (index === 2) {
      endpoint =
        "https://api.rewritecanada.ca/api/user/aisummery-section3-coverletter";
      payload = {
        name: personalDetails.name,
        target_role: personalDetails.position,
        company_name: letterDetails.companyName,
      };
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setPopupContent("Unauthorized: No token found.");
        setPopupVisible(true);
        setLoadingIndex(null);
        return;
      }

      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = response.data.data;
      setPopupContent(
        data?.cover_letter_analysis?.professional_summaries?.join("\n\n") ||
          "No content received."
      );

      setPopupVisible(true);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";
      setPopupContent(message);
      setPopupVisible(true);
      console.error(error);
    } finally {
      setLoadingIndex(null);
    }
  };

  // const insertToParagraph = () => {
  //   if (activeIndex !== null) {
  //     handleBodyChange(activeIndex, popupContent);
  //     setPopupVisible(false);
  //   }
  // };
  const insertToParagraph = () => {
    if (activeIndex !== null && Array.isArray(splitContent)) {
      const selectedText = splitContent[selectedSuggestionIndex];
      handleBodyChange(activeIndex, selectedText || "");
      setPopupVisible(false);
    }
  };
  const splitContent = popupContent
    .split("\n\n")
    .filter((s) => s.trim() !== "");

  return (
    <div className="p-4 md:p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-black">
        {t("coverLetterSection.title")}
      </h2>

      {sectionTitles.map((title, index) => (
        <div key={index} className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-black font-medium">{title}</label>
            <button
              onClick={() => handleAIAssist(index)}
              className=" p-2 text-white bg-black rounded-lg text-sm mb-2"
              type="button"
            >
              ✙ {t("coverLetterSection.aiAssist", { sectionTitle: title })}
            </button>
          </div>

          <ReactQuill
            value={coverLetterData.body[index] || ""}
            onChange={(value) => handleBodyChange(index, value)}
            theme="snow"
            placeholder={t("coverLetterSection.placeholder", {
              sectionTitle: title,
            })}
          />
        </div>
      ))}
      {/* Popup Modal */}
      {popupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 relative max-h-96 overflow-y-auto">
            <button
              onClick={() => setPopupVisible(false)}
              className="absolute top-2 right-2 text-black hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4">AI Suggested Content</h3>
            {splitContent.map((text, idx) => (
              <label
                key={idx}
                className="flex items-start gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="ai-suggestion"
                  value={idx}
                  checked={selectedSuggestionIndex === idx}
                  onChange={() => setSelectedSuggestionIndex(idx)}
                  className="mt-1"
                />
                <span className="whitespace-pre-line">{text}</span>
              </label>
            ))}
            <div className="mt-4 flex justify-end">
              <button
                onClick={insertToParagraph}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Insert to Paragraph {activeIndex + 1}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroductionAndBodyForm;
