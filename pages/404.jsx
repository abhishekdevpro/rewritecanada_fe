import { useRouter } from "next/router";
import logo from "./Navbar/logo.png";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/buttonUIComponent";
const Custom404 = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <div className="flex-shrink-0 flex items-center">
        <Link href="/">
          <Image src={logo} alt="logo" className="h-[100px] w-[150px]" />
        </Link>
      </div>
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-2">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-6 flex gap-4">
        <Button
          onClick={() => router.push("/")}
          className=" bg-mainColor text-white "
        >
          Go to Home
        </Button>
        <Button
          onClick={() => router.push("/login2")}
          className=" bg-mainsecondColor text-white "
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default Custom404;
