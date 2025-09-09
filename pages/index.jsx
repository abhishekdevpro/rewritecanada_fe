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
      <div className="fixed top-0 left-0 w-full z-50 ">
        <Navbar />
      </div>
      <main className="pt-10">
        {" "}
        {/* adjust this based on your navbar height */}
        <Home_first />
        <Home_fourth />
        <FAQ />
        <Footer />
      </main>
    </>
  );
};

export default ResumeBuilder;
