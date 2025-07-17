"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// Import all templates
import template1 from "../preview/template/template1.png";
import template2 from "../preview/template/template2.png";
import template3 from "../preview/template/template3.png";
import template4 from "../preview/template/template4.png";
import template5 from "../preview/template/template5.png";
import template6 from "../preview/template/template6.png";
import template7 from "../preview/template/template7.png";
import template8 from "../preview/template/template8.png";
import template9 from "../preview/template/template9.png";
import template10 from "../preview/template/template10.png";
import template11 from "../preview/template/template11.png";
import template12 from "../preview/template/template12.png";
import template13 from "../preview/template/template13.png";
import template14 from "../preview/template/template14.png";
import template15 from "../preview/template/template15.png";
import template16 from "../preview/template/template16.png";
import template17 from "../preview/template/template17.png";
import template18 from "../preview/template/template18.png";
import template19 from "../preview/template/template19.png";
import template20 from "../preview/template/template20.png";
import template21 from "../preview/template/template21.png";
import template22 from "../preview/template/template22.png";
import template23 from "../preview/template/template23.png";
import template24 from "../preview/template/template24.png";
import template25 from "../preview/template/template25.png";
import template26 from "../preview/template/template26.png";
import template27 from "../preview/template/template27.png";
// import template28 from "../preview/template/template28.png";
import { BASE_URL } from "../Constant/constant";
import { useTranslation } from "react-i18next";
import { ResumeContext } from "../context/ResumeContext";
import { SaveLoader } from "../ResumeLoader/SaveLoader";
import Link from "next/link";

