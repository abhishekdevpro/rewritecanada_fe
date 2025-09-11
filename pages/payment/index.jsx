// import { useState } from "react";
// import {
//   CheckCircle,
//   RefreshCw,
//   Bell,
//   Clock,
//   Award,
//   Briefcase,
//   Send,
//   Zap,
// } from "lucide-react";
// import Link from "next/link";
// import { useTranslation } from "next-i18next";
// import { useRouter } from "next/router";
// import Navbar from "../Navbar/Navbar";

// export default function Payment() {
//   const [selectedPlan, setSelectedPlan] = useState("freePlan");
//   const { t } = useTranslation();
//   const router = useRouter();

//   const handlePlanSelection = (planId) => {
//     setSelectedPlan(planId);
//   };

//   const goToNextPage = () => {
//     // Pass the selected plan to the next page as a query parameter
//     router.push({
//       pathname: "/payment/plans",
//       query: { plan: selectedPlan },
//     });
//   };

//   const planTypes = [
//     "freePlan",
//     // "threeDays",
//     "weeklyplan",
//     "aiProMonth",
//     // "aiProthreeMonth",
//     // "aiProYearly",
//   ];

//   return (
//     <>
//       <Navbar />
//       <div className="p-6 max-w-7xl w-full mx-auto   bg-gradient-to-b from-white to-mainColor">
//         {/* Intro Section */}
//         <div className="bg-green-100 p-4 rounded-lg text-center">
//           <h2 className="text-lg md:text-xl font-semibold">
//             ✨ {t("paymentplans.Cast a wider net – 10x your job applications")}
//           </h2>
//           <p className="text-gray-600 text-sm md:text-base">
//             {t("paymentplans.Our AI-powered platform scours")}
//           </p>
//         </div>

//         <h2 className="text-xl md:text-2xl font-bold mt-6 text-center">
//           {t("paymentplans.Kudos! You're one step closer to success")} 🎉
//         </h2>
//         <p className="text-gray-600 text-sm md:text-base text-center mt-2">
//           {" "}
//           {t("paymentplans.kudos_description")}
//         </p>
//         {/* Pricing Section Title */}
//         <div className="text-center my-8">
//           <h2 className="text-2xl font-bold">
//             {t("paymentplans.Pricing Plans")}
//           </h2>
//           <p className="text-gray-600 mt-2">{t("paymentplans.title")}</p>
//           <p className="text-gray-500 mt-1">{t("paymentplans.subtitle")}</p>
//         </div>

//         <div className="flex flex-col justify-between gap-2">
//           <div>
//             <div className="flex flex-col md:flex-row justify-center gap-4 flex-wrap">
//               {planTypes.map((planType) => (
//                 <div
//                   key={planType}
//                   className={`border rounded-lg p-4 flex flex-col w-full md:w-64 relative ${
//                     selectedPlan === planType
//                       ? "border-[#00b38d] bg-green-50"
//                       : "bg-white"
//                   }`}
//                   onClick={() => handlePlanSelection(planType)}
//                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="font-bold text-lg">
//                       {t(`pricing.${planType}.title`)}
//                     </h3>
//                     <input
//                       type="checkbox"
//                       checked={selectedPlan === planType}
//                       onChange={() => {}}
//                       className="h-5 w-5 text-[#00b38d]"
//                     />
//                   </div>
//                   <div className="text-2xl font-bold mb-1">
//                     {Number(t(`pricing.${planType}.price`)) === 0
//                       ? t("pricing.freeLabel")
//                       : `$${t(`pricing.${planType}.price`)}`}

