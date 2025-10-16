import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Divider */}
        <div className="mb-8">
          <div className="h-px w-full bg-gray-700"></div>
        </div>

        {/* Main footer content with a responsive layout */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Copyright Notice (Left-aligned on desktop) */}
          <div className="text-center md:text-left">
            <p className="text-sm">
              Copyright © {currentYear} Sumeet Santosh Umbalkar.
            </p>
            <p className="text-xs text-gray-500 mt-1">All Rights Reserved.</p>
          </div>

          {/* Navigation Links (Right-aligned on desktop) */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <Link
              target="_blank"
              to="/about"
              className="text-sm hover:text-white transition-colors duration-300"
            >
              About
            </Link>
            <Link
              target="_blank"
              to="/contact"
              className="text-sm hover:text-white transition-colors duration-300"
            >
              Contact
            </Link>
            <Link
              target="_blank"
              to="/terms-and-conditions"
              className="text-sm hover:text-white transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              target="_blank"
              to="/privacy-policy"
              className="text-sm hover:text-white transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              target="_blank"
              to="/refund-policy"
              className="text-sm hover:text-white transition-colors duration-300"
            >
              Refunds
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