const TemplateStep = ({ onNext, onBack, onChange, value }) => {
  const router = useRouter();

  const { i18n, t } = useTranslation();
  const language = i18n.language;
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const { selectedLang } = useContext(ResumeContext);
  const [userData, setUserData] = useState(null);
  const [selectedHexCode, setSelectedHexCode] = useState("#00008B"); // Default blue hex code
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const colors = [
    {
      name: "Black",
      class: "bg-black",
      selectedClass: "ring-black",
      hexCode: "#000000",
    },
    {
      name: "Blue",
      class: "bg-blue-900",
      selectedClass: "ring-blue-900",
      hexCode: "#00008B",
    },
    {
      name: "Dark Gray",
      class: "bg-gray-800",
      selectedClass: "ring-gray-800",
      hexCode: "#333333",
    },
    {
      name: "Purple",
      class: "bg-purple-700",
      selectedClass: "ring-purple-700",
      hexCode: "#6A0DAD",
    },
    {
      name: "Brown",
      class: "bg-[#8B3A3A]",
      selectedClass: "ring-[#8B3A3A]",
      hexCode: "#8B3A3A",
    },
    {
      name: "Periwinkle",
      class: "bg-[#6666FF]",
      selectedClass: "ring-[#6666FF]",
      hexCode: "#6666FF",
    },

    {
      name: "Red",
      class: "bg-red-600",
      selectedClass: "ring-red-600",
      hexCode: "#FF0000",
    },
    {
      name: "Teal Green",
      class: "bg-[#3B8070]",
      selectedClass: "ring-[#3B8070]",
      hexCode: "#3B8070",
    },
    {
      name: "Slate Gray",
      class: "bg-gray-600",
      selectedClass: "ring-gray-600",
      hexCode: "#666666",
    },
    {
      name: "Olive",
      class: "bg-[#999900]",
      selectedClass: "ring-[#999900]",
      hexCode: "#999900",
    },
    {
      name: "Orange Red",
      class: "bg-[#F2542D]",
      selectedClass: "ring-[#F2542D]",
      hexCode: "#F2542D",
    },
    {
      name: "Bright Blue",
      class: "bg-[#3399FF]",
      selectedClass: "ring-[#3399FF]",
      hexCode: "#3399FF",
    },

    {
      name: "Coral Pink",
      class: "bg-[#F88379]",
      selectedClass: "ring-[#F88379]",
      hexCode: "#F88379",
    },
    {
      name: "Brown Orange",
      class: "bg-[#D2691E]",
      selectedClass: "ring-[#D2691E]",
      hexCode: "#D2691E",
    },
    {
      name: "Lavender Pink",
      class: "bg-[#DA70D6]",
      selectedClass: "ring-[#DA70D6]",
      hexCode: "#DA70D6",
    },
    {
      name: "Steel Blue",
      class: "bg-[#6A7BA2]",
      selectedClass: "ring-[#6A7BA2]",
      hexCode: "#6A7BA2",
    },
    {
      name: "Light Coral",
      class: "bg-[#F08080]",
      selectedClass: "ring-[#F08080]",
      hexCode: "#F08080",
    },
    {
      name: "Bright Orange",
      class: "bg-[#FFA500]",
      selectedClass: "ring-[#FFA500]",
      hexCode: "#FFA500",
    },
    {
      name: "Gray",
      class: "bg-gray-200",
      selectedClass: "ring-gray-400",
      hexCode: "#6D7278",
    },
    {
      name: "Charcoal Gray",
      class: "bg-[#374151]",
      selectedClass: "ring-[#4B5563]",
      hexCode: "#374151",
    },
    {
      name: "Green",
      class: "bg-[#00b38d]",
      selectedClass: "ring-[#00b38d]",
      hexCode: "#00b38d",
    },
    {
      name: "Navy Blue",
      class: "bg-[#1E3A8A]",
      selectedClass: "ring-[#1E3A8A]",
      hexCode: "#1E3A8A",
    },
    {
      name: "Slate Blue",
      class: "bg-[#475569]",
      selectedClass: "ring-[#64748B]",
      hexCode: "#475569",
    },
    {
      name: "Purple",
      class: "bg-purple-600",
      selectedClass: "ring-purple-400",
      hexCode: "#9333EA",
    },
    {
      name: "Classic Blue",
      class: "bg-[#2563EB]",
      selectedClass: "ring-[#3B82F6]",
      hexCode: "#2563EB",
    },
    {
      name: "Forest Green",
      class: "bg-[#166534]",
      selectedClass: "ring-[#22C55E]",
      hexCode: "#166534",
    },
    {
      name: "Deep Teal",
      class: "bg-[#0F766E]",
      selectedClass: "ring-[#0D9488]",
      hexCode: "#0F766E",
    },
    {
      name: "Red",
      class: "bg-red-600",
      selectedClass: "ring-red-400",
      hexCode: "#DC2626",
    },
    {
      name: "Yellow",
      class: "bg-yellow-500",
      selectedClass: "ring-yellow-400",
      hexCode: "#EAB308",
    },
    {
      name: "Pink",
      class: "bg-pink-500",
      selectedClass: "ring-pink-400",
      hexCode: "#EC4899",
    },
    {
      name: "Teal",
      class: "bg-teal-500",
      selectedClass: "ring-teal-400",
      hexCode: "#14B8A6",
    },
    {
      name: "Orange",
      class: "bg-orange-500",
      selectedClass: "ring-orange-400",
      hexCode: "#F97316",
    },
    {
      name: "Indigo",
      class: "bg-indigo-600",
      selectedClass: "ring-indigo-400",
      hexCode: "#4F46E5",
    },
  ];

  const templates = [
    { key: "template1", imageUrl: template1, name: "Modern Clean" },
    { key: "template2", imageUrl: template2, name: "Professional" },
    { key: "template3", imageUrl: template3, name: "Creative" },
    { key: "template4", imageUrl: template4, name: "Executive" },
    { key: "template5", imageUrl: template5, name: "Minimal" },
    { key: "template6", imageUrl: template6, name: "Classic" },
    { key: "template7", imageUrl: template7, name: "Contemporary" },
    { key: "template8", imageUrl: template8, name: "Simple" },
    { key: "template9", imageUrl: template9, name: "Elegant" },
    { key: "template10", imageUrl: template10, name: "Modern Plus" },
    { key: "template11", imageUrl: template11, name: "Bold" },
    { key: "template12", imageUrl: template12, name: "Premium" },
    { key: "template13", imageUrl: template13, name: "Advanced" },
    { key: "template14", imageUrl: template14, name: "Pro" },
    { key: "template15", imageUrl: template15, name: "Clean" },
    { key: "template16", imageUrl: template16, name: "Sleek" },
    { key: "template17", imageUrl: template17, name: "Dynamic" },
    { key: "template18", imageUrl: template18, name: "Premium Plus" },
    { key: "template19", imageUrl: template19, name: "Executive Pro" },
    { key: "template20", imageUrl: template20, name: "Modern Elite" },
    // {
    //   key: "template21",
    //   imageUrl: template21,
    //   name: "Contemporary",
    //   // hasPhoto: true,
    // },
    // {
    //   key: "template22",
    //   imageUrl: template22,
    //   name: "Modern Clean",
    //   // hasPhoto: false,
    // },
    // {
    //   key: "template23",
    //   imageUrl: template23,
    //   name: "Creative",
    //   // hasPhoto: true,
    // },
    // {
    //   key: "template24",
    //   imageUrl: template24,
    //   name: "Executive",
    //   // hasPhoto: true,
    // },
    // {
    //   key: "template25",
    //   imageUrl: template25,
    //   name: "Minimal",
    //   // hasPhoto: true
    // },
    // {
    //   key: "template26",
    //   imageUrl: template26,
    //   name: "Classic",
    //   // hasPhoto: false,
    // },
    // {
    //   key: "template27",
    //   imageUrl: template27,
    //   name: "Contemporary",
    //   // hasPhoto: false,
    // },
    // {
    //   key: "template28",
    //   imageUrl: template28,
    //   name: "Contemporary",
    //   // hasPhoto: false,
    // },
  ];

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
  const isBasicUser = userData?.plan_id === 1;
  const [showUpgradeMessage, setShowUpgradeMessage] = useState(false);
  // Filter colors based on user plan
  const availableColors = isBasicUser ? colors.slice(0, 2) : colors;

  // Filter templates based on user plan
  const availableTemplates = isBasicUser ? templates.slice(0, 2) : templates;

  // Set default color hex code if none selected
  useEffect(() => {
    if (!value.hexCode) {
      const defaultColor = colors.find((c) => c.name === "Blue");
      handleColorChange(defaultColor.hexCode, defaultColor.name);
    }
  }, []);

  // Handle color selection with hex code
  const handleColorChange = (hexCode, colorName) => {
    console.log("Selected color:", colorName, "Hex:", hexCode);
    setSelectedHexCode(hexCode);
    onChange({
      ...value,
      color: colorName,
      hexCode: hexCode,
    });
  };

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resumeId = router.query.id || localStorage.getItem("resumeId");
        if (!resumeId || !token) {
          toast.error(t("templateStep.toast.resume_not_found"));
          return;
        }

        const response = await axios.get(
          `${BASE_URL}/api/user/resume-list/${resumeId}?lang=${selectedLang}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(
          typeof response.data.data.ai_resume_parse_data,
          "parsedAIData"
        );
        if (response.data.code === 200) {
          const parsedAIData = JSON.parse(
            response.data.data.ai_resume_parse_data
          );
          setResumeData(parsedAIData.templateData);

          if (parsedAIData.templateData.templateDetails) {
            const backgroundColor =
              parsedAIData.templateData.templateDetails.backgroundColor;
            const colorObj =
              colors.find((c) => c.hexCode === backgroundColor) ||
              colors.find((c) => c.name === "Blue");
            handleColorChange(colorObj.hexCode, colorObj.name);
          }
        } else {
          toast.error(response.data.message || "Failed to fetch resume data");
        }
      } catch (error) {
        toast.error(error?.message || t("templateStep.toast.fetch_error"));
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [router.query.id, token]);

  const formatResumeData = (data) => {
    return {
      name: data.name || "",
      position: data.position || "",
      contactInformation: data.contactInformation || "",
      email: data.email || "",
      address: data.address || "",
      profilePicture: data.profilePicture || "",
      socialMedia:
        data.socialMedia?.map((media) => ({
          socialMedia: media.socialMedia || "",
          link: media.link || "",
        })) || [],
      summary: data.summary || "",
      education:
        data.education?.map((edu) => ({
          school: edu.school || "",
          degree: edu.degree || "",
          startYear: edu.startYear || "",
          endYear: edu.endYear || "",
          location: edu.location || "",
        })) || [],
      workExperience:
        data.workExperience?.map((exp) => ({
          company: exp.company || "",
          position: exp.position || "",
          description: exp.description || "",
          KeyAchievements: Array.isArray(exp.keyAchievements)
            ? exp.keyAchievements
            : [exp.keyAchievements || ""],
          startYear: exp.startYear || "",
          endYear: exp.endYear || "",
          location: exp.location || "",
        })) || [],
      projects:
        data.projects?.map((project) => ({
          title: project.title || "",
          link: project.link || "",
          description: project.description || "",
          keyAchievements: Array.isArray(project.keyAchievements)
            ? project.keyAchievements
            : [project.keyAchievements || ""],
          startYear: project.startYear || "",
          endYear: project.endYear || "",
          name: project.name || "",
        })) || [],
      skills: Array.isArray(data.skills)
        ? data.skills.map((skill) => ({
            title: skill.title || "",
            skills: skill.skills || [],
          }))
        : [],
      languages: data.languages || [],
      certifications: data.certifications || [],
      templateDetails: {
        templateId: value.template,
        backgroundColor: selectedHexCode || "#2563EB",
        font: "Ubuntu",
      },
    };
  };

  const handleSaveTemplate = async () => {
    if (!resumeData) return;
    if (!value.template) {
      toast.error("Please select a template before proceeding");
      return;
    }
    const templateData = {
      templateData: formatResumeData(resumeData),
    };
    setIsLoading(true);
    try {
      const resumeId = router.query.id || localStorage.getItem("resumeId");
      if (!resumeId) {
        toast.error("Resume ID not found");
        return;
      }

      const response = await axios.put(
        `${BASE_URL}/api/user/resume-update/${resumeId}?lang=${language}`,
        templateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        setIsSaved(true);
        localStorage.setItem("isSaved", "true");
        toast.success(
          response.data.message || t("templateStep.toast.save_success")
        );
        onNext();
      } else {
        toast.error(response.data.error || t("templateStep.toast.save_error"));
      }
    } catch (error) {
      toast.error(error?.message || t("templateStep.toast.update_error"));
      console.error("Error updating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">
          {" "}
          {t("templateStep.loading")}
        </div>
      </div>
    );
  }

  // Get current selected color for hover effect
  const getHoverStyle = (templateKey) => {
    if (value.template === templateKey) {
      return {
        borderWidth: "4px",
        borderColor: selectedHexCode,
        boxShadow: `0 0 0 4px ${selectedHexCode}33`,
      };
    }
    return {
      borderWidth: "0px",
      borderColor: "transparent",
      boxShadow: "none",
      ":hover": {
        boxShadow: `0 0 0 2px ${selectedHexCode}33`,
      },
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-200 flex flex-col">
      <div className="bg-blue-950 text-white py-3 px-6 rounded-b-3xl mx-auto mt-4   items-center gap-3 shadow-md">
        <h2 className="text-3xl font-bold text-white">
          {t("templateStep.choose_template")}
        </h2>
        <p className="text-lg text-white mt-2">
          {t("templateStep.select_design")}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-12 py-10 flex-1 overflow-hidden">
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-10 w-full lg:max-w-[250px]">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {t("templateStep.color_theme")}
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {colors.map((color, index) => {
              const isDisabled = isBasicUser && index > 1;
              return (
                <button
                  key={color.name}
                  className={`
        w-8 h-8 rounded-full ${color.class}
        transform transition-all duration-200
        ${
          selectedHexCode === color.hexCode
            ? `ring-2 ring-offset-2 ${color.selectedClass}`
            : "hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"
        }
        ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
      `}
                  onClick={() => {
                    {
                      isDisabled && (
                        <Link href={"/payment"}>
                          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-sm font-semibold">
                            🔒 Upgrade to use
                          </div>
                        </Link>
                      );
                    }
                    handleColorChange(color.hexCode, color.name);
                  }}
                  title={color.name}
                  disabled={isDisabled}
                />
              );
            })}
          </div>
          {isBasicUser && (
            <button
              onClick={() => router.push("/payment")}
              className="mt-4 w-full bg-blue-950 hover:bg-blue-950 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
            >
              Upgrade Your Plan to Unlock All Templates & Colors
            </button>
          )}
        </div>

        {/* Templates */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {templates.map((template, index) => {
              const isDisabled = isBasicUser && index > 1;
              const isSelected = value.template === template.key;

              return (
                <div
                  key={template.key}
                  className={`relative group rounded-xl overflow-hidden border-4 shadow-md transition-all duration-300
        ${isSelected ? "" : "hover:border-gray-300 hover:scale-105"}
        ${isSelected ? `border-[${selectedHexCode}]` : "border-transparent"}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
                  onClick={() => {
                    if (isDisabled) {
                      toast.info("Upgrade your plan to use premium templates.");
                      return;
                    }
                    onChange({ ...value, template: template.key });
                  }}
                  style={{
                    borderColor:
                      value.template === template.key
                        ? selectedHexCode
                        : undefined,
                  }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={template.imageUrl}
                      alt={template.name}
                      layout="fill"
                      objectFit="contain"
                      className="transition-transform duration-300 group-hover:scale-105"
                      priority={index < 6}
                    />
                    {isDisabled && (
                      <Link href={"/payment"}>
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-sm font-semibold">
                          🔒 Upgrade to use
                        </div>
                      </Link>
                    )}

                    {!isDisabled && (
                      <div
                        onClick={handleSaveTemplate}
                        className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent p-4"
                      >
                        <span className="bg-white text-black font-semibold px-4 py-2 rounded-full shadow-md">
                          {/* {t("templateStep.usethistemplate")} */}
                          {isLoading ? (
                            <SaveLoader loadingText={t("saving")} />
                          ) : (
                            t("templateStep.usethistemplate")
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center shadow-md px-6">
        <button
          onClick={onBack}
          className="text-teal-700 hover:underline text-base font-medium"
        >
          {t("templateStep.back")}
        </button>
        <button
          onClick={handleSaveTemplate}
          disabled={loading}
          style={{ backgroundColor: selectedHexCode }}
          className={`px-6 py-2 text-white rounded-xl font-semibold shadow-md transition-all
            ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
        >
          {isLoading ? (
            <SaveLoader loadingText={t("saving")} />
          ) : (
            t("templateStep.next")
          )}
        </button>
      </div>
    </div>
  );
};

export default TemplateStep;
