import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PortfolioContext } from "../../Context/Portfolio.context";
import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";

function ContactSection() {
  const { setCursor } = useContext(PortfolioContext);
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/sumeet57",
      icon: <FiGithub className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sumeet-umbalkar/",
      icon: <FiLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      name: "Email",
      url: "mailto:sum.pro57@gmail.com",
      icon: <FiMail className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="contact"
      className="min-h-screen w-full flex items-center justify-center py-20 p-4 sm:p-8 bg-text-secondary text-text-primary relative overflow-hidden rounded-t-[50px] md:rounded-t-[100px]"
    >
      <div className="w-full max-w-6xl mx-auto z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-secondary-bg transform -skew-y-3 -z-10 rounded-3xl"></div>

          <div className="py-16 px-4 sm:px-12">
            <motion.div
              className="w-full mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
                Let's Connect
              </h2>
              <p className="text-text-primary/80 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="md:col-span-3 flex justify-center mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <motion.a
                  href="mailto:sum.pro57@gmail.com"
                  className="flex items-center gap-4 bg-secondary-bg px-6 py-3 sm:px-8 sm:py-4 rounded-2xl text-text-primary border border-text-primary/10 hover:border-accent-1/30 transition-all duration-300 group"
                  whileHover={{
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  onMouseEnter={() => setCursor(true, 1.5)}
                  onMouseLeave={() => setCursor(false, 1)}
                >
                  <div className="p-3 bg-accent-1/10 rounded-full group-hover:bg-accent-1/20 transition-colors">
                    <FiMail className="w-6 h-6 text-text-highlight" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-text-primary/60">
                      Get in touch at
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      sum.pro57@gmail.com
                    </p>
                  </div>
                </motion.a>
              </motion.div>

              <motion.div
                className="md:col-span-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex flex-row flex-wrap justify-center gap-6 md:gap-8">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      className="flex flex-col items-center p-5 md:p-6 bg-secondary-bg rounded-2xl border border-text-primary/10 hover:border-accent-1/30 transition-all duration-300 group min-w-[120px]"
                      whileHover={{
                        y: -8,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        },
                      }}
                      onMouseEnter={() => setCursor(true, 1.5)}
                      onMouseLeave={() => setCursor(false, 1)}
                    >
                      <div className="mb-3 p-3 md:p-4 bg-text-primary/5 rounded-full group-hover:bg-accent-1/10 transition-colors">
                        {social.icon}
                      </div>
                      <span className="text-sm md:text-base text-text-primary font-medium">
                        {social.name}
                      </span>
                      <span className="text-xs text-text-primary/60 mt-1">
                        Follow me
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 left-10 w-4 h-4 bg-accent-1/20 rounded-full"></div>
      <div className="absolute bottom-1/3 right-16 w-6 h-6 bg-accent-2/20 rounded-full"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-text-primary/10 rounded-full"></div>
    </section>
  );
}

export default ContactSection;