//                     {t(`pricing.${planType}.billingCycle`) && (
//                       <span className="text-gray-500 ml-1 text-sm">
//                         /{t(`pricing.${planType}.billingCycle`)}
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex-grow">
//                     <ul className="space-y-2 text-sm">
//                       {Array.from({ length: 10 }).map((_, index) => {
//                         const feature = t(
//                           `pricing.${planType}.feature${index + 1}`
//                         );
//                         if (
//                           !feature ||
//                           feature === `pricing.${planType}.feature${index + 1}`
//                         ) {
//                           return null;
//                         }
//                         return (
//                           <li key={index} className="flex items-start">
//                             <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
//                             <span className="text-gray-600 text-sm">
//                               {feature}
//                             </span>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Features & Payment Section */}
//           <div className="flex flex-col md:flex-row gap-6 mt-8">
//             {/* Features List */}
//             <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
//               <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
//                 {t("paymentplans.All subscription features")}
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Feature
//                   icon={<Award className="text-green-500" />}
//                   title="Expert-Crafted Professional Templates"
//                   description="Access stunning resume templates built by industry experts to help you stand out instantly."
//                 />
//                 <Feature
//                   icon={<CheckCircle className="text-green-500" />}
//                   title="ATS-Compliant & Industry-Backed"
//                   description="Every resume is designed to pass Applicant Tracking Systems and is reviewed against current hiring standards."
//                 />
//                 <Feature
//                   icon={<Zap className="text-green-500" />}
//                   title="AI Resume Correction & Assistance"
//                   description="Let our AI fix formatting, grammar, and structure errors in real-time—no effort needed."
//                 />
//                 <Feature
//                   icon={<Clock className="text-green-500" />}
//                   title="AI-Assisted Resume Completion"
//                   description="Finish your resume faster and smarter with intelligent content suggestions and section guidance."
//                 />
//                 <Feature
//                   icon={<Briefcase className="text-green-500" />}
//                   title="AI Skill Tests & Career Insights"
//                   description="Evaluate your skills, identify gaps, and get tailored upskilling recommendations instantly."
//                 />
//                 <Feature
//                   icon={<Bell className="text-green-500" />}
//                   title="Daily Role Matches to Your Profile"
//                   description="Receive curated job listings matched to your skills, experience, and career goals—right in your dashboard."
//                 />
//                 <Feature
//                   icon={<Send className="text-green-500" />}
//                   title="Multiply Your Applications, Effortlessly"
//                   description="Apply to 10x more jobs in a fraction of the time using 1-click apply and auto-fill tools."
//                 />
//                 <Feature
//                   icon={<RefreshCw className="text-green-500" />}
//                   title="Save Hours Weekly with Automation"
//                   description="Free up your schedule as our platform handles the repetitive job search tasks for you."
//                 />
//               </div>
//               <div className="mt-6">
//                 <button
//                   onClick={goToNextPage}
//                   className="w-full bg-[#00b38d] text-white text-lg font-semibold py-3 rounded-lg"
//                 >
//                   {t("paymentplans.Next")}
//                 </button>
//                 <p className="text-gray-600 text-center mt-4">
//                   <strong>“Got questions? </strong>
//                   Contact our customer support team anytime. You can cancel your
//                   subscription by email or online by reaching out to us at{" "}
//                   <a
//                     href="mailto:dummy@rewritecanada.ca"
//                     className="text-blue-600 hover:underline"
//                   >
//                     dummy@rewritecanada.ca
//                   </a>
//                   .”
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // Feature Component
// function Feature({ icon, title, description }) {
//   return (
//     <div className="flex space-x-3 items-start">
//       <div className="mt-1">{icon}</div>
//       <div>
//         <p className="font-semibold">{title}</p>
//         <p className="text-gray-600 text-sm">{description}</p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import {
  CheckCircle,
  RefreshCw,
  Bell,
  Clock,
  Award,
  Briefcase,
  Send,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Navbar from "../Navbar/Navbar";
