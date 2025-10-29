import React from "react";
import { MdOutlineSecurityUpdateWarning } from "react-icons/md"; // Import a suitable icon

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <MdOutlineSecurityUpdateWarning className="text-red-500 text-6xl md:text-8xl mb-6 animate-pulse" />
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
        Access Denied
      </h1>
      <p className="text-lg md:text-xl text-center max-w-2xl px-2 mb-8">
        You do not have the necessary permissions to view this page. Please
        contact an administrator if you believe this is an error.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
      >
        Go to Home
      </a>
    </div>
  );
};

export default UnauthorizedPage;
