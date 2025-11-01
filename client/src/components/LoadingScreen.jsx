import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingScreen = ({ message = "Loading..." }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="
        fixed inset-0 z-50 backdrop-blur-xl bg-white/10
        flex flex-col items-center justify-center
        pointer-events-auto
      "
    >
      {/* Rotating icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="text-white text-6xl mb-4"
      >
        <AiOutlineLoading3Quarters />
      </motion.div>

      {/* Animated text */}
      <motion.div
        className="text-white text-lg font-medium flex gap-1"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        {message.split("").map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
