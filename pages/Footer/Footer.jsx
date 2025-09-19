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
//               <h2 className="text-lg font-semibold text-mainColor hover:text-mainColor ">
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
//               <h2 className="text-lg font-bold text-mainColor hover:text-mainColor ">Cibli Job </h2>
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
//               <h2 className="text-lg font-bold text-mainColor hover:text-mainColor ">Support</h2>
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
//               <h2 className="text-lg font-bold text-mainColor hover:text-mainColor ">
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
//               <h2 className="text-lg font-bold text-mainColor hover:text-mainColor ">Ai Resources</h2>
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
//           <p className="text-mainColor hover:text-mainColor  text-right">
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
import github from "../../public/assets/footer_icon1.png";
import fb from "../../public/assets/footer_icon2.png";
import insta from "../../public/assets/footer_icon3.png";
import twitter from "../../public/assets/footer_icon4.png";
import bg1 from "../../public/assets/footer-bg1.png";
import bg2 from "../../public/assets/footer-bg2.png";
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
      <footer className="bg-lightColor text-black py-6 md:py-8" id="footerbg">
        <div className="container mx-auto flex flex-col gap-6 md:gap-8 px-4 md:px-6">
          {/* Newsletter Section */}
          <div className="relative bg-mainColor rounded-xl md:rounded-2xl p-6 md:p-12 flex flex-col items-center justify-center text-center">
            <div>
              <Image
                className="absolute top-0 left-0 z-0"
                src={bg1}
                alt="bg1"
              />
              <Image
                className="absolute bottom-0 right-0 z-0"
                src={bg2}
                alt="bg2"
              />
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-4 md:mb-6 relative z-10">
              Subscribe to our newsletter
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full max-w-2xl relative z-10"
            >
              <input
                type="email"
                placeholder="Email address"
                value={email}
                maxLength={50}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full sm:flex-1 px-4 py-3 rounded-md border border-white/50 bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
              />

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-md bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200 text-sm md:text-base"
              >
                Subscribe Now
              </button>
            </form>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-center sm:text-left">
            {/* Company Info Section */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/">
                <Image
                  src={logo}
                  alt="logo"
                  className="h-[100px] w-[150px]  mx-auto sm:mx-0"
                />
              </Link>
              <p className="text-base md:text-lg font-bold mt-2 text-mainColor">
                {t("footer.building_careers")}
              </p>
              <p className="text-sm md:text-base mt-2 leading-relaxed">
                Clarity gives you the blocks and
                <br />
                components you need to create a
                <br />
                truly professional website.
              </p>
              <div className="flex justify-center sm:justify-start gap-3 md:gap-4 mt-4">
                <Image
                  src={twitter}
                  height={24}
                  width={24}
                  alt="twitter"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
                <Image
                  src={fb}
                  height={24}
                  width={24}
                  alt="facebook"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
                <Image
                  src={insta}
                  height={24}
                  width={24}
                  alt="instagram"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
                <Image
                  src={github}
                  height={24}
                  width={24}
                  alt="github"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              </div>
            </div>

            {/* Company Links */}
            <div className="mt-6">
              <h2 className="text-base md:text-lg font-bold text-mainColor mb-3 md:mb-4">
                {t("footer.cibli_job")}
              </h2>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link
                    href="/about-us"
                    className="text-sm md:text-base hover:text-mainColor transition-colors duration-200"
                  >
                    {t("footer.about_us")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-sm md:text-base hover:text-mainColor transition-colors duration-200"
                  >
                    {t("footer.careers")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://blog.rewritecanada.ca/"
                    className="text-sm md:text-base hover:text-mainColor transition-colors duration-200"
                  >
                    {t("footer.resources")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="mt-6">
              <h2 className="text-base md:text-lg font-bold text-mainColor mb-3 md:mb-4">
                {t("footer.support")}
              </h2>
              <SupportPopup
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
              />
              <ul className="space-y-2 md:space-y-3">
                <li
                  onClick={() => setShowPopup(true)}
                  className="cursor-pointer text-sm md:text-base hover:text-mainColor transition-colors duration-200"
                >
                  {t("footer.support")}
                </li>
                <li>
                  <Link
                    href="/terms&conditions"
                    className="text-sm md:text-base hover:text-mainColor transition-colors duration-200"
                  >
                    {t("footer.terms_conditions")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm md:text-base hover:text-mainColor transition-colors duration-200"
                  >
                    {t("footer.privacy_policy")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-300 pt-4 md:pt-6 mt-4 md:mt-6 text-center">
            <p className="text-xs md:text-sm text-[#52525B] hover:text-mainColor transition-colors duration-200">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
