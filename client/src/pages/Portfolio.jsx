import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import HomeSection from "../components/Portfolio/HomeSection";
import AboutSection from "../components/Portfolio/AboutSection";
import ContactSection from "../components/Portfolio/ContactSection";
import CustomCursor from "../components/Portfolio/utils/CustomCursor";
import CircularText from "../components/Portfolio/utils/CircularText.jsx";
import MenuPage from "../components/Portfolio/utils/MenuPage.jsx";
import { PortfolioContext } from "../Context/Portfolio.context.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";

import "../index.css";
import Footer from "../components/Footer.jsx";

function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  const { setCursor } = React.useContext(PortfolioContext);
  const [clicked, setClicked] = React.useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const closeMenu = () => {
    setClicked(false);
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="portfolio space-y-0 bg-black">
      <div
        onMouseEnter={() => setCursor(true, 3)}
        onMouseLeave={() => setCursor(false, 1)}
        onClick={handleClick}
        className="menu top-2 right-2 fixed z-50 flex items-center justify-center rounded-2xl"
      >
        <CircularText />
      </div>

      <AnimatePresence>
        {clicked && (
          <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 z-40">
            <MenuPage closeMenu={closeMenu} />
          </div>
        )}
      </AnimatePresence>

      <HomeSection />
      <AboutSection />
      {/* <ProjectSection /> */}
      <ContactSection />
      <Footer />
      {window.innerWidth > 768 && <CustomCursor />}
    </div>
  );
}

export default Portfolio;
