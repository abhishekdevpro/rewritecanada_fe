import { useRouter } from "next/router";
import { useEffect } from "react";
import axiosInstance from "./utils/axiosInstance";

const googleOneTapLogin = async ({ token }) => {
  const path = `/api/user/google-one-tap-login`;
  const res = await axiosInstance.post(path, {
    token,
  });
  return res;
};

const GoogleOneTapLogin = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) return;
    // will show popup after two secs
    const timeout = setTimeout(() => oneTap(), 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const oneTap = () => {
    const { google } = window;
    if (google) {
      google.accounts.id.initialize({
        client_id:
          "976140565294-htvh81bhnh9bl9b49ajfl7n6oj597227.apps.googleusercontent.com",
        callback: async (response) => {
          // Here we call our Provider with the token provided by google
          call(response.credential);
        },
      });

      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          console.log(
            "ABC getNotDisplayedReason ::",
            notification.getNotDisplayedReason()
          );
        } else if (notification.isSkippedMoment()) {
          console.log(
            "ABC getSkippedReason  ::",
            notification.getSkippedReason()
          );
        } else if (notification.isDismissedMoment()) {
          console.log(
            "ABC getDismissedReason ::",
            notification.getDismissedReason()
          );
        }
      });
    }
  };

  const call = async (token) => {
    try {
      const res = await googleOneTapLogin({
        token,
      });
      localStorage.setItem("token", res?.data?.data?.token);
      router.push("/dashboard");
    } catch (error) {
      router.push("/login2");
    }
  };
  return <div />;
};

export default GoogleOneTapLogin;
