import { useContext, useEffect, useState } from "react";
import CoverLetterSection from "../../components/dashboard/CoverLetterSection";
import InterviewSection from "../../components/dashboard/InterviewSection";
import ResumeStrength from "../../components/dashboard/ResumeStrength";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import MyResume from "./MyResume";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import FullScreenLoader from "../../components/ResumeLoader/Loader";
import { Download, Edit, Trash, Plus } from "lucide-react";
import { BASE_URL } from "../../components/Constant/constant";
import JobSearch from "../JobSearch";
import { ResumeContext } from "../../components/context/ResumeContext";
import PricingSection from "../../components/Pricing/PricingPlan";
import Button from "../../components/buttonUIComponent";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { selectedLang } = useContext(ResumeContext);
  const [strength, setStrength] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [error, setError] = useState(null);
  const resumeStrength = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/user/resume-list/0?resume_default=true?lang=${selectedLang}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        setStrength(response.data.data.resume_strenght_details || null);
        setResumeId(response.data?.data?.id || null);
      } else {
        setStrength(null);
        setResumeId(null);
        router.push(`/dashboard/resume-builder`);
      }
    } catch (err) {
      setError(err.message);
      setStrength(null);
      setResumeId(null);
      router.push(`/dashboard/resume-builder`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resumeStrength();
  }, [selectedLang]); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <FullScreenLoader />;
  }

  // if (error) {
  //   return (
  //     <div className="bg-red-50 p-6 rounded-lg mb-6">
  //       <p className="text-red-600">Error loading resume strength: {error}</p>
  //     </div>
  //   );
  // }
  const handleCreateCoverLetter = () => {
    setTimeout(() => {
      router.push("/dashboard/cv-builder");
    }, 2000);
  };
  const handleCreateResume = () => {
    setTimeout(() => {
      router.push("/dashboard/resume-builder");
    }, 2000);
  };
  const handleMyDashboard = () => {
    setTimeout(() => {
      router.push("/dashboard/page");
    }, 2000);
  };

  return (
    <>
      <div className="bg-gradient-to-b from-white to-lightColor">
        <Navbar />
        <div className="flex flex-col sm:flex-row justify-center items-center mb-8 gap-4 mt-4 p-4">
          <Button
            onClick={handleCreateResume}
            className="flex justify-center items-center  bg-blue-950 text-white   "
          >
            <Plus className="w-5 h-5 mr-2" /> {t("dashboard_page.createResume")}
          </Button>
          <Button
            onClick={handleCreateCoverLetter}
            className="flex justify-center items-center  bg-mainsecondColor  text-white   "
          >
            <Plus className="w-5 h-5 mr-2" />{" "}
            {t("dashboard_page.createCoverLetter")}
          </Button>
          <Button
            onClick={handleMyDashboard}
            className="flex justify-center items-center  bg-mainColor text-white   "
          >
            {t("dashboard_page.myProfileDashboard")}
          </Button>
        </div>
        <div className="flex flex-col max-w-7xl mx-auto md:flex-row min-h-screen bg-white p-4">
          {/* Sidebar */}
          <Sidebar score={strength.resume_strenght} resumeId={resumeId} />

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-6">
              {t("dashboard_page.recommendedSteps")}
            </h1>

            <ResumeStrength
              score={strength.resume_strenght || 0}
              strength={strength || {}}
              resumeId={resumeId || null}
            />
            <InterviewSection />
            <CoverLetterSection />
          </main>
        </div>
        <MyResume />
        {/* <JobSearch /> */}
      </div>
    </>
  );
}
