import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTiktok,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { menuItems } from "../utils";

const Footer = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className="bg-gray-900 text-white py-6 px-4 lg:px-16">
      <div className="flex flex-col lg:items-center flex-wrap lg:flex-row gap-x-48 border-b-2 border-gray-500 pb-6">
        {/* Left */}
        <div className="mb-6 sm:mb-2">
          <div className="flex flex-col justify-center sm:flex-row sm:items-center sm:justify-start">
            <Logo />
            <span className="text-lg font-semibold mt-3 sm:mt-0 sm:ml-3">
              Read the News,{" "}
              <span className="font-bold">Understand the World.</span>
            </span>
          </div>
        </div>

        {/* Center */}
        <div className="flex flex-col">
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-4 my-5">
            {menuItems.map((item, index) => (
              <li key={index} className="font-semibold">
                <button className="cursor-pointer hover:underline">
                  <Link to={item.path} onClick={handleClick}>
                    {item.name}
                  </Link>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="mt-6 md:mt-4 sm:flex sm:items-center ">
          <h3 className="font-bold mb-2">Follow us on:</h3>
          <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-3">
            <span
              href="#"
              className="p-2 cursor-pointer bg-gray-700 rounded-full flex items-center justify-center"
            >
              <BsFacebook className="text-xl text-white" />
            </span>
            <span
              href="#"
              className="p-2 cursor-pointer bg-gray-700 rounded-full flex items-center justify-center"
            >
              <BsTwitter className="text-xl text-white" />
            </span>
            <span
              href="#"
              className="p-2 cursor-pointer bg-gray-700 rounded-full flex items-center justify-center"
            >
              <BsInstagram className="text-xl text-white" />
            </span>
            <span
              href="#"
              className="p-2 cursor-pointer bg-gray-700 rounded-full flex items-center justify-center"
            >
              <BsLinkedin className="text-xl text-white" />
            </span>
            <span
              href="#"
              className="p-2 cursor-pointer bg-gray-700 rounded-full flex items-center justify-center"
            >
              <BsTiktok className="text-xl text-white" />
            </span>
            <span
              href="#"
              className="p-2 cursor-pointer bg-gray-700 rounded-full flex items-center justify-center"
            >
              <BsYoutube className="text-xl text-white" />
            </span>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm text-gray-400 mt-6">
        © {new Date().getFullYear()} CNC News. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
