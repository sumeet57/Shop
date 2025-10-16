import React from "react";
import { motion } from "framer-motion";

const GithubIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);
const LinkedinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

function MenuPage({ closeMenu }) {
  const menuItems = ["Home", "About", "Projects", "Contact"];

  const menuVariants = {
    open: {
      clipPath: `circle(150% at 100% 0)`,
      transition: {
        type: "spring",
        stiffness: 40,
        restDelta: 2,
        duration: 0.7,
      },
    },
    closed: {
      clipPath: `circle(0% at 100% 0)`,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration: 0.3,
      },
    },
  };

  const listVariants = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
    closed: {
      x: 50,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-primary-bg text-text-primary font-inter z-50 grid grid-cols-1 md:grid-cols-3"
      variants={menuVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <div className="md:col-span-2 flex items-center justify-center">
        <motion.ul
          className="flex flex-col gap-4 text-center md:text-left"
          variants={listVariants}
        >
          {menuItems.map((item) => (
            <motion.li
              key={item}
              variants={itemVariants}
              className="overflow-hidden font-extra-style"
            >
              <motion.a
                href={`#${item.toLowerCase()}`}
                className="block text-5xl sm:text-7xl font-bold text-text-primary transition-colors duration-300 relative group"
                whileHover="hover"
                onClick={closeMenu}
              >
                <span className="relative z-10">{item}</span>
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-accent-1 z-0"
                  initial={{ y: "100%" }}
                  variants={{ hover: { y: 0 } }}
                  transition={{ ease: "easeOut", duration: 0.4 }}
                />
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="hidden md:flex flex-col justify-end p-12 bg-secondary-bg/50">
        <motion.div
          className="text-right"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.8, duration: 0.5 },
          }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <h3 className="text-xl font-semibold text-accent-1 mb-2">
            Get in Touch
          </h3>
          <a
            href="mailto:sum.pro57@gmail.com"
            className="block text-lg hover:underline"
          >
            sum.pro57@gmail.com
          </a>
        </motion.div>
        <motion.div
          className="flex gap-6 justify-end mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.9, duration: 0.5 },
          }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <a
            href="https://github.com/sumeet57"
            className="text-text-primary hover:text-accent-1 transition-colors"
          >
            <GithubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/sumeet-umbalkar/"
            className="text-text-primary hover:text-accent-1 transition-colors"
          >
            <LinkedinIcon />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default MenuPage;
