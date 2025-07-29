// import React from "react";
// import Image from "next/image";
// import logo from "../Footer/logo.png";
// import { useState } from "react";
// import axios from "axios";
// import Link from "next/link"; // Import Link from next/link
// import img from "../Footer/footer-img.jpg";
// import { BASE_URL } from "../../components/Constant/constant";
// import { useTranslation } from "react-i18next";
// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//  const { t } = useTranslation();
//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent form default behavior

//     // Sending raw JSON data in the POST request
//     axios
//       .post(
//         `${BASE_URL}/api/user/user-subscribe`,
//         JSON.stringify({ email }), // Sending email in raw JSON
//         {
//           headers: {
//             "Content-Type": "application/json", // Specify raw JSON
//           },
//         }
//       )
//       .then((response) => {
//         // Handle the response, show a success message
//         setMessage("Subscribed successfully!");
//         toast.success("Subscribed successfully!");
//       })
//       .catch((error) => {
//         // Handle the error, show an error message
//         setMessage("Subscription failed. Please try again.");
//         console.error("Error subscribing:", error);
//       });
//   };

//   return (
//     <>
//       <footer className="bg-gray-300 text-black py-8" id="footerbg">
//         <div className="container mx-auto flex flex-col gap-7 justify-between px-6">
//           <div className="flex flex-wrap justify-between px-2 md:px-[65px]">
//             <div className="w-auto h mb-6 md:mb-0">
//               <Link href="/">
//                 <Image src={logo} alt="logo" className="h-12 w-[200px]" />
//               </Link>
//               <p className="text-lg text-bold px-5">
//                 Building Careers of Tomorrow
//               </p>
//             </div>
//             {/* <div className="flex flex-wrap justify-between px-2 md:px-[65px]">
//             <div className="w-auto h mb-6 md:mb-0">
//               <Link href="/">
//                 <Image src={img} alt="logo" className="h-20 w-[300px]" />
//               </Link>
//               </div>
//             </div> */}

