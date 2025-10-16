import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "./Button";
function InfiniteScrollingPhrase() {
  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);

  // Measure the width of the content once it's rendered
  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth / 2); // Divide by 2 because content is duplicated
    }
  }, []);

  return (
    <>
      <div className="flex relative w-full overflow-hidden">
        <div
          style={{
            boxShadow: "10px 0px 10px 20px var(--color-primary-bg)",
          }}
          className="absolute top-0 -left-7 w-10 h-10 bg-primary-bg z-30"
        ></div>
        <div
          style={{
            boxShadow: "10px 0px 10px 20px var(--color-primary-bg)",
          }}
          className="absolute top-0 -right-7 w-10 h-10 bg-primary-bg z-30"
        ></div>
        <motion.div
          ref={contentRef}
          initial={{ x: 0 }} // Start at the beginning
          animate={{ x: -contentWidth }} // Animate to the left by the width of one set of content
          transition={{
            duration: contentWidth / 50, // Adjust speed based on content width (e.g., 50px per second)
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop", // Ensures it snaps back to initial for seamless loop
          }}
          className="flex gap-4 items-center justify-center"
          style={{
            position: "relative",
          }} // Allow content to dictate width
        >
          {/* Duplicate the content to create a seamless loop */}
          <span className="flex gap-4">
            <code>
              Looking for a Final year project? Let's order at our store
            </code>

            <Link
              to="/store"
              className="flex items-center justify-center bg-text-highlight px-4 rounded-3xl text-text-secondary  transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                fill="currentColor"
                className="bi bi-arrow-right-short p-0"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                />
              </svg>
            </Link>
          </span>
          <span className="flex gap-4">
            <code>
              Looking for a Final year project? Let's order at our store
            </code>
            <Link
              to="/store"
              className="flex items-center justify-center bg-text-highlight px-4 rounded-3xl text-text-secondary  transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                fill="currentColor"
                className="bi bi-arrow-right-short p-0"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                />
              </svg>
            </Link>
          </span>
          <span className="flex gap-4">
            <code>
              Looking for a Final year project? Let's order at our store
            </code>
            <Link
              to="/store"
              className="flex items-center justify-center bg-text-highlight px-4 rounded-3xl text-text-secondary  transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                fill="currentColor"
                className="bi bi-arrow-right-short p-0"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                />
              </svg>
            </Link>
          </span>

          <span className="flex gap-4">
            <code>
              Looking for a Final year project? Let's order at our store
            </code>
            <Link
              to="/store"
              className="flex items-center justify-center bg-text-highlight px-4 rounded-3xl text-text-secondary  transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                fill="currentColor"
                className="bi bi-arrow-right-short p-0"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                />
              </svg>
            </Link>
          </span>
        </motion.div>
      </div>
    </>
  );
}

export default InfiniteScrollingPhrase;
