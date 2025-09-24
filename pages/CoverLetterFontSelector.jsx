import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { BASE_URL } from "../components/Constant/constant";
import { CoverLetterContext } from "../components/context/CoverLetterContext";

const allFonts = [
  "font",
  "Ubuntu",
  "Calibri",
  "Georgia",
  "Roboto",
  "Poppins",
  "Arial",
  "Times New Roman",
  "Helvetica",
  "Courier New",
  "Tahoma",
  "Verdana",
  "Trebuchet MS",
  "Lucida Console",
  "Comic Sans MS",
  "Source Sans Pro",
  "Inter",
];
const freeFonts = ["Ubuntu", "Calibri"]; // Restricted fonts for free users

const CoverLetterFontSelector = () => {
  const { selectedFont, setSelectedFont } = useContext(CoverLetterContext);
  const [userPlan, setUserPlan] = useState(null);

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
          setUserPlan(response.data.data.plan_id);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const fonts = allFonts; // Restrict fonts for free users

  return (
    <select
      value={selectedFont}
      onChange={(e) => setSelectedFont(e.target.value)}
      className="rounded-lg border-2 border-mainColor px-4 py-2 bg-white text-mainColor font-medium 
    transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-lightColor hover:text-mainColor flex items-center gap-2"
    >
      {fonts.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </select>
  );
};

export default CoverLetterFontSelector;