//             <div className="w-full md:w-auto mb-6 md:mb-0">
//               <h2 className="text-lg font-semibold text-blue-950 hover:text-emerald-500 ">
//                 Get Our Weekly
//               </h2>
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col md:flex-row gap-3"
//               >
//                 <input
//                   type="email"
//                   placeholder="Type your email..."
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)} // Update the email state
//                   required
//                   className="p-2 rounded text-black"
//                 />
//                 <button
//                   type="submit"
//                   className="md:px-4 md:py-1 p-1 rounded-full bg-white text-black hover:bg-green-500"
//                 >
//                   Subscribe
//                 </button>
//               </form>
//               {message && <p>{message}</p>} {/* Display message */}
//             </div>
//           </div>
//           <br />
//           <div className="flex flex-wrap justify-around">
//             <div className="w-full md:w-auto mb-6 md:mb-0" id="footer">
//               <h2 className="text-lg font-bold text-blue-950 hover:text-emerald-500 ">Cibli Job </h2>
//               <ul>
//                 <li>
//                   <Link href="/footers/Aboutus">
//                     <span>About Us</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/footers/Careers">
//                     <span>Careers</span>
//                   </Link>
//                 </li>
//                 {/* <li>
//                   <Link href="/footers/placement">
//                     <span>Placement Support</span>
//                   </Link>
//                 </li> */}
//                 <li>
//                   <Link href="">
//                     <span>Resources</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div className="w-full md:w-auto mb-6 md:mb-0">
//               <h2 className="text-lg font-bold text-blue-950 hover:text-emerald-500 ">Support</h2>
//               <ul>
//                 <li>
//                   <Link href="/footers/Salarytools">
//                     <span>Salary Tool</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/TermsandConditions">
//                     <span>Terms & Conditions</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/footers/PrivacyPolicy">
//                     <span>Privacy Policy</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div className="w-full md:w-auto mb-6 md:mb-0">
//               <h2 className="text-lg font-bold text-blue-950 hover:text-emerald-500 ">
//                 Scope & Products
//               </h2>
//               <ul>
//                 <li>
//                   <Link href="/footers/AiResumeBuilder">
//                     <span>Ai Resume Builder</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/footers/AiSkillTests">
//                     <span>Ai Skill Tests</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/footers/AiCVParsing">
//                     <span>Ai CV Parsing</span>
//                   </Link>
//                 </li>
//                 {/* <li>
//                   <Link href="">
//                     <span>White Labelling</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#">
//                     <span>Generative AI</span>
//                   </Link>
//                 </li> */}
//               </ul>
//             </div>
//             <div className="w-full md:w-auto mb-6 md:mb-0">
//               <h2 className="text-lg font-bold text-blue-950 hover:text-emerald-500 ">Ai Resources</h2>
//               <ul>
//                 <li>
//                   <Link href="/footers/AIEnhancedResumeAccuracy">
//                     <span>Ai - Resume Accuracy</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/footers/AiResumeEnhancer">
//                     <span>Ai - Resume Enhancer</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/footers/AiJobMatchApply">
//                     <span>Ai - Job Match & Apply</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="container text-base md:mx-auto text-center border-t border-white pt-6 mt-6">
//           <p className="text-blue-950 hover:text-emerald-500  text-right">
//             &copy; Copyright By CibliJob.fr All Rights Reserved
//           </p>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;
import React, { useContext } from "react";
import Image from "next/image";
import logo from "../Footer/logo.png";
import { useState } from "react";
import axios from "axios";
import Link from "next/link"; // Import Link from next/link
import img from "../Footer/footer-img.jpg";
import { BASE_URL } from "../../components/Constant/constant";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ResumeContext } from "../../components/context/ResumeContext";
import axiosInstance from "../../components/utils/axiosInstance";
import SupportPopup from "./supportpopup";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { selectedLang } = useContext(ResumeContext);
  const [showPopup, setShowPopup] = useState(false);

  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form default behavior

    // Sending raw JSON data in the POST request
    axiosInstance
      .post(
        `/api/user/user-subscribe?lang=${selectedLang}`,
        JSON.stringify({ email }), // Sending email in raw JSON
        {
          headers: {
            "Content-Type": "application/json", // Specify raw JSON
          },
        }
      )
      .then((response) => {
        // Handle the response, show a success message
        setMessage("Subscribed successfully!");
        toast.success(t("footer.toast_success"));
        setEmail("");
      })
      .catch((error) => {
        // Handle the error, show an error message
        setMessage("Subscription failed. Please try again.");
        console.error("Error subscribing:", error);
      });
  };

  return (
    <>
      <footer className="bg-gray-300 text-black py-8" id="footerbg">
        <div className="container mx-auto flex flex-col gap-7 px-6">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:px-[65px]">
            {/* Logo and Tagline */}
            <div className="text-center md:text-left">
              <Link href="/">
                <Image
                  src={logo}
                  alt="logo"
                  className="h-[100px] w-[200px] mx-auto md:mx-0"
                />
              </Link>
              <p className="text-lg font-bold mt-2 text-blue-950">
                {t("footer.building_careers")}
              </p>
            </div>

            {/* Subscribe */}
            <div className="text-center md:text-left w-full md:w-auto">
              <h2 className="text-lg font-semibold text-blue-950 hover:text-emerald-500 ">
                {t("footer.get_our_weekly")}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row gap-3 mt-2 justify-center md:justify-start"
              >
                <input
                  type="email"
                  placeholder={t("footer.type_your_email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-2 rounded text-black w-full md:w-auto"
                />
                {/* <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-white text-black hover:bg-green-500"
                >
                  {t("footer.subscribe")}
                </button> */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 rounded-md bg-blue-950 text-white hover:bg-emerald-500 transition-colors duration-200"
                >
                  {t("footer.subscribe")}
                </button>
              </form>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-around text-center md:text-left gap-6">
            {/* Section 1 */}
            <div>
              <h2 className="text-lg font-bold text-blue-950 hover:text-emerald-500 ">
                {t("footer.cibli_job")}
              </h2>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/about-us">{t("footer.about_us")}</Link>
                </li>
                <li>
                  <Link href="/careers">{t("footer.careers")}</Link>
                </li>
                <li>
                  <Link href="https://blog.rewritecanada.ca/">
                    {t("footer.resources")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-lg font-bold text-blue-950 hover:text-emerald-500 ">
                {t("footer.support")}
              </h2>
              <div>
                {/* <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowPopup(true)}
                >
                  Open Support Form
                </button> */}

                <SupportPopup
                  isOpen={showPopup}
                  onClose={() => setShowPopup(false)}
                />
              </div>
              <ul className="mt-2 space-y-1">
                <li
                  onClick={() => setShowPopup(true)}
                  className=" cursor-pointer"
                >
                  {t("footer.support")}
                </li>
                {/* <li>
                  <Link href="/salary-tools">{t("footer.salary_tool")}</Link>
                </li> */}
                <li>
                  <Link href="/terms&conditions">
                    {t("footer.terms_conditions")}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    {t("footer.privacy_policy")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            {/* <div>
              <h2 className="text-lg font-bold text-blue-950 hover:text-emerald-500 ">
                {t("footer.scope_products")}
              </h2>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/ai-resume-builder-online">
                    {t("footer.ai_resume_builder")}
                  </Link>
                </li>
                <li>
                  <Link href="/ai-skill-tests">
                    {t("footer.ai_skill_tests")}
                  </Link>
                </li>
                <li>
                  <Link href="/ai-cv-parsing">{t("footer.ai_cv_parsing")}</Link>
                </li>
              </ul>
            </div> */}

            {/* Section 4 */}
            {/* <div>
              <h2 className="text-lg font-bold text-blue-950 hover:text-emerald-500 ">
                {t("footer.ai_resources")}
              </h2>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/ai-enhanced-resume-accuracy">
                    {t("footer.ai_resume_accuracy")}
                  </Link>
                </li>
                <li>
                  <Link href="/ai-resume-enhancer">
                    {t("footer.ai_resume_enhancer")}
                  </Link>
                </li>
                <li>
                  <Link href="/ai-job-match-apply">
                    {t("footer.ai_job_match_apply")}
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>

          {/* Copyright */}
          <div className="border-t border-white pt-6 mt-6 text-center">
            <p className="text-blue-950 hover:text-emerald-500 ">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