import { BASE_URL } from "../../components/Constant/constant";
import { toast } from "react-toastify";
import { SaveLoader } from "../../components/ResumeLoader/SaveLoader";

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState("freePlan");
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handlePlanSelection = (planId) => {
    setSelectedPlan(planId);
  };

  const goToNextPage = () => {
    // Pass the selected plan to the next page as a query parameter
    router.push({
      pathname: "/payment/plans",
      query: { plan: selectedPlan },
    });
  };

  const planTypes = [
    "freePlan",
    // "threeDays",
    "weeklyplan",
    "aiProMonth",
    // "aiProthreeMonth",
    // "aiProYearly",
  ];
  const handleCheckout = async () => {
    if (!selectedPlan) {
      toast.success(t("paymentss.selectPlan"));
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(t("paymentss.authRequired"));
      router.push("/login2");
      return;
    }

    const planMapping = {
      freePlan: 1,
      // threeDays: 2,
      weeklyplan: 3,
      aiProMonth: 4,
      aiProthreeMonth: 5,
      aiProYearly: 6,
    };

    const planId = planMapping[selectedPlan];
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/payment/checkout`,
        { plan_id: planId },
        { headers: { Authorization: token } }
      );

      if (response.status === 200 && response.data.url) {
        toast.success(t("paymentss.redirecting"));
        window.location.href = response.data.url;
      } else {
        toast.error(t("paymentss.alreadySubscribed"));
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.response?.data?.message || t("paymentss.genericError"));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl w-full mx-auto   bg-gradient-to-b from-white to-mainColor">
        {/* Intro Section */}
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h2 className="text-lg md:text-xl font-semibold">
            ✨ {t("paymentplans.Cast a wider net – 10x your job applications")}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {t("paymentplans.Our AI-powered platform scours")}
          </p>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mt-6 text-center">
          {t("paymentplans.Kudos! You're one step closer to success")} 🎉
        </h2>
        <p className="text-gray-600 text-sm md:text-base text-center mt-2">
          {" "}
          {t("paymentplans.kudos_description")}
        </p>
        {/* Pricing Section Title */}
        <div className="text-center my-8">
          <h2 className="text-2xl font-bold">
            {t("paymentplans.Pricing Plans")}
          </h2>
          <p className="text-gray-600 mt-2">{t("paymentplans.title")}</p>
          <p className="text-gray-500 mt-1">{t("paymentplans.subtitle")}</p>
        </div>

        <div className="flex flex-col justify-between gap-2">
          <div>
            <div className="flex flex-col md:flex-row justify-center gap-4 flex-wrap">
              {planTypes.map((planType) => (
                <div
                  key={planType}
                  className={`border rounded-lg p-4 flex flex-col w-full md:w-64 relative cursor-pointer ${
                    selectedPlan === planType
                      ? "border-[#00b38d] bg-green-50"
                      : "bg-white"
                  }`}
                  onClick={() => handlePlanSelection(planType)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">
                      {t(`pricing.${planType}.title`)}
                    </h3>
                    <input
                      type="checkbox"
                      checked={selectedPlan === planType}
                      onChange={() => {}}
                      className="h-5 w-5 text-[#00b38d] cursor-pointer"
                    />
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    {Number(t(`pricing.${planType}.price`)) === 0
                      ? t("pricing.freeLabel")
                      : `$${t(`pricing.${planType}.price`)}`}

                    {t(`pricing.${planType}.billingCycle`) && (
                      <span className="text-gray-500 ml-1 text-sm">
                        /{t(`pricing.${planType}.billingCycle`)}
                      </span>
                    )}
                  </div>

                  <div className="flex-grow">
                    <ul className="space-y-2 text-sm">
                      {Array.from({ length: 10 }).map((_, index) => {
                        const feature = t(
                          `pricing.${planType}.feature${index + 1}`
                        );
                        if (
                          !feature ||
                          feature === `pricing.${planType}.feature${index + 1}`
                        ) {
                          return null;
                        }
                        return (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">
                              {feature}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features & Payment Section */}
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            {/* Features List */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
                {t("paymentplans.All subscription features")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Feature
                  icon={<Award className="text-green-500" />}
                  title="Expert-Crafted Professional Templates"
                  description="Access stunning resume templates built by industry experts to help you stand out instantly."
                />
                <Feature
                  icon={<CheckCircle className="text-green-500" />}
                  title="ATS-Compliant & Industry-Backed"
                  description="Every resume is designed to pass Applicant Tracking Systems and is reviewed against current hiring standards."
                />
                <Feature
                  icon={<Zap className="text-green-500" />}
                  title="AI Resume Correction & Assistance"
                  description="Let our AI fix formatting, grammar, and structure errors in real-time—no effort needed."
                />
                <Feature
                  icon={<Clock className="text-green-500" />}
                  title="AI-Assisted Resume Completion"
                  description="Finish your resume faster and smarter with intelligent content suggestions and section guidance."
                />
                <Feature
                  icon={<Briefcase className="text-green-500" />}
                  title="AI Skill Tests & Career Insights"
                  description="Evaluate your skills, identify gaps, and get tailored upskilling recommendations instantly."
                />
                <Feature
                  icon={<Bell className="text-green-500" />}
                  title="Daily Role Matches to Your Profile"
                  description="Receive curated job listings matched to your skills, experience, and career goals—right in your dashboard."
                />
                <Feature
                  icon={<Send className="text-green-500" />}
                  title="Multiply Your Applications, Effortlessly"
                  description="Apply to 10x more jobs in a fraction of the time using 1-click apply and auto-fill tools."
                />
                <Feature
                  icon={<RefreshCw className="text-green-500" />}
                  title="Save Hours Weekly with Automation"
                  description="Free up your schedule as our platform handles the repetitive job search tasks for you."
                />
              </div>
              <div className="mt-6">
                <button
                  disabled={selectedPlan === "freePlan"}
                  onClick={() => {
                    handleCheckout();
                  }}
                  // onClick={goToNextPage}
                  // className="w-full bg-[#00b38d] text-white text-lg font-semibold py-3 rounded-lg"
                  className={`w-full bg-[#00b38d] text-white text-lg font-semibold py-3 rounded-lg transition 
    ${
      selectedPlan === "freePlan"
        ? "cursor-not-allowed opacity-50"
        : "hover:bg-[#009f7c] cursor-pointer"
    }`}
                >
                  {isLoading ? (
                    <SaveLoader loadingText={t("processing....")} />
                  ) : (
                    t("paymentplans.Next")
                  )}
                </button>
                <p className="text-gray-600 text-center mt-4">
                  <strong>“Got questions? </strong>
                  Contact our customer support team anytime. You can cancel your
                  subscription by email or online by reaching out to us at{" "}
                  <a
                    href="mailto:dummy@rewritecanada.ca"
                    className="text-blue-600 hover:underline"
                  >
                    dummy@rewritecanada.ca
                  </a>
                  .”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Feature Component
function Feature({ icon, title, description }) {
  return (
    <div className="flex space-x-3 items-start">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
