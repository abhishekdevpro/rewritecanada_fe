// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Heart,
//   Bookmark,
//   Filter,
//   MapPin,
//   Briefcase,
//   Clock,
//   DollarSign,
//   Plus,
// } from "lucide-react";
// import Link from "next/link";
// import { toast } from "react-toastify";
// import Navbar from "../Navbar/Navbar";

// const LoginModal = ({ onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
//         <h3 className="text-xl font-semibold mb-4">Please Login</h3>
//         <p className="mb-6 text-gray-600">
//           You need to be logged in to perform this action.
//         </p>
//         <div className="flex justify-end space-x-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//           >
//             Cancel
//           </button>
//           <Link
//             href="/login"
//             className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-950 transition-colors"
//           >
//             Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// const JobCard = ({ item, onSaveJob, onApplyNow }) => (
//   <div className="w-full md:w-1/2 p-4">
//     <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//       <div className="flex flex-col space-y-4">
//         <div className="flex items-start space-x-4">
//           <div className="w-16 h-16 flex-shrink-0">
//             <img
//               src={
//                 item.logo ||
//                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s"
//               }
//               alt="company logo"
//               className="w-full h-full object-cover rounded"
//               width={64}
//               height={64}
//             />
//           </div>
//           <div className="flex-1">
//             <Link
//               href={`${item.redirect_url}`}
//               // href={""}
//               className="text-lg font-semibold text-gray-900 hover:text-teal-700 transition-colors"
//             >
//               {item.job_title}
//             </Link>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
//           <div className="flex items-center space-x-2">
//             <Briefcase className="w-4 h-4" />
//             <span>{item.category || "Not specified"}</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <MapPin className="w-4 h-4" />
//             <span>
//               {item.location
//                 ? `${item.location}`
//                 : "Location not specified"}
//             </span>
//           </div>
//           {/* <div className="flex items-center space-x-2">
//             <Clock className="w-4 h-4" />
//             <span>{item.application_deadline || "Open"}</span>
//           </div> */}
//           {/* <div className="flex items-center space-x-2">
//             <DollarSign className="w-4 h-4" />
//             <span>{item.offered_salary || "Salary not specified"}</span>
//           </div> */}
//         </div>

//         {item.job_type && (
//           <div className="flex items-center">
//             <span className="px-3 py-1 text-sm text-teal-700 bg-blue-50 rounded-full">
//               {item.job_type}
//             </span>
//           </div>
//         )}

//         <div className="flex justify-end space-x-3">
//           <button
//             onClick={() => onSaveJob(item.id)}
//             className="p-2 text-gray-600 hover:text-red-500 transition-colors"
//           >
//             <Heart className="w-5 h-5" />
//           </button>
//           <button
//             onClick={() => onApplyNow(item.id)}
//             className="p-2 text-gray-600 hover:text-teal-700 transition-colors"
//           >
//             <Bookmark className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default function SavedJobsPage() {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [sort, setSort] = useState("");
//   const [perPage, setPerPage] = useState({ start: 0, end: 4 });
//   const [isLoading, setIsLoading] = useState(true);
//   const [showLoginModal, setShowLoginModal] = useState(false);

// //   const getToken = () => {
// //     if (typeof window !== "undefined") {
// //       return localStorage.getItem("token");
// //     }
// //     return null;
// //   };
// const token = localStorage.getItem("token")

