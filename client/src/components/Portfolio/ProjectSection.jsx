// client/src/sections/ProjectsSection.jsx
import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import "../../stylesheet/glowingHeading.css";
import { PortfolioContext } from "../../Context/Portfolio.context.jsx";
import { useLocation } from "react-router-dom";

const personalProjects = [
  {
    id: 1,
    title: "Tambola Multiplayer Game",
    description:
      "A multiplayer Tambola game with real-time updates, user authentication, and a leaderboard created for a client.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    link: "https://tambolatesting.vercel.app/",
    span: "lg:col-span-5", // First project spans 5 columns
  },
  {
    id: 3.1,
    title: "Job Board",
    description:
      "A job board platform for posting and applying to jobs, with user authentication and search functionality.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    link: "https://github.com/sumeet57/JobBoard-MERN",
    span: "lg:col-span-4", // Second project spans 4 columns
  },
  {
    id: 5.2,
    title: "Resume Builder",
    description:
      "A web app to create and download resumes in various formats, with customizable templates.",
    tech: ["React", "Node.js", "Express", "PDFKit"],
    link: "https://sumeet57-resumebuilder.netlify.app/",
    span: "lg:col-span-9", // Third project spans full width
  },
  {
    id: 2,
    title: "CravingBook",
    description:
      "A recipe sharing platform with user authentication, recipe creation, and search functionality. also has pre-defined recipes retrieved from an external API.",
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
    ],
    link: "https://cravingbook.vercel.app/",
    span: "lg:col-span-6", // Fifth project spans 3 columns
  },
  {
    id: 4,
    title: "OpinionDock",
    description:
      "An platform to create a dynamic forms and collect responses from users.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Framer Motion"],
    link: "https://opiniondock.vercel.app/",
    span: "lg:col-span-3", // Fourth project spans 4 columns
  },
];

function ProjectSection() {
  const url = useLocation();
  useEffect(() => {
    console.log("Current URL:", url.pathname);
  }, [url]);

  const { setCursor } = useContext(PortfolioContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="projects"
      className="min-h-screen flex pt-10 z-10 justify-center items-center text-text-secondary bg-text-secondary relative rounded-t-[100px] overflow-hidden"
    >
      <div className="w-full max-w-7xl px-4 py-16">
        {/* Section Heading */}
        <motion.div
          className="w-full mb-16 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Featured Work
          </h2>
        </motion.div>

        {/* Creative Layout - Asymmetrical Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {personalProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`${project.span} bg-secondary-bg rounded-2xl p-6 border border-text-primary/10 overflow-hidden group relative`}
              onMouseEnter={() => setCursor(true, 2)}
              onMouseLeave={() => setCursor(false, 1)}
            >
              {/* Dynamic background elements based on index */}
              {index === 0 && (
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent-1/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
              )}
              {index === 1 && (
                <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-accent-2/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
              )}
              {index === 2 && (
                <>
                  <div className="absolute -right-12 -top-12 w-40 h-40 bg-accent-1/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-accent-2/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                </>
              )}

              <h3 className="text-xl font-bold text-text-primary mb-3 relative z-10">
                {project.title}
              </h3>

              <p
                className={`text-text-primary/80 mb-4 leading-relaxed relative z-10 ${
                  index === 2 ? "max-w-3xl" : ""
                }`}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs bg-accent-1/10 text-text-highlight font-medium px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm bg-text-highlight text-text-primary font-semibold px-5 py-2.5 rounded-lg hover:bg-text-highlight/80 transition relative z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project
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
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-text-primary/80 mb-4">
            Want to see more of my work?
          </p>
          <motion.a
            href="https://github.com/sumeet57"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-text-highlight font-medium hover:underline"
            whileHover={{ gap: "12px" }}
            onMouseEnter={() => setCursor("focus")}
            onMouseLeave={() => setCursor("default")}
          >
            Explore my GitHub
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-6 h-6 bg-accent-1/20 rounded-full"></div>
      <div className="absolute bottom-40 right-16 w-8 h-8 bg-accent-2/20 rounded-full"></div>
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-text-primary/10 rounded-full"></div>
    </section>
  );
}

export default ProjectSection;
