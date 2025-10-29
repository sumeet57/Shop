import React from "react";
import { useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="authpage flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans relative overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center animate-fadeInUp z-10">
        <h1 className="text-[9rem] md:text-[12rem] font-extrabold text-green-500 leading-none mb-4 animate-pulse tracking-widest">
          404
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-md">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-full hover:bg-green-700 transition-all duration-300 font-medium text-white"
        >
          <HiHome className="text-2xl" />
          Back to Home
        </button>
      </div>

      <div className="absolute -bottom-16 w-[200%] h-64 bg-gradient-to-t from-green-600/20 to-transparent blur-3xl animate-wave"></div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave {
          animation: wave 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
