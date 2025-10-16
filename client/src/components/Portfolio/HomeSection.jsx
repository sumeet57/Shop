// client/src/sections/HomeSection.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "../../stylesheet/glowingHeading.css";
import AnimatedWordPhrase from "./utils/AnimatedWordPhrase";
import { PortfolioContext } from "../../Context/Portfolio.context";
import Button from "./utils/Button.jsx";
import InfiniteScrollingPhrase from "./utils/InfiniteScrollingPhrase.jsx";
import { useNavigate } from "react-router-dom";

function HomeSection() {
  const navigate = useNavigate();
  const { setCursor } = useContext(PortfolioContext);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".part1 h1 span", {
      // opacity: 0,
      filter: "blur(50px)",
      delay: 1,
      stagger: 0.2,
      ease: "power4.out", // A smooth ease-out often feels best for this
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen custom-bg-u flex flex-col items-center justify-center text-center p-2 lg:p-8 relative
               bg-text-primary text-text-primary rounded-b-[100px]"
    >
      <motion.span
        initial={{ top: "-100px" }} // The starting position (hidden above)
        animate={{ top: "8px" }} // The final position (in its natural spot)
        transition={{ duration: 2, ease: "easeInOut" }}
        className="imspan absolute top-2 left-2 bg-primary-bg p-2 text-sm-body sm:text-lg-body lg:text-xl-body xl:text-2xl-body rounded-4xl uppercase font-extra-style"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className="mr-1 text-green-500 text-sm-body sm:text-lg-body lg:text-xl-body xl:text-2xl-body"
        >
          &#9679;
        </motion.span>
        available for hire
      </motion.span>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-fit part1 text-[2vw] capitalize text-primary-bg font-secondary-style leading-tight tracking-wider">
          {/* <hr /> */}
          <h1>
            <span className="spn text-sm-heading sm:text-lg-heading lg:text-xl-heading xl:text-2xl-heading inline-block">
              S
            </span>
            <span className="spn text-sm-heading sm:text-lg-heading lg:text-xl-heading xl:text-2xl-heading inline-block">
              u
            </span>
            <span className="spn text-sm-heading sm:text-lg-heading lg:text-xl-heading xl:text-2xl-heading inline-block">
              m
            </span>
            <span className="spn text-sm-heading sm:text-lg-heading lg:text-xl-heading xl:text-2xl-heading inline-block">
              e
            </span>
            <span className="spn text-sm-heading sm:text-lg-heading lg:text-xl-heading xl:text-2xl-heading inline-block">
              e
            </span>
            <span className="spn text-sm-heading sm:text-lg-heading lg:text-xl-heading xl:text-2xl-heading inline-block">
              t
            </span>
          </h1>
          <h2 className="text-sm-subheading sm:text-lg-subheading lg:text-xl-subheading xl:text-2xl-subheading p-2 font-primary-style uppercase tracking-wider">
            a full-stack developer
          </h2>
        </div>
        <div className="text-sm-body sm:text-lg-body lg:text-xl-body xl:text-2xl-body lg:w-3/5 w-full font-primary-style text-center p-4 text-text-highlight">
          <AnimatedWordPhrase phrase="Engineering Elegance, Building Brilliance: We Specialize in Creating Robust, Responsive, and Radically Engaging Web Platforms for the Modern Digital Frontier." />
        </div>
        <div className="flex gap-4 mt-8">
          <Button
            text="Explore My Work"
            link="https://github.com/sumeet57"
            onMouseEnter={() => setCursor(true)}
            onMouseLeave={() => setCursor(false)}
          />
          <Button
            text="Shop"
            nav="shop"
            onMouseEnter={() => setCursor(true)}
            onMouseLeave={() => setCursor(false)}
          />
        </div>
        <div className="w-full mt-12">{/* <InfiniteScrollingPhrase /> */}</div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-text-secondary font-secondary-style text-[2vw] lg:text-[1vw] tracking-wider"
        initial={{ opacity: 0.7, y: 20 }}
        animate={{ opacity: 1, y: 5 }}
        transition={{
          delay: 0.5,
          duration: 1.45,
          repeat: Infinity,
          repeatType: "reverse", // <-- Add this line
        }}
      >
        <h2 className="flex gap-2 uppercase items-center">
          <span>scroll</span>
          <span>&#9660;</span>
        </h2>
      </motion.div>
    </section>
  );
}
export default HomeSection;
