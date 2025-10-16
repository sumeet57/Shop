import React, { useState } from "react";
import Products from "./Products";
import {
  LuLayoutDashboard,
  LuPackage,
  LuUsers,
  LuClipboardList,
} from "react-icons/lu";

const MainContent = ({ currentLink }) => {
  return (
    <div className="w-full p-4 md:p-8">
      {currentLink === "dashboard" && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700/50 min-h-[70vh]">
          <h1 className="text-3xl font-bold text-gray-100 mb-6 capitalize">
            {currentLink} Overview
          </h1>
          <div className="text-gray-400">Dashboard Overview</div>
        </div>
      )}
      {currentLink === "products" && <Products />}
      {currentLink === "orders" && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700/50 min-h-[70vh]">
          <h1 className="text-3xl font-bold text-gray-100 mb-6 capitalize">
            {currentLink} Page
          </h1>
          <div className="text-gray-400">Orders Page</div>
        </div>
      )}
      {currentLink === "users" && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700/50 min-h-[70vh]">
          <h1 className="text-3xl font-bold text-gray-100 mb-6 capitalize">
            {currentLink} Page
          </h1>
          <div className="text-gray-400">Users Page</div>
        </div>
      )}
    </div>
  );
};

const Layout = () => {
  const navLinks = [
    { name: "dashboard", icon: LuLayoutDashboard },
    { name: "products", icon: LuPackage },
    { name: "orders", icon: LuClipboardList },
    { name: "users", icon: LuUsers },
  ];

  const [currentLink, setCurrentLink] = useState("dashboard");

  return (
    <div className="w-full flex lg:flex-row flex-col-reverse min-h-screen bg-gray-900 font-sans">
      <aside
        className="w-full bg-gray-900 z-20  
        fixed bottom-0 h-16  
        lg:fixed lg:w-64 lg:top-16 lg:h-[calc(100vh-4rem)]"
      >
        <nav className="flex lg:flex-col justify-around lg:justify-start lg:mt-4 p-1 lg:p-0">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => setCurrentLink(link.name)}
              className={` 
                flex items-center justify-center lg:justify-start gap-3 w-auto lg:w-full  
                px-4 py-2 my-1 rounded-lg transition-all duration-200 text-sm font-medium 
                ${
                  currentLink === link.name
                    ? "bg-indigo-700 text-white shadow-lg shadow-indigo-700/30"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                } 
              `}
            >
              <link.icon size={20} className="flex-shrink-0" />
              <span className="capitalize hidden lg:block">{link.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 pt-16 pb-16 lg:pb-0 lg:ml-64">
        <MainContent currentLink={currentLink} />
      </main>
    </div>
  );
};

export default Layout;
