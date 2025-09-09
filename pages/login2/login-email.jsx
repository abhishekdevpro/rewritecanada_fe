"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import logo from "./logo.png";

const LoginEmail = () => {
  const handleGoogleSignin = async () => {
    const url = "https://api.novajobs.us/api/students/auth/google";

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Google sign-in token: ", response.data.data);
        window.open(response.data.data);
      } else {
        // Replace with your toast implementation
        alert("Google sign-in failed.");
      }
    } catch (err) {
      console.log(err);
      alert(`${err.response?.data?.message || "Google sign-in failed"}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center mx-4">
        {/* Logo */}
        <Link
          href="/login2"
          className="text-blue-600 flex items-center mb-6 hover:text-blue-700"
        >
          <span className="mr-2">←</span> Back
        </Link>
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="Logo" className="h-[100px] w-[150px]" />
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
        <p className="text-gray-600 mb-6">Keep your account safe.</p>

        {/* User Email */}
        {/* <p className="mb-6">
          Continue as <strong>abc@gmail.com</strong>{' '}
          <a href="#" className="text-teal-700 hover:text-[#009977]">
            (not you?)
          </a>
        </p> */}

        {/* Google Sign-In Button */}
        <div className="mb-6">
          <button
            onClick={handleGoogleSignin}
            type="button"
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
          >
            <FcGoogle className="mr-2 text-2xl" />
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Privacy Policy */}
        <p className="text-sm text-gray-600 mb-6">
          UltraAura will only use your information as described in our{" "}
          <Link
            href="/privacy-policy"
            className="text-teal-700 hover:text-[#009977]"
          >
            Privacy Policy
          </Link>
          . Google may ask for your permission to share details with UltraAura,
          such as your name, profile picture, and email address.
        </p>

        {/* Alternative Sign-In */}
        <Link
          href="/login2/login-code"
          className="text-teal-700 hover:text-[#009977] inline-block"
        >
          Sign in with login code instead
        </Link>
      </div>
    </div>
  );
};

export default LoginEmail;
