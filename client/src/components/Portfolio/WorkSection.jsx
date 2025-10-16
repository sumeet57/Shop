// client/src/sections/WorkSection.jsx
import React from "react";
import { motion } from "framer-motion";

const workExperiences = [
  {
    title: "Software Developer",
    company: "Tech Solutions Inc.",
    duration: "Jan 2023 - Present",
    description:
      "Developed and maintained full-stack applications using React, Node.js, and MongoDB. Implemented RESTful APIs and optimized database queries.",
  },
  {
    title: "Frontend Intern",
    company: "Creative Web Agency",
    duration: "Summer 2022",
    description:
      "Assisted in building responsive user interfaces with React and Tailwind CSS. Gained hands-on experience with component-based architecture.",
  },
];

function WorkSection() {
  return (
    <section
      id="work"
      className="min-h-screen flex flex-col justify-center p-8 rounded-lg bg-secondary-bg shadow-xl"
    >
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-text-primary text-4xl font-bold mb-6 font-inter"
      >
        My Work Experience
      </motion.h2>
      <div className="space-y-8">
        {workExperiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-primary-bg p-6 rounded-lg shadow-md border border-accent-1"
          >
            <h3 className="text-accent-1 text-2xl font-semibold font-inter">
              {exp.title}
            </h3>
            <p className="text-text-secondary text-lg font-inter">
              {exp.company} | {exp.duration}
            </p>
            <p className="text-text-primary mt-2 font-inter">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
export default WorkSection;
