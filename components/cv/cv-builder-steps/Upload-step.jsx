"use client";

import { FaUpload, FaFileAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
// import DefaultResumeData from '../utility/DefaultResumeData';
// import { ResumeContext } from '../context/ResumeContext';
import { CoverLetterContext } from "../../context/CoverLetterContext";
import DefaultCoverLetterData from "../../utility/DefaultCoverLetterData";

export default function UploadStep({ onNext, onBack, onChange, value }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const { setCoverLetterData } = useContext(CoverLetterContext);
  const coverletterId = router.query.id || localStorage.getItem("id");

  if (!coverletterId) {
    toast.error(t("cvUploadStep.error"));
    return;
  }

  const handleStartFromScratch = () => {
    setCoverLetterData(DefaultCoverLetterData);
    router.push(`/dashboard/cvaibuilder/${coverletterId}`);
  };

  return (
    <div className="space-y-6 bg-gradient-to-b from-white to-mainColor">
      <div className="text-center bg-blue-950 pt-4 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-white">
          {t("cvUploadStep.title")}
        </h2>
        <p className="mt-2 text-white">{t("cvUploadStep.subtitle")}</p>
      </div>

      <div className="flex justify-center items-center ">
        <button
          onClick={handleStartFromScratch}
          className="p-6 border-2 rounded-lg text-center hover:border-blue-400"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <FaFileAlt className="text-[#00b38d] w-8 h-8" />
          </div>
          <h3 className="font-bold mb-2">
            {t("cvUploadStep.startFromScratch")}
          </h3>
          <p className="text-gray-600 text-sm">
            {t("cvUploadStep.startFromScratchDescription")}
          </p>
        </button>
      </div>

      <div className="flex justify-between mt-8 p-4">
        <button
          onClick={onBack}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
        >
          {t("cvUploadStep.back")}
        </button>
      </div>
    </div>
  );
}
