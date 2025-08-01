import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { ResumeContext } from "../../components/context/ResumeContext";
import { Download, Edit, Trash, Plus } from "lucide-react";
import Link from "next/link";
import { BASE_URL } from "../../components/Constant/constant";
import { useTranslation } from "react-i18next";

const MyResume = () => {
  const { t } = useTranslation();

  const { setResumeData, selectedLang } = useContext(ResumeContext);
  const [resumes, setResumes] = useState([]);
  const [deleteresumeid, setDeleteresumeid] = useState(null);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [newResumeTitle, setNewResumeTitle] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentResume, setCurrentResume] = useState(null);
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${BASE_URL}/api/user/resume-list?lang=${selectedLang}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          const resumes = response?.data?.resumelist || [];
          if (resumes.length === 0) {
            toast.info("Create your first resume.");
          }
          setResumes(resumes);
        })
        .catch((error) => {
          console.error("Error fetching resume list:", error);
          toast.error("Failed to fetch resumes.");
        });
    }
  }, [selectedLang]);

  const handleEdit = (resumeId) => {
    setResumeId(resumeId);
    router.push(`/dashboard/aibuilder/${resumeId}`);
  };

  // const handleDownload = async (resumeId) => {
  //   setResumeId(resumeId);
  //   const apiUrl = `${BASE_URL}/api/user/download-resume/${resumeId}`;

  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await fetch(apiUrl, {
  //       method: "GET",
  //       headers: {
  //         Authorization: token,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) throw new Error("Failed to download file");

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `resume_${resumeId}.pdf`;
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //     toast.error("Failed to download the file. Please try again later.");
  //   }
  // };

  const handleopenDeleteModal = (resumeId) => {
    setDeleteresumeid(resumeId);
    setisDeleteModalOpen(true);
  };
  const handleCloseModal = () => {
    setisDeleteModalOpen(false);
  };

  const handleOpenEditModal = (resume) => {
    setCurrentResume(resume);
    setNewResumeTitle(resume.resume_title || "");
    setIsEditModalOpen(true);
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     axios
  //       .get(`${BASE_URL}/api/user/resume-list`, {
  //         headers: { Authorization: token },
  //       })
  //       .then((response) => {
  //         const resumes = response?.data?.resumelist || [];
  //         if (resumes.length === 0) {
  //           toast.info(t("myresume.create_first_resume"));
  //         }
  //         setResumes(resumes);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching resume list:", error);
  //         toast.error(t("myresume.fetch_resume_error"));
  //       });
  //   }
  // }, []);

  const handleDeleteResume = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await axios.delete(
          `${BASE_URL}/api/user/resume-list/${deleteresumeid}?lang=${selectedLang}`,
          {
            headers: { Authorization: token },
          }
        );
        toast.success(t("myresume.resume_deleted_success"));
        setisDeleteModalOpen(false);
        setResumes(resumes.filter((resume) => resume.id !== deleteresumeid));
      } catch (error) {
        console.error("Error deleting resume:", error);
        toast.error(t("myresume.resume_deleted_error"));
      }
    } else {
      console.error("Token not found in localStorage");
    }
  };

  const handleUpdateResumeTitle = () => {
    const token = localStorage.getItem("token");
    if (token && currentResume) {
      axios
        .put(
          `${BASE_URL}/api/user/resume-details/${currentResume.id}`,
          { resume_title: newResumeTitle },
          { headers: { Authorization: token } }
        )
        .then(() => {
          toast.success(t("myresume.resume_title_updated_success"));
          setIsEditModalOpen(false);
          setResumes((prevResumes) =>
            prevResumes.map((resume) =>
              resume.id === currentResume.id
                ? { ...resume, resume_title: newResumeTitle }
                : resume
            )
          );
        })
        .catch((error) => {
          console.error("Error updating resume title:", error);
          toast.error(t("myresume.resume_title_updated_error"));
        });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          {t("myresume.title")}
        </h1>
        <Link href={"/dashboard/resume-builder"}>
          <button className="flex items-center px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors duration-200 font-medium shadow-sm">
            <Plus className="w-5 h-5 mr-2" />
            {t("myresume.create_new_resume")}
          </button>
        </Link>
        {/* <UploadResumeBtn /> */}
      </div>

      {/* Resume Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto max-h-96 overflow-y-scroll">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t("myresume.sr_no")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t("myresume.my_resume")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t("myresume.modification")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t("myresume.created")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t("myresume.strength")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t("myresume.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {resumes.length > 0 ? (
                resumes.map((resume, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-900">
                          {resume.resume_title || "ABC"}
                        </span>
                        <button
                          onClick={() => handleOpenEditModal(resume)}
                          className="text-teal-700 hover:text-teal-800"
                        >
                          🖍
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(resume.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(resume.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        {resume.resume_strenght_details?.resume_strenght ? (
                          <span
                            className={`px-3 py-1 rounded-full text-lg font-semibold ${
                              resume.resume_strenght_details.resume_strenght >
                              60
                                ? "bg-green-100 text-teal-700"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {resume.resume_strenght_details.resume_strenght}
                          </span>
                        ) : (
                          <span className="text-gray-500">_</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(resume.id)}
                          className="text-teal-700 hover:text-teal-800 transition-colors duration-200"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleopenDeleteModal(resume.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    {t("myresume.please_upload_resume")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Resume Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold">
              {t("myresume.delete_confirmation")}
            </h2>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleDeleteResume}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                {t("myresume.delete")}
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                {t("myresume.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {t("myresume.edit_resume_title")}
            </h2>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={newResumeTitle}
              onChange={(e) => setNewResumeTitle(e.target.value)}
              placeholder={t("myresume.enter_new_resume_title")}
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                {t("myresume.cancel")}
              </button>
              <button
                onClick={handleUpdateResumeTitle}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-950 rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t("myresume.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyResume;
