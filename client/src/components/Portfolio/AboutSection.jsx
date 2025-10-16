// client/src/sections/AboutSection.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import "../../stylesheet/glowingHeading.css";
import AnimatedWordPhrase from "./utils/AnimatedWordPhrase";
import { PortfolioContext } from "../../Context/Portfolio.context.jsx";

function AboutSection() {
  const { setCursor } = useContext(PortfolioContext);

  // Skills data
  const skills = [
    "MernStack",
    "Socket.io",
    "Tailwind CSS",
    "Framer Motion",
    "Gsap",
    "Three.js",
    "Redis",
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 bg-text-secondary relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent-1/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-40 right-16 w-24 h-24 bg-accent-2/10 rounded-full blur-xl"></div>

      <div className="w-full max-w-4xl px-4">
        {/* Section Heading */}
        <motion.div
          className="w-full mb-12 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            About Me
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col items-center">
          {/* Introduction */}
          <motion.div
            className="w-full mb-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="text-text-primary/80 leading-relaxed max-w-3xl mx-auto">
              <AnimatedWordPhrase phrase="I'm Sumeet, a full-stack developer from Mumbai with a passion for building high-performance applications from concept to deployment. Specializing in modern technologies like the MERN stack, I craft elegant front-end experiences and scalable back-end systems. I am currently available for challenging roles on a creative and forward-thinking team." />
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            className="w-full mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    delay: index * 0.1,
                  }}
                  className="px-4 py-2 bg-secondary-bg text-text-highlight rounded-full text-sm font-medium border border-text-primary/10"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-text-highlight text-text-primary font-semibold rounded-lg hover:bg-text-highlight/80 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursor(true, 1.5)}
              onMouseLeave={() => setCursor(false, 1)}
            >
              Let's work together
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute left-20 bottom-20 w-8 h-8 bg-accent-1/20 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.8 }}
        />
        <motion.div
          className="absolute right-32 top-32 w-6 h-6 bg-accent-2/20 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 1 }}
        />
      </div>
    </section>
  );
}

export default AboutSection;
