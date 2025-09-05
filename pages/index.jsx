import React from "react";
import Builder from "./builder";
import Loder from "./Loder";
import Home_first from "./Home/Home_first";
import FAQ from "./Home/FAQ/FAQ_Component.jsx";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Home_fourth from "./Home/Home_fourth.jsx";

const ResumeBuilder = () => {
  return (
    <>
      {/* <Builder /> */}
      <Navbar />
      <Home_first />
      <Home_fourth />
      <FAQ />
      {/* <Loder/> */}

      <Footer />
    </>
  );
};

export default ResumeBuilder;