//   const handleSaveJob = async (jobId) => {
//     // const token = localStorage.getItem("token");
//     if (!token) {
//       setShowLoginModal(true);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/api/user/job-favorites`,{
//             job_id:jobId
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       if (response.data.status === "success" || response.data.code === 200) {
//         toast.success("Job saved successfully!");
//       } else {
//         toast.error("Failed to save the job. Please try again.");
//       }
//     } catch (error) {
//       toast.error("An error occurred while saving the job.");
//     }
//   };

//   const handleApplyNow = (jobId) => {
//     // const token = getToken();
//     if (!token) {
//       setShowLoginModal(true);
//       return;
//     }
//     // Implement your apply logic here
//     // toast.success("Application started!");
//   };
// // const token = localStorage.getItem("token")
// //   useEffect(() => {
// //     const fetchJobs = async () => {
// //       try {
// //         setIsLoading(true);
// //         const response = await fetch(
// //           `${BASE_URL}/api/user/job-favorites`
// //         );
// //         const data = await response.json();

// //         if (data.data) {
// //           setJobs(data.data);
// //           setFilteredJobs(data.data);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching jobs:", error);
// //         toast.error("Failed to fetch jobs. Please try again later.");
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchJobs();
// //   }, []);
// useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(
//           `${BASE_URL}/api/user/job-favorites`,
//           {
//             headers: {
//               Authorization: token, // Add token if required
//             },
//           }
//         );

//         if (response.data.data) {
//           setJobs(response.data.data);
//           setFilteredJobs(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//         toast.error("Failed to fetch jobs. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);
//   const handleSort = (e) => {
//     const sortValue = e.target.value;
//     setSort(sortValue);

//     const sortedJobs = [...filteredJobs].sort((a, b) => {
//       if (sortValue === "asc") {
//         return a.id - b.id;
//       } else if (sortValue === "des") {
//         return b.id - a.id;
//       }
//       return 0;
//     });

//     setFilteredJobs(sortedJobs);
//   };

//   const handlePerPage = (e) => {
//     const pageData = JSON.parse(e.target.value);
//     setPerPage(pageData);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-lg text-gray-600">Loading jobs...</div>
//       </div>
//     );
//   }

//   const displayedJobs = filteredJobs.slice(
//     perPage.start,
//     perPage.end !== 0 ? perPage.end : filteredJobs.length
//   );

//   return (
//     <>
//       {/* <Navbar /> */}
//       <div className="w-full max-w-7xl mx-auto px-4 py-8">
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <div className="flex justify-between items-center mb-8">
//               <h1 className="text-2xl font-bold text-gray-800">Saved Jobs</h1>
//             </div>

//             <div className="flex items-center space-x-4">
//               <select
//                 value={sort}
//                 onChange={handleSort}
//                 className="block w-full rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value="">Sort by (default)</option>
//                 <option value="asc">Newest</option>
//                 <option value="des">Oldest</option>
//               </select>

//               <select
//                 onChange={handlePerPage}
//                 value={JSON.stringify(perPage)}
//                 className="block w-full rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value={JSON.stringify({ start: 0, end: 0 })}>
//                   All
//                 </option>
//                 <option value={JSON.stringify({ start: 0, end: 20 })}>
//                   20 per page
//                 </option>
//                 <option value={JSON.stringify({ start: 0, end: 25 })}>
//                   25 per page
//                 </option>
//                 <option value={JSON.stringify({ start: 0, end: 30 })}>
//                   30 per page
//                 </option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap -mx-4">
//           {displayedJobs.map((job) => (
//             <JobCard
//               key={job.id}
//               item={job}
//               onSaveJob={handleSaveJob}
//               onApplyNow={handleApplyNow}
//             />
//           ))}
//         </div>

//         <div className="mt-8 text-center">
//           <div className="text-sm text-gray-600 mb-4">
//             Showing {displayedJobs.length} of {jobs.length} Jobs
//           </div>
//           {/* <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
//           <div
//             className="bg-blue-950 h-2 rounded-full transition-all duration-300"
//             style={{ width: `${(displayedJobs.length / jobs.length) * 100}%` }}
//           ></div>
//         </div> */}
//           {/* {displayedJobs.length < jobs.length && (
//          <Link href={'https://abroadium-arbuild-fe.vercel.app/job-list'}>
//             <button
//             // onClick={() => setPerPage({ start: 0, end: 0 })}
//             className="px-6 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-950 transition-colors"
//           >
//             Show More
//           </button>
//          </Link>
//         )} */}
//         </div>

//         {showLoginModal && (
//           <LoginModal onClose={() => setShowLoginModal(false)} />
//         )}
//       </div>
//     </>
//   );
// }
"use client";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Heart,
  Bookmark,
  Filter,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import Image from "next/image";
import { BASE_URL } from "../../components/Constant/constant";
import { ResumeContext } from "../../components/context/ResumeContext";

const LoginModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Please Login</h3>
        <p className="mb-6 text-gray-600">
          You need to be logged in to perform this action.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <Link
            href="/login2"
            className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-950 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ item, onSaveJob, onApplyNow }) => (
  <div className="w-full md:w-1/2 p-4">
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col space-y-4">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 flex-shrink-0">
            <img
              src={
                item.logo ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s"
              }
              alt="Company Logo"
              width={64}
              height={64}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <Link
              href={`${item.redirect_url}`}
              className="text-lg font-semibold text-gray-900 hover:text-teal-700 transition-colors"
            >
              {item.job_title}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4" />
            <span>{item.category || "Not specified"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>
              {item.location ? `${item.location}` : "Location not specified"}
            </span>
          </div>
        </div>

        {item.job_type && (
          <div className="flex items-center">
            <span className="px-3 py-1 text-sm text-teal-700 bg-blue-50 rounded-full">
              {item.job_type}
            </span>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => onSaveJob(item.id)}
            className="p-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            onClick={() => onApplyNow(item.id)}
            className="p-2 text-gray-600 hover:text-teal-700 transition-colors"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sort, setSort] = useState("");
  const [perPage, setPerPage] = useState({ start: 0, end: 4 });
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [token, setToken] = useState(null);
  const { selectedLang } = useContext(ResumeContext);

  // Initialize token on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
    }
  }, []);

  const handleSaveJob = async (jobId) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/job-favorites?lang=${selectedLang}`,
        {
          job_id: jobId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "success" || response.data.code === 200) {
        toast.success("Job saved successfully!");
      } else {
        toast.error("Failed to save the job. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while saving the job.");
    }
  };

  const handleApplyNow = (jobId) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    // Implement your apply logic here
  };

  useEffect(() => {
    const fetchJobs = async () => {
      if (!token) return; // Don't fetch if no token

      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/user/job-favorites?lang=${selectedLang}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.data) {
          setJobs(response.data.data);
          setFilteredJobs(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to fetch jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [token]); // Added token as dependency

  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSort(sortValue);

    const sortedJobs = [...filteredJobs].sort((a, b) => {
      if (sortValue === "asc") {
        return a.id - b.id;
      } else if (sortValue === "des") {
        return b.id - a.id;
      }
      return 0;
    });

    setFilteredJobs(sortedJobs);
  };

  const handlePerPage = (e) => {
    const pageData = JSON.parse(e.target.value);
    setPerPage(pageData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading jobs...</div>
      </div>
    );
  }

  const displayedJobs = filteredJobs.slice(
    perPage.start,
    perPage.end !== 0 ? perPage.end : filteredJobs.length
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Saved Jobs</h1>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={sort}
              onChange={handleSort}
              className="block w-full rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Sort by (default)</option>
              <option value="asc">Newest</option>
              <option value="des">Oldest</option>
            </select>

            <select
              onChange={handlePerPage}
              value={JSON.stringify(perPage)}
              className="block w-full rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={JSON.stringify({ start: 0, end: 0 })}>All</option>
              <option value={JSON.stringify({ start: 0, end: 20 })}>
                20 per page
              </option>
              <option value={JSON.stringify({ start: 0, end: 25 })}>
                25 per page
              </option>
              <option value={JSON.stringify({ start: 0, end: 30 })}>
                30 per page
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-4">
        {displayedJobs.map((job) => (
          <JobCard
            key={job.id}
            item={job}
            onSaveJob={handleSaveJob}
            onApplyNow={handleApplyNow}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="text-sm text-gray-600 mb-4">
          Showing {displayedJobs.length} of {jobs.length} Jobs
        </div>
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}
