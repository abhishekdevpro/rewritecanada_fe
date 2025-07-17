// import Link from "next/link";
// import { useTranslation } from "react-i18next";

// const InterviewSection = () => {
//   const { t } = useTranslation();
//   return (
//     <div className="border border-gray-200 rounded-lg p-6 mb-6">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-teal-100 rounded-lg">
//             <svg
//               className="w-6 h-6 text-teal-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//               />
//             </svg>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">
//               {t("dashboard_interview.clearInterview")}
//             </h3>
//             <p className="text-gray-600 max-w-md">
//               {t("dashboard_interview.description")}
//             </p>
//           </div>
//         </div>
//         <Link href={`https://blog.rewritecanada.ca/`}>
//           <button className="px-6 py-2 border border-teal-700 text-teal-700 rounded-lg hover:bg-blue-50">
//             {t("dashboard_interview.visitResources")}
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default InterviewSection;
import Link from "next/link";
import { useTranslation } from "react-i18next";

const InterviewSection = () => {
  const { t } = useTranslation();

  return (
    <div className="border border-gray-200 rounded-lg p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Left side */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 bg-teal-100 rounded-lg">
            <svg
              className="w-6 h-6 text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {t("dashboard_interview.clearInterview")}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base max-w-md">
              {t("dashboard_interview.description")}
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="sm:ml-4">
          <Link href="https://blog.rewritecanada.ca/" passHref>
            <button className="w-full sm:w-auto px-4 py-2 border border-teal-700 text-teal-700 rounded-md hover:bg-teal-50 transition">
              {t("dashboard_interview.visitResources")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterviewSection;
