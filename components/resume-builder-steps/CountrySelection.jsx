import Image from "next/image";
import { useTranslation } from "react-i18next";
import usflag from "../../public/assets/uslogo.png";
import canadaflag from "../../public/assets/canada.png";
import indiaflag from "../../public/assets/indiaflag.png";
import unitedkingdomflag from "../../public/assets/unitedkingdomflag.png";
import germanyflag from "../../public/assets/germanyflag.png";
import australiaflag from "../../public/assets/australiaflag.png";
import franceflag from "../../public/assets/franceflag.png";
import netherlandsflag from "../../public/assets/netherlandsflag.png";
import irelandflag from "../../public/assets/irelandflag.png";
import singaporeflag from "../../public/assets/singaporeflag.png";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BASE_URL } from "../Constant/constant";
import { SaveLoader } from "../ResumeLoader/SaveLoader";
import { ResumeContext } from "../context/ResumeContext";
const countries = [
  { id: "us", name: "United States", flag: usflag },
  { id: "ca", name: "Canada", flag: canadaflag },
  { id: "in", name: "India", flag: indiaflag },
  { id: "uk", name: "United Kingdom", flag: unitedkingdomflag },
  { id: "de", name: "Germany", flag: germanyflag },
  { id: "au", name: "Australia", flag: australiaflag },
  { id: "fr", name: "France", flag: franceflag },
  { id: "nl", name: "Netherlands", flag: netherlandsflag },
  { id: "ie", name: "Ireland", flag: irelandflag },
  { id: "sg", name: "Singapore", flag: singaporeflag },
];

export default function CountrySelection({ onBack, onSelectCountry }) {
  const { i18n, t } = useTranslation();
  const language = i18n.language;
  const router = useRouter();
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resumeId = router.query.id || localStorage.getItem("resumeId");
        if (!resumeId || !token) {
          toast.error("Resume ID or token not found");
          return;
        }

        const response = await axios.get(
          `${BASE_URL}/api/user/resume-list/${resumeId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.code == 200 || response.data.status == "success") {
          const parsedAIData = JSON.parse(
            response.data.data.ai_resume_parse_data
          );
          setResumeData(parsedAIData.templateData);

          // Set initial location value if it exists
          if (parsedAIData.templateData.country) {
            const countryValue = parsedAIData.templateData.country;
            setSelectedCountry(countryValue);
          }
        } else {
          toast.error(response.data.message || "Failed to fetch resume data");
        }
      } catch (error) {
        toast.error(error?.message || "Error fetching resume data");
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [router.query.id, token]);

  const formatResumeData = (data) => {
    return {
      ...data,
      country: selectedCountry,
    };
  };

  const handleSaveCountry = async () => {
    console.log("handleSaveCountry called");
    console.log("resumeData:", resumeData);
    console.log("selectedCountry:", selectedCountry);

    if (!resumeData) {
      toast.error("Resume data not loaded");
      return;
    }

    if (!selectedCountry) {
      toast.error("Please select a country before proceeding");
      return;
    }

    const templateData = {
      templateData: formatResumeData(resumeData),
    };

    console.log("templateData being sent:", templateData);
    setIsLoading(true);

    try {
      const resumeId = router.query.id || localStorage.getItem("resumeId");

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
        toast.success(response.data.message || "Country saved successfully");
        onSelectCountry(selectedCountry);
      } else {
        toast.error(response.data.error || "Error while saving the country");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating resume!");
      console.error("Error updating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isNextButtonDisabled = () => {
    return loading || !selectedCountry || isLoading;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-mainColor flex flex-col">
      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <div className="max-w-3xl text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-mainColor hover:text-teal-800 leading-snug mb-2">
            For which country to tailor your resume to its specific
            requirements.
          </h1>
          <p className="text-md md:text-lg text-mainColor hover:text-teal-800 ">
            Select the country to tailor your resume to its specific
            requirements.
          </p>
        </div>

        <div className="py-10 px-4 w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              ...countries.filter((c) => ["us", "ca", "in"].includes(c.id)),
              ...countries.filter((c) => !["us", "ca", "in"].includes(c.id)),
            ].map((country) => (
              <button
                key={country.id}
                onClick={() => {
                  console.log("Country clicked:", country.id);
                  setSelectedCountry(country.id);
                }}
                className={`p-5 rounded-2xl shadow-md border border-gray-200 flex flex-col items-center transition-all duration-200 group ${
                  selectedCountry === country.id
                    ? "bg-mainColor text-white shadow-xl scale-105"
                    : "bg-lightColor hover:bg-mainColor hover:text-white text-white hover:shadow-xl"
                }`}
              >
                <Image
                  src={country.flag}
                  alt={country.name}
                  width={100}
                  height={100}
                  className="mb-4 transition-transform duration-200 group-hover:scale-105"
                />
                <span className="text-white group-hover:text-white font-semibold text-lg mb-2 transition-colors duration-200">
                  {country.name}
                </span>
                <span className="text-xl text-white group-hover:text-white transition-colors duration-200">
                  →
                </span>
              </button>
            ))}
          </div>
          {!selectedCountry && (
            <p className="text-red-500 text-sm mt-4 text-center">
              Please select a country to continue
            </p>
          )}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={onBack}
              className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 
              font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSaveCountry}
              disabled={isNextButtonDisabled()}
              className={`px-8 py-3 rounded-lg font-medium transition-all shadow-md 
                ${
                  isNextButtonDisabled()
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
            >
              {isLoading ? <SaveLoader loadingText="Saving" /> : "Next"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
